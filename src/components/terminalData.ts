import type { WorkbenchTab } from '../schemas'

export interface Token {
  text: string
  className?: string
}

export type { WorkbenchTab }

export const WORKBENCH_METADATA: Record<WorkbenchTab, { filename: string; language: string; badge: string; description: string }> = {
  'engine.go': {
    filename: 'engine.go',
    language: 'go',
    badge: 'GO // NATIVE AI',
    description: 'High-concurrency Go worker streaming style-aware mentoring via Google GenAI SDK natively.',
  },
  'mcp_gateway.py': {
    filename: 'mcp_gateway.py',
    language: 'python',
    badge: 'FASTMCP // HEXAGONAL',
    description: 'Enterprise MCP bridge with Entra ID OAuth, MariaDB Auth Gate, and async SQL Server thread pooling.',
  },
  'domain_contract.ts': {
    filename: 'domain_contract.ts',
    language: 'typescript',
    badge: 'CLEAN ARCH // ZOD',
    description: 'Strict domain boundaries, immutable codex entities, and runtime validation contracts.',
  },
}

export const TAB_CONTENT: Record<WorkbenchTab, Token[][]> = {
  'engine.go': [
    [
      { text: 'package ', className: 'code-keyword' },
      { text: 'engine', className: '' },
    ],
    [
      { text: '// Folior Native AI Engine — Zero-Framework Deterministic Core', className: 'code-comment' },
    ],
    [
      { text: 'type ', className: 'code-keyword' },
      { text: 'MentorService ', className: '' },
      { text: 'struct ', className: 'code-keyword' },
      { text: '{', className: '' },
    ],
    [
      { text: '    genaiClient *', className: '' },
      { text: 'genai.Client', className: 'code-string' },
    ],
    [
      { text: '    codexRepo   ', className: '' },
      { text: 'domain.CodexRepository', className: 'code-string' },
    ],
    [
      { text: '}', className: '' },
    ],
    [
      { text: 'func ', className: 'code-keyword' },
      { text: '(s *MentorService) ', className: '' },
      { text: 'StreamSuggestion', className: 'code-string' },
      { text: '(ctx context.Context, req ', className: '' },
      { text: 'domain.DraftPrompt', className: 'code-string' },
      { text: ') (<-chan ', className: '' },
      { text: 'string', className: 'code-keyword' },
      { text: ', error) {', className: '' },
    ],
    [
      { text: '    // Enforce creative sovereignty: illuminate context without overwriting prose', className: 'code-comment' },
    ],
    [
      { text: '    model := s.genaiClient.GenerativeModel(', className: '' },
      { text: '"gemini-2.5-pro"', className: 'code-number' },
      { text: ')', className: '' },
    ],
    [
      { text: '    model.SetTemperature(', className: '' },
      { text: '0.2', className: 'code-number' },
      { text: ') // Deterministic guidance', className: 'code-comment' },
    ],
    [
      { text: '    iter := model.GenerateContentStream(ctx, req.ToGenAIPrompt())', className: '' },
    ],
    [
      { text: '    return ', className: 'code-keyword' },
      { text: 's.pipeline.Forward(ctx, iter)', className: 'code-string' },
      { text: ', nil', className: 'code-keyword' },
    ],
    [
      { text: '}', className: '' },
    ],
  ],
  'mcp_gateway.py': [
    [
      { text: '# FastMCP Enterprise Gateway — Hexagonal Architecture & OAuth Gate', className: 'code-comment' },
    ],
    [
      { text: 'from ', className: 'code-keyword' },
      { text: 'fastmcp ', className: '' },
      { text: 'import ', className: 'code-keyword' },
      { text: 'FastMCP, Context', className: 'code-string' },
    ],
    [
      { text: 'from ', className: 'code-keyword' },
      { text: 'core.auth ', className: '' },
      { text: 'import ', className: 'code-keyword' },
      { text: 'EmployeeGatedAzureProvider', className: 'code-string' },
    ],
    [
      { text: '', className: '' },
    ],
    [
      { text: 'mcp = FastMCP(', className: '' },
    ],
    [
      { text: '    name=', className: '' },
      { text: '"Enterprise-ERP-Gateway"', className: 'code-string' },
      { text: ',', className: '' },
    ],
    [
      { text: '    auth=EmployeeGatedAzureProvider(tenant_id=AZURE_TENANT, gate_db=auth_mariadb),', className: 'code-comment' },
    ],
    [
      { text: ')', className: '' },
    ],
    [
      { text: '', className: '' },
    ],
    [
      { text: '@mcp.tool(tags={', className: 'code-keyword' },
      { text: '"production", "no_orm"', className: 'code-string' },
      { text: '})', className: 'code-keyword' },
    ],
    [
      { text: 'async def ', className: 'code-keyword' },
      { text: 'fetch_cost_per_ton(ctx: Context, criteria: CostCriteriaInput) -> CostBreakdown:', className: '' },
    ],
    [
      { text: '    # Protect async event loop by wrapping ODBC in threadpool', className: 'code-comment' },
    ],
    [
      { text: '    async with ', className: 'code-keyword' },
      { text: 'get_cost_repository(ctx) as repo:', className: '' },
    ],
    [
      { text: '        return await ', className: 'code-keyword' },
      { text: 'repo.compute_cost_per_ton(criteria)', className: 'code-string' },
    ],
  ],
  'domain_contract.ts': [
    [
      { text: '// Clean Domain Boundary Contract — Zero Framework Leakage', className: 'code-comment' },
    ],
    [
      { text: 'import ', className: 'code-keyword' },
      { text: '{ z } ', className: '' },
      { text: 'from ', className: 'code-keyword' },
      { text: "'zod'", className: 'code-string' },
    ],
    [
      { text: '', className: '' },
    ],
    [
      { text: 'export const ', className: 'code-keyword' },
      { text: 'CodexEntitySchema = z.object({', className: '' },
    ],
    [
      { text: '  id: ', className: '' },
      { text: 'z.string().uuid()', className: 'code-string' },
      { text: ',', className: '' },
    ],
    [
      { text: '  name: ', className: '' },
      { text: 'z.string().min(1).max(128)', className: 'code-string' },
      { text: ',', className: '' },
    ],
    [
      { text: '  category: ', className: '' },
      { text: "z.enum(['character', 'location', 'lore', 'faction'])", className: 'code-number' },
      { text: ',', className: '' },
    ],
    [
      { text: '  encryption: ', className: '' },
      { text: "z.literal('AES-256-GCM')", className: 'code-string' },
      { text: ',', className: '' },
    ],
    [
      { text: '  relations: ', className: '' },
      { text: 'z.array(z.string().uuid())', className: 'code-string' },
      { text: ',', className: '' },
    ],
    [
      { text: '})', className: '' },
    ],
    [
      { text: '', className: '' },
    ],
    [
      { text: 'export type ', className: 'code-keyword' },
      { text: 'CodexEntity = z.infer<typeof CodexEntitySchema>', className: 'code-string' },
    ],
  ],
}

