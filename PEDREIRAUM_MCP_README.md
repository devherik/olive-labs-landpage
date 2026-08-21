Accounting MCP Server

Servidor FastMCP de alta maturidade construído sobre Clean Architecture e princípios SOLID, que serve como ponte inteligente entre Agentes de IA (LLMs) e bancos de dados SQL Server do Grupo Pedreira Um Valemix, expondo consultas analíticas de contabilidade e produção de forma segura, performática e tipada.

Em transporte HTTP, o acesso é protegido por OAuth via Microsoft Entra ID (Azure AD) com um gate de autorização por funcionário (MariaDB) e auditoria de todos os logins e chamadas de tool.
Arquitetura: Hexagonal (Ports & Adapters)

As dependências fluem para dentro em direção ao núcleo do domínio. Nenhuma lógica de infraestrutura vaza para os contratos de negócio.

┌─────────────────────────────────────────────────────────┐
│   FastMCP Server (main.py)                              │  ← Entrega / Controller
│   - Registro de tools e prompts                         │
│   - Injeção de contexto (lifespan)                      │
│   - Auth provider (HTTP) + AuditMiddleware + CORS       │
└──────────────┬──────────────────────────────────────────┘
               │
┌──────────────▼───────────────┐   ┌─────────────────────────────────┐
│   Auth & Middleware (core/)   │   │   Tools (tools/)                │  ← Orquestração
│   - auth/ (Entra ID + gate)   │   │   - accountant_tools.py         │
│   - middleware/ (auditoria)   │   │   - production_tools.py         │
└──────────────┬────────────────┘   │   - cost_tool.py                │
               │                     └────────────────┬────────────────┘
               │                                      │
┌──────────────▼──────────────────────────────────────▼────┐
│   Ports (core/ports.py, core/domain/)                    │  ← Contratos / Domínio
│   - Modelos Pydantic de entrada/saída                    │
│   - Interfaces abstratas de repositório                  │
└──────────────┬────────────────────────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│   Repositories (core/repositories/)     │  ← Infraestrutura / Adapters
│   - Queries SQL parametrizadas          │
│   - Desserialização via Pydantic        │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐   ┌──────────────────────────┐
│   SqlServerAdapter (core/)              │   │   MariaDbAdapter (core/)  │
│   - Wrapper async para pyodbc           │   │   - SQLAlchemy + asyncmy  │
│   - Context managers transacionais      │   │   - Auth gate + auditoria │
└─────────────────────────────────────────┘   └──────────────────────────┘

Pilares de Design

    Clean Architecture & Dependency Rule — ports.py e core/domain/ definem os contratos. As camadas externas dependem das abstrações, nunca o contrário.
    No-ORM Mandate (SQL Server) — SQL puro via pyodbc. Sem N+1 oculto. Agregações complexas ficam no banco.
    Async-First com Thread Pool — SqlServerAdapter envolve chamadas síncronas do pyodbc em asyncio.to_thread(), protegendo o event loop do FastMCP.
    Contratos Estritos via Pydantic — Todas as entradas e saídas são validadas em runtime. O FastMCP gera automaticamente os JSON Schemas para consumo pelos agentes de IA.
    Injeção de Dependência via Lifespan — O pool de conexões é inicializado no startup do servidor e destruído no encerramento. Tools acessam os adapters via ctx: Context.
    Segurança em Profundidade — Autenticação no provedor (Entra ID), autorização no gate de funcionário (MariaDB) e observabilidade via auditoria fail-open.

Segurança e Autenticação (transporte HTTP)

Quando MCP_TRANSPORT=http, o servidor exige login. O fluxo combina autenticação (quem é o usuário) com autorização (se pode usar este servidor):

Cliente MCP ──> FastMCP (OAuth Proxy) ──> Microsoft Entra ID (login)
                      │
                      ├─ valida claims do token (oid, email)
                      ├─ EmployeeRepository: usuário existe e está ativo em `users`? (MariaDB)
                      │     ├─ não → TokenError (login negado, auditado com motivo)
                      │     └─ sim → enriquece o JWT com employee_id, manager, unit, branche
                      └─ emite o JWT do FastMCP

    core/auth/provider.py — EmployeeGatedAzureProvider, subclasse do AzureProvider do FastMCP. Adiciona o gate de funcionário sobre a autenticação do Azure e registra cada login (autorizado ou negado) na auditoria.
    core/auth/employee_repository.py — resolve a identidade Azure (ms_oid → fallback por email) contra a tabela users. Nunca cria usuários; apenas autoriza.
    core/auth/mariadb_adapter.py — adapter async (SQLAlchemy + asyncmy) para o banco corporativo de autenticação.
    stdio não usa OAuth — roda como processo filho local do cliente, sem necessidade de login.

