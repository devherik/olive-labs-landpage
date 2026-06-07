# Olive Labs — Landpage

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Engineered for Longevity](https://img.shields.io/badge/Engineered%20for-Longevity-708238)](./CONTEXT.md)
[![Rooted in Logic](https://img.shields.io/badge/Rooted%20in-Logic-1A1D20)](./CONTEXT.md)

This repository contains the landing page for **Olive Labs**, a premium software house and studio focused on high-craft side projects, SaaS development, and professional-grade developer tooling.

For detailed background details, refer to the foundational documents:
*   [CONTEXT.md](./CONTEXT.md) — Studio Manifesto & Core Documentation.
*   [DESIGN.md](./DESIGN.md) — Cyber-Mediterranean Design System & Aesthetic Blueprint.

---

## 1. Manifesto & Core Pillars

Olive Labs operates on the core mantra: **"Engineered for Longevity. Rooted in Logic."**

We design digital environments where complex ideas safely take root and flourish, anchored on three unyielding pillars:

### I. Greenfield Excellence & Clean Architecture
We specialize in creating new, unburdened systems from scratch using clean code and SOLID design principles. Technical debt is treated as a choice—we choose sustainability.

### II. Symbiotic (Ethical) Intelligence
We reject AI as a replacement for human output. At Olive Labs, **AI is the Muse, never the Ghostwriter**.
*   **Augmentation, Not Automation:** Multi-agent workflows and local models exist to accelerate human research and manage data organization.
*   **Creative Sovereignty:** The final output belongs entirely to the human designer.

### III. Radical Simplicity & Focus
We build blazingly fast, keyboard-centric, utility-driven interfaces for professionals who command high-performance environments, completely free from addictive UX loops and product bloat.

---

## 2. Technology & Architecture Strategy

*   **Frontend Web App:** High-performance single page application built on React 19, TypeScript, and Vite.
*   **Backend Services:** Powered by Go (for concurrent microservices) and Python (for orchestration and data engineering).
*   **Intelligent Data Layer:** Offline-first Retrieval-Augmented Generation (RAG) and vector databases for sovereign, secure knowledge bases.
*   **Infrastructure:** Fully containerized using Docker, designed to run reliably on independent servers.

---

## 3. The "Cyber-Mediterranean" Design System

The visual language of Olive Labs is established to scream **high-end software studio**, treating the "olive" concept as a mathematical database node.

### Core Color Palette
*   **Primary Dark (Deep Slate / Charcoal):** `#1A1D20`
*   **Studio Accent (Sophisticated Olive / Sage):** `#708238`
*   **Tech Highlight (Vibrant Mint / Digital Green):** `#40E0D0`
*   **Background (Off-Cream):** `#F8F9FA`

### Typography
*   **Brand & Display:** Montserrat (Geometric, bold display sans-serif)
*   **Body Text:** Inter (High legibility, clean sans-serif)
*   **Interface & Monospace:** JetBrains Mono (For interface controls, code, and layout metrics)

---

## 4. Development & Verification Guide

This project is built using React + TypeScript + Vite.

### Prerequisites
*   Node.js or Bun package manager (see [package.json](./package.json)).

### Available Scripts
Run the following scripts from the project root:

```bash
# Start the local development server with Hot Module Replacement (HMR)
npm run dev      # or bun run dev

# Run linting checks using ESLint
npm run lint     # or bun run lint

# Compile TypeScript and build the production bundle
npm run build    # or bun run build

# Preview the built production application locally
npm run preview  # or bun run preview
```

---

## 5. Architectural Standards

When contributing code or features to this repository:
1.  **Strict Layer Separation:** Ensure user interfaces do not contain core business logic.
2.  **Typography Consistency:** Use monospaced labels for interactive elements and JetBrains Mono for system metrics.
3.  **No Arbitrary Borders:** Align surfaces strictly to the 12-column fixed grid with 24px gutters. Use low-contrast outliner styling over floating box-shadow elevations.
