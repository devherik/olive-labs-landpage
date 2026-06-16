# GEMINI.md

## I. System Architecture & Topology

### 1. Runtime Topology
The Olive Labs Landing Page is a highly optimized, client-side React Single Page Application (SPA) compiled using Vite. In development and production, it can be run via a local Docker container served by Nginx.

```
+-----------------------------------------------------------+
|                      Client Browser                       |
+-----------------------------------------------------------+
                              |
                              | HTTP(S) Requests
                              v
+-----------------------------------------------------------+
|                     Nginx Web Server                      |
|             (Serves static build artifacts)               |
+-----------------------------------------------------------+
                              |
                              | Serves Files (HTML, JS, CSS, Assets)
                              v
+-----------------------------------------------------------+
|                      Vite React App                       |
|   - SPA routing/scrolling                                 |
|   - Zustand global state (Theme, Locale, Font)            |
|   - Anime.js dynamic micro-animations                    |
+-----------------------------------------------------------+
```

### 2. Clean Architecture Mapping (Frontend)
Although it is a frontend codebase, we maintain a strict separation of concerns following our clean-slate architecture mantra:

```
+--------------------------------------------------------------------------+
| Layer 3: Presentation (Components & Views)                              |
| - App.tsx (Main Layout Coordinator)                                      |
| - src/components/ (TerminalTypewriter.tsx, etc.)                          |
| - src/animations/ (ScrollReveal.tsx, AnimatedFadeIn.tsx, etc.)            |
+--------------------------------------------------------------------------+
                                     |
                                     v
+--------------------------------------------------------------------------+
| Layer 2: Application State & Logic (Hooks & Store)                       |
| - src/hooks/ (useAnimatePresence.ts)                                     |
| - src/store.ts (Zustand Global State Manager)                            |
+--------------------------------------------------------------------------+
                                     |
                                     v
+--------------------------------------------------------------------------+
| Layer 1: Core Domain Rules (Schemas & Metadata)                          |
| - src/schemas.ts (Zod Validation Contracts)                              |
| - src/components/terminalData.ts (Mock System Information)                |
+--------------------------------------------------------------------------+
```

---

## II. Technology Stack & Database Schemas

### 1. Technology Stack
*   **Core Framework:** React 19 (Strict Mode + Concurrent rendering support)
*   **Language:** TypeScript (Strict Type Checking)
*   **Build Utility:** Vite + TypeScript Compiler (`tsc`)
*   **Styling:** Vanilla CSS (`index.css` and `App.css`) with CSS custom properties matching our design system tokens. No TailwindCSS.
*   **State Management:** Zustand (Persisted client-side UI configurations)
*   **Validation:** Zod (Domain and state boundaries enforcement)
*   **Micro-Animations:** Anime.js + Web Layout Effects
*   **Linting & Quality:** ESLint with typescript-eslint rules
*   **Test Runner:** Vitest + Happy DOM + Testing Library

### 2. Database & Data Models
There is no physical database in this repository, as it is a static landing page. However, configuration data, schema validations, and mock console outputs are represented inside [src/schemas.ts](file:///home/herikrezende/Projects/olive-labs/landpage/src/schemas.ts) and [src/components/terminalData.ts](file:///home/herikrezende/Projects/olive-labs/landpage/src/components/terminalData.ts).

---

## III. Core System Rules & Guarantees

### 1. Cyber-Mediterranean Design Constraints
All interface additions must strictly align with the `Cyber-Mediterranean` design guidelines in [DESIGN.md](file:///home/herikrezende/Projects/olive-labs/landpage/DESIGN.md):
*   **Color Palette:** Limit color usages to `--primary` (Slate `#010204`), `--secondary` (Olive `#54651e`), `--tertiary-fixed` (Mint `#61f9e9`), and `--background` (Off-Cream `#f8f9fa`).
*   **Typography Separation:**
    *   Display/Headings: `Montserrat` (bold, geometric structure).
    *   Body/Content: `Inter` (high-readability, neutral sans-serif).
    *   Interface/Utilities/Metrics: `JetBrains Mono` (engineering-first monospaced font).
*   **Low-Contrast Borders:** Elevate panels using 1px solid outlines (`var(--primary)` at `10%` opacity) instead of drop-shadows.
*   **Soft Shapes:** Use `rounded` (4px/0.25rem) for interactive items (buttons, inputs) and `rounded-lg` (8px) for major card sections.

### 2. General Code Quality Guarantees
*   **Zero-ORM Mandate (for future integrations):** We utilize direct, optimized data definitions.
*   **SRP (Single Responsibility Principle):** Keep hooks focused strictly on logic (e.g., animation management) and keep components focused strictly on layout.
*   **DIP (Dependency Inversion):** Depend on schemas and interfaces, not concrete files or arbitrary data shapes.

---

## IV. Socratic TDD Development Flow

When building new features (e.g., interactive widgets, hooks, system tools):
1.  **Define Domain Contracts:** Declare schemas or types in [src/schemas.ts](file:///home/herikrezende/Projects/olive-labs/landpage/src/schemas.ts) using Zod.
2.  **Write Failing Unit Tests (Red):** Create a test file under [src/tests/](file:///home/herikrezende/Projects/olive-labs/landpage/src/tests/) asserting the intended behavior of the hook or helper.
3.  **Write Concrete Code (Green):** Implement the core logic under [src/hooks/](file:///home/herikrezende/Projects/olive-labs/landpage/src/hooks/) or [src/components/](file:///home/herikrezende/Projects/olive-labs/landpage/src/components/).
4.  **Polish and Refactor:** Run tests and check lints (`npm run test` and `npm run lint`) to ensure the build remains clean and verified.
5.  **Expose Layer:** Consume the verified hook or schema in `App.tsx` or layout sections.

---

## V. Implementation Status & Backlog

### Features & Progress
- [x] **Foundational Manifesto & Blueprint:** [CONTEXT.md](file:///home/herikrezende/Projects/olive-labs/landpage/CONTEXT.md) and [DESIGN.md](file:///home/herikrezende/Projects/olive-labs/landpage/DESIGN.md) defined.
- [x] **Theme & UI State Persistence:** Zustand configuration with local storage persistence and system theme synchronizers in [src/store.ts](file:///home/herikrezende/Projects/olive-labs/landpage/src/store.ts).
- [x] **Interactive Code Console:** Terminal simulation component with simulated typewriter tabs (`TerminalTypewriter.tsx`).
- [x] **Micro-Animations Infrastructure:** Scroll-triggered reveals, presence toggles, and slide-in effects using Anime.js under `src/animations/`.
- [x] **Core Styling Tokens:** Custom property baseline variables in [src/index.css](file:///home/herikrezende/Projects/olive-labs/landpage/src/index.css).
- [x] **Layout Sections:** Hero, Pillars Grid, Tech Stack Terminal, Manifesto Quote, Project Showcase (Flagship + Side Projects), and Contact Action Banner.
- [ ] **Internationalization / Multi-locale:** Support for `en`, `pt-br`, and `fr` translations based on the `locale` state in the Zustand store.
- [ ] **Interactive Keyboard Controls:** Keyboard shortcuts panel (e.g. command palette launcher or quick actions).

### Outstanding Design Questions
1.  Should we hook up the local mailto action to a lightweight sovereign backend handler?
2.  Do we want to expand the interactive console component with executable sandbox commands?