Auditoria

Duas trilhas persistidas no MariaDB (DDL em sql/audit_tables.sql). A escrita é fail-open: uma falha de auditoria nunca derruba o login ou a tool call.
Tabela 	O que registra 	Campos principais
audit_logins 	toda tentativa de autenticação 	email, user_id, ip, success, denied_reason, created_at
audit_tool_calls 	toda chamada de tool (sucesso e falha) 	user_id, tool_name, params (JSON), ip, success, time_spent_ms, token_count, created_at

    core/middleware/audit_middleware.py — AuditMiddleware, hook on_call_tool que mede a duração e registra toda invocação, inclusive as que falham na validação de input.
    core/auth/audit_repository.py — writers fail-open das duas trilhas.
    core/auth/client_ip.py — resolve o IP real do cliente atrás do proxy: CF-Connecting-IP → primeiro hop de X-Forwarded-For → peer da conexão.
    denied_reason usa códigos estáveis (no_identity_claims, missing_oid, not_authorized) para facilitar agregação em relatórios.

    Antes do primeiro deploy com auditoria, crie as tabelas: mysql <auth_db> < sql/audit_tables.sql.

Contextos de Banco de Dados

O servidor mantém três conexões independentes ao SQL Server, compartilhadas pelos repositórios de negócio, além de uma conexão MariaDB para autenticação/auditoria.
Chave / Adapter 	Banco 	Propósito
CONTABIL_ADAPTER_KEY 	MOVIMENTACAO_CONTABIL (SQL Server) 	Razão contábil, plano de contas, estrutura organizacional
PRODUCAO_ADAPTER_KEY 	PRODUCAO_SGA (SQL Server) 	KPIs de produtividade, equipamentos, horas trabalhadas
PEDREIRA_ADAPTER_KEY 	Minerion (SQL Server, ERP) 	Expedição: notas fiscais, balança, ciclo do caminhão · Manutenção: ordens de serviço, materiais consumidos · Análise de custos: VW_CUSTOS e árvore de centros de custo (CENTROCUSTO)
MariaDbAdapter 	auth_db (MariaDB) 	Gate de funcionário (users) + auditoria (audit_*)

    CostRepository é o único que recebe dois adapters de SQL Server simultaneamente (CONTABIL + PRODUCAO), pois o cálculo de R$/tl cruza dados contábeis e de produção em memória. ExpedicaoRepository, MaintenanceRepository e CostAnalysisRepository compartilham o adapter Pedreira (ERP Minerion); o cálculo de KPIs e horas de manutenção ocorre inteiramente em Python.

Estrutura de Diretórios

