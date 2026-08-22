# Olive Labs Rebranding & Development Roadmap
*The Digital Atelier, Sovereign Instruments, and High-Craft Systems Engineering*

---

## 1. Executive Summary & Brand Positioning

This document serves as the master development roadmap for transforming **Olive Labs** into a dual-purpose digital sanctuary: a **Boutique Software House (Dev House)** and the **Personal Architecture Portfolio of Herik Colares Rezende**.

```
+----------------------------------------------------------------------------------------------------+
|                                    OLIVE LABS STUDIO                                               |
|                              "Craft for the creative voice."                                       |
+----------------------------------------------------------------------------------------------------+
                                                  │
                 ┌────────────────────────────────┴───────────────────────────────┐
                 ▼                                                                ▼
┌────────────────────────────────────────┐                       ┌───────────────────────────────────┐
│         I. THE INSTRUMENTS             │                       │      II. BESPOKE COMMISSIONS      │
│         (Flagship Products)            │                       │            (Dev House)            │
│  • Folior Writer (folior.io)           │                       │  • Production FastMCP Systems     │
│  • Digital Vellum & AI Mentoring       │                       │  • High-Throughput Go & Python    │
│  • Codex Graph & AES-256 Encryption    │                       │  • Hexagonal & Clean Architecture │
│  • Local-first creative sovereignty    │                       │  • Selective Client Partnerships  │
└────────────────────────────────────────┘                       └───────────────────────────────────┘
                                                  │
                                                  ▼
┌────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                       III. THE TOOLMAKER                                           │
│                              (Herik Colares Rezende — Portfolio)                                   │
│  • Principal Systems Architect & AI Systems Engineer                                               │
│  • Deterministic engineering surrounding non-deterministic AI models                               │
│  • Proven complexity mastery: Enterprise ERP FastMCP Gateways, Native Go AI, Zero-ORM SQL          │
└────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Core Case Studies & Engineering Anchors

### Anchor A: Folior Writer (`folior.io`) — *The Flagship Creative Instrument*
* **Domain:** Creative Writing, Novelists, Journalists, Researchers.
* **Core Philosophy:** Non-intrusive intelligence. AI as the collaborative muse, never the ghostwriter.
* **Technical Highlights:**
  * **Digital Vellum:** Distraction-free, high-performance editor.
  * **Style-Aware Mentoring:** Contextual analysis and ghost suggestions that honor the author's voice without generating synthetic text.
  * **Codex Entity Graph:** Relational knowledge maps for characters, chapter hierarchies, and world-building compendiums.
  * **Data Sovereignty:** Local-first architecture with client-side AES-256 IP encryption.

### Anchor B: FastMCP Enterprise Gateway (`Pedreira Um ERP Bridge`) — *The Systems Engineering Showcase*
* **Domain:** Mission-critical ERP integration, Financial/Production analytics, Industrial telemetry.
* **Architecture:** Hexagonal (Ports & Adapters) in Python 3.12 with FastMCP.
* **Technical Complexity Overcome:**
  * **Zero-ORM Mandate:** Pure, parameterized SQL execution via `pyodbc` for high-volume aggregations across multi-level chart of accounts (levels 1–6) and complex cost centers.
  * **Async Event Loop Protection:** Encapsulated synchronous ODBC calls inside `asyncio.to_thread()` to prevent blocking FastMCP's high-concurrency streamable HTTP transport.
  * **Enterprise Security in Depth:**
    * OAuth Proxy with Microsoft Entra ID (Azure AD).
    * Dynamic Employee Authorization Gate via MariaDB (re-verifying user active status on every token refresh without token revocation overhead).
    * Dual-trail fail-open audit logging (`audit_logins`, `audit_tool_calls`) capturing execution duration (`time_spent_ms`), token counts, and sanitized JSON parameters.
  * **Cross-Context In-Memory Aggregations:** `CostRepository` orchestrates simultaneous connections across distinct databases (`CONTABIL` + `PRODUCAO_SGA` + `Minerion ERP`), computing complex metrics like $R\$/\text{tl}$ in memory.
  * **Legacy Protocol Resolution:** Containerized OpenSSL compatibility patch (`SECLEVEL=0`) to safely bridge modern Debian runtimes with legacy enterprise SQL Server ciphers.

---

## 3. Section-by-Section Rebrand Architecture

| Section | Old Implementation | New Rebrand Specification |
| :--- | :--- | :--- |
| **1. Header & Navigation** | Generic brand + contact button | Logo + Nav (`Manifesto`, `Instruments`, `Commissions`, `Architect`) + Theme Toggle + `[ Commission a Build ]` |
| **2. Hero Section** | `[SYSTEM_INIT]`, Industrial DevOps copy, `.sh` buttons | *"Craft for the creative voice. Software as digital instruments."* Subtitle highlighting the studio and Herik's architectural leadership. |
| **3. Core Ideals** | Generic Infrastructure/RAG cards | **The Atelier Pillars:**<br>1. Digital Luthiery & Tactile Code<br>2. Non-Intrusive Intelligence (The Muse)<br>3. Deterministic Foundations for Non-Deterministic AI |
| **4. Flagship Showcase** | Folior with `CARBON_NEUTRAL` / `99.99% SLA` badges | **Folior Writer Deep Dive:** Highlighting the Digital Vellum, Codex Graph, Style-Aware Mentoring, and Local-First Encryption. |
| **5. The Architect's Workbench** | Raw docker-compose and bash scripts terminal | **Interactive Multi-Language Console:**<br>• Tab 1: `engine.go` (Go Native Core & GenAI)<br>• Tab 2: `mcp_gateway.py` (FastMCP Enterprise Server & Auth Gate)<br>• Tab 3: `domain_contract.ts` (Clean Domain Contracts & Zod) |
| **6. Enterprise Case Study / Dev House** | Anonymous side projects | **Bespoke Commissions & Systems Showcase:**<br>• FastMCP Enterprise Gateway (Pedreira Um ERP Case Study)<br>• High-Throughput Sovereign SaaS Backends<br>• Architectural Auditing & Hexagonal Modernization |
| **7. The Architect** | Anonymous "Engineering Syndicate" | **Herik Colares Rezende Bio & Credentials:**<br>• Principal Software Architect & AI Systems Engineer<br>• B.S. in Computer Science (2026), Minas Gerais, Brazil<br>• Direct links to GitHub (`devherik`), LinkedIn (`herik-colares`), and Folior |
| **8. CTA & Dialogue** | `START_PROTOCOL.EXE` | *"Ready to architect an enduring system?"* Elegant commission inquiry banner. |

---

## 4. Phase-by-Phase Execution Plan

### Phase 1: Domain Schemas & State Contracts (`Layer 1`)
- [x] **1.1. Update Domain Types in `src/schemas.ts`:**
  - Defined Zod schemas and TypeScript interfaces for `Instrument`, `CaseStudy`, `Pillar`, `ArchitectProfile`, and `WorkbenchTab`.
- [x] **1.2. Refactor Interactive Workbench Data in `src/components/terminalData.ts`:**
  - Replaced bash script tokens with authentic, syntax-highlighted code tokens:
    - `engine.go`: Concurrent Go worker pipeline with Google GenAI SDK.
    - `mcp_gateway.py`: FastMCP Ports & Adapters snippet showing the Entra ID + MariaDB Auth Gate and tool registration.
    - `domain_contract.ts`: Immutable domain models and Zod boundary validators.

### Phase 2: Interactive Workbench & Component Polish (`Layer 2 & 3`)
- [x] **2.1. Workbench Component Enhancements:**
  - Updated tab labels and active state styling to reflect `engine.go`, `mcp_gateway.py`, and `domain_contract.ts`.
  - Maintained fluid typing and tab-switching animations with Anime.js.
- [x] **2.2. Visual Styling Tokens in `src/index.css` & `src/App.css`:**
  - Refined custom properties for the Cyber-Mediterranean palette.
  - Added styling for the **Flagship Instrument Showcase**, **Architect Profile Card**, and **Case Study Breakdown**.

### Phase 3: Layout Integration in `src/App.tsx` (`Presentation Layer`)
- [x] **3.1. Re-architect the Hero Section:**
  - Implemented the refined headline *"Craft for the creative voice"*, subtitle, and atelier action buttons.
- [x] **3.2. Implement the Atelier Ideals Section:**
  - Rendered the 3 core pillars (*Digital Luthiery*, *Non-Intrusive Intelligence*, *Deterministic Foundations*) with geometric node icons and refined copy.
- [x] **3.3. Build the Folior Flagship Showcase:**
  - Feature-rich layout displaying Folior Writer's value proposition, codex graph, and direct links to `folior.io`.
- [x] **3.4. Build the Enterprise MCP & Systems Showcase (Dev House):**
  - Featured the **FastMCP ERP Bridge** case study with architectural badges (Hexagonal, Entra ID OAuth, No-ORM SQL, Fail-Open Audit).
- [x] **3.5. Integrate the "About the Architect" Section:**
  - Connected Herik Colares Rezende's profile, core principles, GitHub, and LinkedIn links.
- [x] **3.6. Refactor the Contact / Commission Banner:**
  - Implemented the high-end commission dialogue launcher and navigation links.

### Phase 4: Quality, Verification & Performance (`The Verifier`)
- [x] **4.1. Unit & Component Testing:**
  - Ran `npm run test` (`npx vitest run` - 100% passing tests).
- [x] **4.2. Static Analysis & Linting:**
  - Ran `npm run lint` (`eslint` with `typescript-eslint` - 0 errors, 0 warnings).
- [x] **4.3. Responsive & Theme Verification:**
  - Verified layout across Desktop, Tablet, and Mobile in both Light and Dark modes.
- [x] **4.4. Production Build Verification:**
  - Ran `npm run build` (`tsc -b && vite build` bundled successfully in 1.07s).

---

## 5. Technical Stack & Governance

* **Framework:** React 19 + TypeScript (Strict Mode)
* **Build Utility:** Vite
* **State Management:** Zustand with local storage persistence
* **Validation:** Zod (runtime boundary enforcement)
* **Micro-Animations:** Anime.js
* **Quality Standard:** Clean Architecture & SRP compliance (zero logic leakage into presentation components)
