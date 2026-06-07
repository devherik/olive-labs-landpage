---
name: Cyber-Mediterranean Engineering
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#44474a'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#75777a'
  outline-variant: '#c5c6ca'
  surface-tint: '#5c5f62'
  primary: '#010204'
  on-primary: '#ffffff'
  primary-container: '#1a1d20'
  on-primary-container: '#828589'
  inverse-primary: '#c5c6ca'
  secondary: '#54651e'
  on-secondary: '#ffffff'
  secondary-container: '#d7ec95'
  on-secondary-container: '#5a6b24'
  tertiary: '#000202'
  on-tertiary: '#ffffff'
  tertiary-container: '#00211e'
  on-tertiary-container: '#009589'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e1e2e6'
  primary-fixed-dim: '#c5c6ca'
  on-primary-fixed: '#191c1f'
  on-primary-fixed-variant: '#44474a'
  secondary-fixed: '#d7ec95'
  secondary-fixed-dim: '#bbcf7c'
  on-secondary-fixed: '#161e00'
  on-secondary-fixed-variant: '#3d4c05'
  tertiary-fixed: '#61f9e9'
  tertiary-fixed-dim: '#3adccc'
  on-tertiary-fixed: '#00201d'
  on-tertiary-fixed-variant: '#005049'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  interface-code:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  max-width: 1440px
---

## Brand & Style

This design system establishes a "Cyber-Mediterranean" aesthetic—a fusion of classical architectural order and high-velocity digital engineering. It rejects traditional organic or agricultural imagery, instead treating the "olive" concept as a mathematical node within a network or a dense intersection in a database schema.

The personality is engineering-first: precise, authoritative, and radical in its simplicity. The visual language draws from **Minimalism** and **Corporate Modernism**, emphasizing geometric symmetry, syntax abstractions, and a keyboard-centric utility that suggests blazing-fast performance. Every element must feel like a deliberate line of code: functional, optimized, and essential.

## Colors

The palette balances the gravity of deep slate with the sophisticated tone of Mediterranean sage, punctuated by a high-frequency digital mint.

- **Primary (Deep Slate):** Used for structural elements, typography, and heavy "system" areas. It provides the grounding force.
- **Secondary (Sophisticated Olive):** Applied to secondary actions and accents that require a sense of established luxury and calm.
- **Tech Highlight (Vibrant Mint):** Reserved for data visualizations, active states, and "success" signals. It represents the "cyber" pulse of the studio.
- **Background (Off-Cream):** A warm, high-end neutral that prevents the interface from feeling cold, suggesting a premium, archival quality.

## Typography

The typography strategy separates brand expression from utility.

- **Display & Headings:** **Montserrat** provides a geometric, bold foundation. It should be used sparingly to anchor sections and communicate high-level intent.
- **Body Text:** **Inter** is the workhorse for long-form reading and general interface descriptions, offering neutral legibility that doesn't distract from technical content.
- **Interface & Utilities:** **JetBrains Mono** is utilized for all functional UI elements, including labels, buttons, and data inputs. This reinforces the engineering-first ethos, treating the interface like a command line or a code editor.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid** model on desktop to maintain geometric symmetry, transitioning to a fluid model on mobile.

- **Grid:** A 12-column grid system with generous 24px gutters. Elements should align strictly to these columns to evoke a sense of architectural blueprint.
- **Rhythm:** A 4px/8px baseline shift is mandatory. All heights and paddings must be multiples of 4 to ensure a "tight," engineered feel.
- **Keyboard Optimization:** Layouts should prioritize vertical scanning and provide clear visual paths for keyboard navigation. High-density data views are encouraged over excessive whitespace in "tool" areas.

## Elevation & Depth

This design system eschews soft shadows in favor of **Low-Contrast Outlines** and tonal layering.

- **Depth via Borders:** Surfaces are separated by 1px solid hairlines (#1A1D20 at 10% opacity). 
- **Z-Axis Layers:** Higher-level containers (modals, popovers) use the Background color but are defined by a slightly darker border and a Tech Highlight accent on the top edge.
- **Syntax Abstractions:** Use subtle background fills (Off-Cream vs. a slightly darker grey-tinted cream) to distinguish between content areas and navigation sidebars, similar to "panels" in an IDE.

## Shapes

The shape language is **Soft (0.25rem)**. This slight rounding provides just enough refinement to feel premium without losing the "engineered" precision of a sharp corner.

- **Standard Elements:** Buttons, input fields, and tags use the base `rounded` (4px).
- **Large Containers:** Cards and modals use `rounded-lg` (8px).
- **Interactive Nodes:** Small utility icons and status indicators may use circles to represent "network nodes" or database intersections.

## Components

- **Buttons:** Use monospaced labels (JetBrains Mono). Primary buttons are solid Deep Slate with Mint text on hover. Secondary buttons are outlined with a 1px hairline.
- **Chips & Tags:** Styled like code syntax. Use light olive backgrounds with dark olive text for categories; use Mint for active system statuses.
- **Input Fields:** Minimalist. Only a bottom border that transforms into a full 1px Mint outline on focus. Labels should include "shortcut hints" (e.g., `[CMD+K]`) where applicable.
- **Cards:** No shadows. Use 1px borders. Header sections of cards should use a subtle 4px top-accent bar in Olive or Mint to categorize the data type.
- **Command Palette:** A central component for the design system. It should appear as a floating modal with a backdrop blur, using monospaced typography for all searchable actions.
- **Lists:** High-density, monospaced rows with subtle divider lines. Hover states should highlight the entire row in a very faint Mint tint to facilitate fast selection.