test-mcp/
├── core/
│   ├── ports.py                        # Contratos contábeis (Pydantic + ABCs)
│   ├── settings.py                     # Configurações centralizadas (Pydantic Settings)
│   ├── dependencies.py                 # Context managers de injeção de dependência
│   ├── sql_server_adapter.py           # Driver async para SQL Server (pyodbc)
│   ├── auth/
│   │   ├── provider.py                # EmployeeGatedAzureProvider (Entra ID + gate)
│   │   ├── employee_repository.py     # Autorização contra a tabela `users`
│   │   ├── mariadb_adapter.py         # Adapter async MariaDB (SQLAlchemy + asyncmy)
│   │   ├── audit_repository.py        # Writers fail-open de audit_logins / audit_tool_calls
│   │   └── client_ip.py               # Resolução de IP atrás de Cloudflare/Nginx
│   ├── middleware/
│   │   └── audit_middleware.py        # AuditMiddleware (on_call_tool)
│   ├── domain/
│   │   ├── production.py              # Modelos de domínio de produção + interface de repositório
│   │   ├── cost.py                    # Modelos de domínio de custo (CostPerTonInput/Row/Breakdown)
│   │   ├── expedicao.py               # Modelos + constantes de expedição (metas, turnos, filiais)
│   │   ├── maintenance.py             # TURNO_CONFIG, calcular_horas_uteis, contratos de manutenção
│   │   ├── cost_analysis.py           # Modelos de análise de custos (VW_CUSTOS) + enums dimensão/granularidade
│   │   ├── stock.py                   # Modelos de posição de estoque (guarda anti-varredura, paginação)
│   │   └── drilling.py                # Modelos de performance de perfuração (m/h, guarda de janela)
│   └── repositories/
│       ├── accountant_repository.py   # Queries contábeis concretas
│       ├── production_repository.py   # Queries de produção concretas
│       ├── cost_repository.py         # Queries R$/tl — cruza CONTABIL + PRODUCAO
│       ├── expedicao_repository.py    # Query Minerion + cálculo de KPIs de expedição
│       ├── maintenance_repository.py  # Queries Minerion de OS; colapso item→OS e horas em Python
│       ├── cost_analysis_repository.py # Queries VW_CUSTOS + resolução hierárquica de centros de custo
│       ├── stock_repository.py        # Query ESTOQUE×QUANTESTOQUE + flags de qualidade de dados
│       └── drilling_repository.py     # Query DIARIATRANSP×RH_PERFURACAO + fallback de tempo/summary
│
├── tools/
│   ├── accountant_tools.py            # Tools contábeis registradas no FastMCP
│   ├── production_tools.py            # Tools de produção registradas no FastMCP
│   ├── cost_tool.py                   # Tool fetch_cost_per_ton registrada no FastMCP
│   ├── cost_analysis_tools.py         # Tools de análise de custos (search_cost_center + fetch_cost_*)
│   ├── expedicao_tool.py              # Tool fetch_expedicao_performance registrada no FastMCP
│   ├── maintenance_tools.py           # Tools fetch_maintenance_orders + fetch_maintenance_order_details
│   ├── stock_tools.py                 # Tool fetch_stock_position registrada no FastMCP
│   └── drilling_tools.py              # Tool fetch_drilling_performance registrada no FastMCP
│
├── sql/
│   └── audit_tables.sql               # DDL das tabelas de auditoria (MariaDB)
│
├── docs/
│   ├── TOOLS.md                       # Referência de todas as tools disponíveis
│   ├── guia_ferramentas_mcp.md        # Guia de orquestração das ferramentas
│   ├── spec_mcp_analise_custos.md     # Especificação das tools de análise de custos
│   └── mcp_oauth_authentication_flow.svg  # Diagrama do fluxo OAuth do MCP
│
├── main.py                             # Entry point: lifespan, auth, middleware, CORS, tools
├── agent.py                            # CLI Agno para testes interativos (Gemini)
│
├── Dockerfile                          # Imagem (Python 3.12 + ODBC Driver 17)
├── docker-compose.yaml                 # Orquestração do serviço fastmcp
├── nginx.conf                          # Reverse proxy / terminação TLS
│
├── tests/                              # Suíte de testes (pytest)
├── old_etl/                            # (Legado/Arquivado) ETL MariaDB + Polars
│
├── pyproject.toml
├── uv.lock
├── .python-version                     # 3.12
└── CLAUDE.md                           # Guia para o Claude Code

Tools Disponíveis
Contabilidade (tools/accountant_tools.py)
Tool 	Descrição
fetch_aggregated_ledger 	Razão contábil agregado por período, empresa, filial e nível de conta (1-6).
list_organizational_structure 	Lista todas as empresas (LANCEMP) e filiais (LANCFIL) com seus códigos numéricos.
search_chart_of_accounts 	Busca contas no plano de contas por termo textual e nível opcional.
Produção (tools/production_tools.py)
Tool 	Descrição
fetch_production_kpis 	KPIs mensais de produtividade (produção, DF%, UF%, ton/h, RO%) com comparativo ao mesmo mês do ano anterior.
fetch_equipaments_by_branch 	Lista equipamentos e suas TAGs, agrupados por filial. Use antes das tools de produção para descobrir tags válidas.
fetch_production_by_equipament 	KPIs desagregados por equipamento em intervalo de datas livre (YYYY-MM-DD).
fetch_equipment_downtime 	Motivos de parada, número de ocorrências, horas parado e % do total por equipamento.
fetch_production_details 	Detalhes operacionais de alta granularidade (operador, serviço, rota, produto, horas, viagens). Suporta paginação (limit/offset).
fetch_production_combinations 	Combinações únicas de (serviço, rota, produto) com total produzido em toneladas. Use para definir o escopo de produção antes de calcular R$/tl.
Custo (tools/cost_tool.py)
Tool 	Descrição
fetch_cost_per_ton 	Calcula R$/tl por filial cruzando débitos contábeis (CONTA_NIVEL_1 = '4') com produção em toneladas. Retorna cost_per_ton + cost_breakdown por categoria DRE nível 2. Aceita filtros opcionais de serviço, rota e produto para delimitar a produção contabilizada.
Fluxo recomendado para análise de R$/tl

1. fetch_equipaments_by_branch        → confirmar siglas de filial
2. fetch_production_combinations      → listar combinações (serviço/rota/produto) do período
3. [validar com usuário]              → quais combinações representam produção final
4. fetch_cost_per_ton                 → calcular R$/tl com os filtros confirmados
5. inspecionar cost_breakdown         → identificar categoria de custo dominante
6. fetch_production_by_equipament     → investigar queda de produção por equipamento
   ou fetch_equipment_downtime        → investigar pico de manutenção

Análise de Custos (tools/cost_analysis_tools.py)

Análise detalhada de custos sobre a view VW_CUSTOS do ERP Minerion — do agregado por setor/equipamento/item até o lançamento individual. Especificação: spec_mcp_analise_custos.md.
Tool 	Descrição
search_cost_center 	Busca centros de custo pelo nome (ex: "britagem") na árvore CENTROCUSTO. Retorna código, caminho hierárquico completo, nível e se é agrupador (has_children). Use sempre antes das tools de custo quando o usuário citar um setor pelo nome.
fetch_cost_summary 	Resumo agregado de custos por cost_center, equipment ou item, com granularidade total/monthly/yearly para comparações. Janela máxima de 24 meses; retorno limitado às 200 linhas de maior valor.
fetch_top_cost_items 	Top N itens de maior custo (1–50) em um recorte, com linha residual "DEMAIS" (is_others=true) somando o que ficou fora do ranking. Janela máxima de 12 meses.
fetch_cost_details 	Lançamentos individuais para evidência/auditoria, com entry_type (ALMOX/AMORT/SERV/REG/RPA). Janela máxima de 31 dias; exige pelo menos um filtro além da data; sinaliza truncamento (truncated/warning).

O parâmetro cost_center_codes (máx. 10) aceita nós agrupadores: o servidor soma automaticamente toda a subárvore, resolvendo pelo caminho hierárquico (CCNOMECOMP).
Fluxo recomendado para decomposição de custos

1. search_cost_center                 → converter nome do setor em código(s) de centro de custo
2. fetch_cost_summary                 → visão agregada (mensal/anual para comparações)
3. fetch_top_cost_items               → decompor o período/setor que chamou atenção
4. fetch_cost_details                 → evidência lançamento a lançamento (auditoria)

Expedição (tools/expedicao_tool.py)
Tool 	Descrição
fetch_expedicao_performance 	Performance de expedição (tempos de balança, ciclo do caminhão e status vs meta da diretoria de 1min30) para MICON, P1-BT e VMIX-SB. Agrega por filial, equipamento, produto, cliente e transportadora; retorna resumo do turno, alertas por gravidade e, opcionalmente, NFs detalhadas. Fonte: ERP Minerion.

Bandas de status (segundos por operação de balança): dentro ≤ 90 · amarelo 91–180 · vermelho > 180. NFs de ajuste manual (QUANT = 1 + bruto manual) são excluídas dos KPIs e contadas à parte. A janela de tempo é aplicada sobre a emissão da NF (NFDATA); o turno "atual" é detectado pelo relógio do servidor.
Manutenção (tools/maintenance_tools.py)
Tool 	Descrição
fetch_maintenance_orders 	Ordens de serviço (OS) de manutenção com KPIs de horas e custo de material. Modo summary: 1 linha por equipamento (visão gerencial). Modo detailed: 1 linha por OS (drill-down). Filtros: status, categoria (PREVENTIVA / CORRETIVA / CORRETIVA_PROGRAMADA), equipamento (busca parcial). Fonte: ERP Minerion.
fetch_maintenance_order_details 	Detalhe de até 10 OSs: serviços realizados (com causa e ação) e materiais consumidos (peça, quantidade, custo unitário). Chamada sob demanda após identificar as OSs em fetch_maintenance_orders.

Horas de manutenção calculadas em Python (sem UDF): h_manutencao_bruta = tempo corrido (24h); h_manutencao_turno = horas dentro da janela operacional da filial (TURNO_CONFIG). custo_material_total cobre apenas baixas de estoque (BESTSIT=8); para custo total de mão de obra e serviços terceirizados, use fetch_cost_per_ton com o centro de custo do equipamento.
Fluxo recomendado para diagnóstico de manutenção

1. fetch_equipment_downtime        → identificar equipamento com mais horas paradas
2. fetch_maintenance_orders        → mode=summary: custo e horas por equipamento no período
3. fetch_maintenance_orders        → mode=detailed: listar OSs do equipamento gargalo
4. fetch_maintenance_order_details → drill-down: causas, ações e peças das OSs críticas
5. fetch_cost_per_ton              → confirmar impacto da manutenção no R$/tl
6. fetch_stock_position            → (opcional) há peça em estoque para a próxima corretiva?

Estoque (tools/stock_tools.py)
Tool 	Descrição
fetch_stock_position 	Posição de estoque atual por item e unidade (ESTOQUE × QUANTESTOQUE, QESTQTIPO=0): saldo, mínimo, máximo, custo médio unitário, valor imobilizado, NCM e bloqueio. Exige ao menos um filtro (branch, item, grupo ou NCM); pagina em até 500 linhas (next_offset). Retorna data_quality_flags sinalizando inconsistências de cadastro na página. Fonte: ERP Minerion.

avg_unit_cost é custo médio de estoque — não confundir com o custo contábil do R$/tl (fetch_cost_per_ton). Para investigar falta de peça, use below_minimum_only=true (itens zerados entram automaticamente).
Perfuração (tools/drilling_tools.py)
Tool 	Descrição
fetch_drilling_performance 	Performance de perfuratrizes (PE-#) a partir dos boletins diários (DIARIATRANSP × RH_PERFURACAO): furos, metros perfurados e o KPI metros por hora (m/h) por diária/bancada, com summary consolidado por equipamento (dias, horas, metros, m/h e metragem média por furo). Janela máxima de 12 meses. Fonte: ERP Minerion.

time_source indica se o tempo veio da soma furo a furo ("furos") ou do fallback pela duração da diária ("diaria", tende a subestimar o m/h). Virada de meia-noite (HORA_INICIAL > HORA_FINAL) é apenas sinalizada em data_quality_flags, sem correção automática.
Setup e Execução
Pré-requisitos

    Python >= 3.12
    uv (gerenciador de pacotes):

    powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"

    ODBC Driver 17 for SQL Server instalado no sistema (já incluso na imagem Docker).
    MariaDB acessível (gate de funcionário + auditoria) — apenas para transporte HTTP.

Variáveis de Ambiente

Crie o arquivo core/.env. Valores abaixo são exemplos — nunca commite credenciais reais.

ENVIRONMENT=development

# ── Transporte MCP ───────────────────────────────────────────────
# "stdio" (local, sem auth) ou "http" (remoto, exige Azure + MariaDB).
MCP_TRANSPORT=http
MCP_HTTP_PORT=8443
# Origem pública do servidor como o cliente a alcança. DEVE bater
# exatamente (scheme + host + porta) com a URL usada na conexão; o
# FastMCP deriva o issuer e o token_endpoint deste valor.
MCP_BASE_URL=https://mcp-minerion.exemplo.com.br
# Origens de browser liberadas para CORS (ex.: MCP Inspector).
# Vazio em produção (o token exchange do Claude é server-to-server).
MCP_CORS_ORIGINS=
# Chave para assinar os JWTs emitidos pelo MCP (mantenha estável).
MCP_AUTH_SIGNING_KEY=<hex-aleatorio>

# ── Microsoft Entra ID (Azure AD) ───────────────────────────────
AZURE_TENANT_ID=<tenant-id>
AZURE_CLIENT_ID=<client-id>
AZURE_CLIENT_SECRET=<client-secret>

# ── MariaDB (gate de funcionário + auditoria) ───────────────────
MARIADB_HOST=192.168.x.x
MARIADB_PORT=3306
MARIADB_USER=<usuario>
MARIADB_PASSWORD=<senha>
MARIADB_DB=auth_db

# ── SQL Server — Produção ───────────────────────────────────────
SQLSERVER_USER_PRODUCAO=sa
SQLSERVER_PASSWORD_PRODUCAO=<senha>
SQLSERVER_HOST_PRODUCAO=192.168.x.x
SQLSERVER_DB_PRODUCAO=PRODUCAO_SGA

# ── SQL Server — Contabilidade ──────────────────────────────────
SQLSERVER_USER_CONTABIL=sa
SQLSERVER_PASSWORD_CONTABIL=<senha>
SQLSERVER_HOST_CONTABIL=192.168.x.x
SQLSERVER_DB_CONTABIL=MOVIMENTACAO_CONTABIL

# ── SQL Server — Pedreira / ERP Minerion (expedição) ────────────
SQLSERVER_USER_PEDREIRA=sa
SQLSERVER_PASSWORD_PEDREIRA=<senha>
SQLSERVER_HOST_PEDREIRA=192.168.x.x
SQLSERVER_DB_PEDREIRA=Minerion

# ── SQL Server — Configurações compartilhadas ───────────────────
SQLSERVER_PORT=1433
SQLSERVER_DRIVER=ODBC Driver 17 for SQL Server
SQLSERVER_TRUST_SERVER_CERTIFICATE=yes
SQLSERVER_ENCRYPT=yes

# ── Agente Gemini (opcional — para agent.py) ────────────────────
GEMINI_API_KEY=<chave>

    O arquivo core/.env é ignorado pelo git. Nunca commite credenciais.

Comandos Comuns

# Iniciar o servidor MCP (transporte definido por MCP_TRANSPORT)
uv run main.py

# Executar testes unitários
uv run pytest tests/ -v

# Type check (executar após cada alteração de código)
uv run ty check

# Lint e formatação
uv run ruff check core/ main.py agent.py tools/
uv run ruff format core/ main.py agent.py tools/

# CLI do agente Agno (requer GEMINI_API_KEY)
uv run agent.py

# Sincronizar dependências
uv sync

# Criar as tabelas de auditoria (uma vez, antes do deploy HTTP)
mysql auth_db < sql/audit_tables.sql

Testando com o MCP Inspector

O MCP Inspector é a forma mais rápida de validar tools e o fluxo de autenticação sem um cliente completo. Não precisa instalar — use via npx:

npx @modelcontextprotocol/inspector@latest

Isso abre a UI do Inspector no browser (porta padrão 6274).
Modo 1 — stdio (local, sem OAuth)

Ideal para desenvolver e testar tools rapidamente. Garanta MCP_TRANSPORT=stdio no core/.env e configure no Inspector:

    Transport Type: STDIO
    Command: uv
    Arguments: run --project C:\Users\herik.rezende\Projetos\test-mcp main.py

O Inspector sobe o servidor como processo filho. Sem login: você já consegue listar e executar tools.

    Alternativa por linha de comando (o Inspector inicia o comando para você):

    npx @modelcontextprotocol/inspector@latest uv run main.py

Modo 2 — HTTP/HTTPS (com OAuth Entra ID)

Testa o fluxo completo de autenticação. Configure o core/.env:

MCP_TRANSPORT=http
MCP_HTTP_PORT=8443
MCP_BASE_URL=http://localhost:8443          # deve bater EXATAMENTE com a URL de conexão
MCP_CORS_ORIGINS=http://localhost:6274      # origem do Inspector

Reinicie o servidor (uv run main.py) e, no Inspector:

    Transport Type: Streamable HTTP
    URL: http://localhost:8443/mcp (o sufixo /mcp é obrigatório)
    OAuth 2.0 Flow:
        Client ID: o AZURE_CLIENT_ID
        Client Secret: deixe vazio — o OAuth Proxy do FastMCP trata os clientes como públicos (PKCE); um secret preenchido causa 401 / Missing client_id no /token.

No portal do Azure → App Registration → Authentication → Redirect URIs, cadastre o callback do proxy (plataforma Web):

http://localhost:8443/auth/callback

    Para HTTPS público (atrás de Nginx/Cloudflare), troque os valores para a origem real (ex.: MCP_BASE_URL=https://mcp-minerion.exemplo.com.br, redirect https://.../auth/callback) e mantenha MCP_CORS_ORIGINS vazio se o cliente não for um browser.

Erros comuns (já mapeados)
Sintoma 	Causa 	Correção
Protected resource ... does not match expected ... (or origin) 	MCP_BASE_URL sem a porta / diferente da URL de conexão 	Iguale MCP_BASE_URL à URL exata (com porta).
AADSTS50011: redirect URI ... does not match 	callback do proxy não cadastrado no Azure 	Adicione <base_url>/auth/callback nas Redirect URIs.
OPTIONS /token → 400 (preflight CORS) 	origem do browser não liberada 	Defina MCP_CORS_ORIGINS com a origem do Inspector.
401 / InvalidClientError: Missing client_id 	Client Secret preenchido no Inspector 	Deixe o Client Secret vazio (cliente público + PKCE).
Implantação em Produção (Docker + Cloudflare + Nginx)

O deploy roda em container. O Dockerfile parte de python:3.12-slim-bookworm, instala o ODBC Driver 17 e ajusta o OpenSSL para compatibilidade TLS legada do SQL Server.

# Build + subir o serviço
docker compose up -d --build

# Logs
docker compose logs -f fastmcp

Topologia recomendada para exposição segura sem IP público:

Cliente (Claude.ai / Inspector)
        │  HTTPS
        ▼
Cloudflare Tunnel ──> Nginx (terminação TLS) ──> container fastmcp:8443

    Cloudflare Tunnel expõe o serviço sem abrir portas no perímetro; o IP interno (atrás de VPN) não fica acessível diretamente.
    Nginx (nginx.conf) faz proxy reverso para fastmcp:8443.
    MCP_BASE_URL deve ser a origem pública HTTPS (mesma host do redirect URI no Azure), senão o token exchange do Claude fica inalcançável.
    O docker-compose.yaml lê as variáveis de core/.env; não suba valores de localhost para produção.

Cada usuário conecta o cliente MCP à URL pública com o sufixo /mcp (ex.: https://mcp-minerion.exemplo.com.br/mcp). Nenhum Python, uv ou driver ODBC precisa ser instalado nas máquinas dos usuários.
Adicionando uma Nova Tool

Siga o padrão Ports & Adapters:
1. Definir o Contrato (core/ports.py ou core/domain/)

class MinhaConsultaInput(BaseModel):
    param_1: str = Field(..., description="Descrição do parâmetro")

class MinhaConsultaOutput(BaseModel):
    resultado: str = Field(..., description="Descrição do resultado")

2. Implementar no Repositório (core/repositories/)

async def minha_consulta(self, criteria: MinhaConsultaInput) -> List[MinhaConsultaOutput]:
    query = "SELECT ... FROM [schema].[tabela] WHERE col = :param_1"
    params = {"param_1": criteria.param_1}
    async with self._db.transaction() as tx:
        rows = await tx.execute(query, params)
        return [MinhaConsultaOutput(**row) for row in rows]

Se a tool cruzar os dois bancos (como fetch_cost_per_ton), o repositório recebe dois adapters no construtor e abre transações independentes em cada um.
3. Registrar no FastMCP (tools/)

Crie ou edite o arquivo correspondente em tools/ e registre com register_tools(mcp):

@mcp.tool(tags={"public"})
async def minha_tool(ctx: Context, param_1: str) -> List[MinhaConsultaOutput] | str:
    """
    Descrição clara do que esta tool faz — será lida pelo agente de IA.
    """
    try:
        criteria = MinhaConsultaInput(param_1=param_1)
        async with get_accountant_repository(ctx) as repo:
            return await repo.minha_consulta(criteria)
    except ValidationError as e:
        return f"Parâmetros inválidos: {e}"
    except Exception as e:
        return f"Erro interno: {e}. Contate o suporte."

Adicione a chamada register_tools(mcp) correspondente em main.py. A tool é auditada automaticamente pelo AuditMiddleware — não é preciso instrumentar nada.

Padrão de retorno: tools sempre retornam o tipo tipado ou uma str com mensagem de erro — compatível com o consumo por agentes de IA.
Padrões de Query SQL
Queries Parametrizadas Seguras

O método SqlServerTransaction.execute() converte marcadores :param_name para ? do ODBC automaticamente. Nunca interpole valores via f-string — sempre passe via params:

query = "SELECT * FROM tabela WHERE col_1 = :v1 AND col_2 = :v2"
params = {"v1": "abc", "v2": 42}
rows = await tx.execute(query, params)

Para cláusulas IN com listas, gere placeholders numerados (ex.: :svc_0, :svc_1) — veja CostRepository._build_in_clause.
Agregação na Fonte

Sempre agrupe e calcule no SQL, nunca em loops Python sobre grandes volumes:

query = f"""
    SELECT [{col_code}], SUM([D]) AS debit, SUM([C]) AS credit
    FROM [tabela]
    GROUP BY [{col_code}]
"""

    Nomes de coluna/tabela derivados dinamicamente (ex.: CONTA_NIVEL_{lvl}) só podem vir de valores controlados/validados, nunca de input livre do usuário.

Limite de Segurança

Por padrão, SqlServerTransaction.execute() limita resultados a 5.000 linhas. Um aviso é emitido caso o limite seja atingido. Aumente com cautela: tx.execute(query, params, max_rows=10000).
Debugging

    ENVIRONMENT=development em .env habilita logging verbose.
    Logs do banco são redirecionados para stderr (separado do protocolo MCP no stdout).
    Transações com falha executam rollback automático; o erro é logado e relançado.
    Falhas de auditoria são logadas (logger.exception) mas não propagam — confira os logs para diagnosticar perda de trilha.

Decisões Técnicas

Registro das escolhas de arquitetura não óbvias e o porquê de cada uma.
Por que não usar ORM no SQL Server?

As consultas contábeis envolvem agregações pesadas e agrupamento hierárquico (níveis de conta 1-6). ORMs mascaram o custo das queries e tornam agregações avançadas mais difíceis de otimizar. SQL puro via pyodbc dá transparência e controle totais. O MariaDB (auth/auditoria), por outro lado, usa SQLAlchemy Core — ali as queries são triviais e o pooling async do asyncmy compensa.
Por que asyncio.to_thread() no pyodbc?

O pyodbc é síncrono. Envolver as chamadas em asyncio.to_thread() mantém o event loop do FastMCP livre sem introduzir um driver async pesado. O próprio driver ODBC gerencia o pool de conexões.
Por que um OAuth Proxy (Entra ID) em vez de validar o token direto?

O FastMCP atua como Authorization Server para o cliente MCP e como cliente OAuth do Azure. Isso permite Dynamic Client Registration (DCR) e PKCE no lado do cliente, enquanto o segredo do Azure fica só no servidor. Clientes são tratados como públicos (token_endpoint_auth_method="none") — por isso o Inspector não deve enviar client secret.
Por que separar autenticação de autorização?

O Azure responde "quem é o usuário"; a tabela users (MariaDB) responde "pode usar este servidor". Manter o gate em _extract_upstream_claims faz a verificação rodar tanto no login quanto em cada refresh de token — funcionários desativados (is_active = 0) são cortados no próximo refresh, sem maquinaria extra de revogação.
Por que a auditoria é fail-open?

Uma trilha de auditoria indisponível não pode impedir um usuário autorizado de trabalhar nem derrubar uma tool call. Os writers capturam e logam qualquer exceção. O trade-off aceito: sob falha do MariaDB, perde-se trilha (logado), mas a operação continua. Para um cenário que exija fail-closed, a decisão precisaria ser revista explicitamente.
Por que denied_reason com códigos estáveis?

Texto livre dificulta agregação. Códigos curtos (no_identity_claims, missing_oid, not_authorized) permitem GROUP BY denied_reason direto em relatórios de tentativas de acesso negadas.
Por que params da tool são gravados como JSON completo?

Rastreabilidade total das chamadas para auditoria contábil. A serialização tolera objetos não triviais (default=str) e degrada para um marcador em vez de quebrar a gravação.
Por que CORS é desligado por padrão?

O preflight CORS só é necessário para clientes de browser (MCP Inspector). O token exchange do Claude é server-to-server e não dispara preflight. Manter MCP_CORS_ORIGINS vazio em produção reduz a superfície de exposição.
Por que o MCP_BASE_URL é tão sensível?

O FastMCP deriva dele a metadata OAuth (issuer, token_endpoint, protected resource). Qualquer divergência de scheme/host/porta com a URL real de conexão quebra a descoberta (mismatch de origem) ou torna o /token inalcançável pelo backend do cliente.
Por que ODBC Driver 17 + OpenSSL SECLEVEL=0 na imagem?

O OpenSSL 3.x (Debian Bookworm) bloqueia algoritmos TLS legados que os SQL Servers internos ainda usam. O Dockerfile ajusta o openssl.cnf para SECLEVEL=0, restaurando a compatibilidade sem trocar a infraestrutura de banco.

"A arquitetura não serve apenas para que o código funcione hoje, mas para garantir que ele possa mudar com segurança amanhã."
