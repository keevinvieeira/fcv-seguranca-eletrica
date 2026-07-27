---
name: Voltage High-Tech System
colors:
  surface: '#121318'
  surface-dim: '#121318'
  surface-bright: '#38393f'
  surface-container-lowest: '#0d0e13'
  surface-container-low: '#1a1b21'
  surface-container: '#1e1f25'
  surface-container-high: '#292a2f'
  surface-container-highest: '#34343a'
  on-surface: '#e3e1e9'
  on-surface-variant: '#e3bfb3'
  inverse-surface: '#e3e1e9'
  inverse-on-surface: '#2f3036'
  outline: '#aa897f'
  outline-variant: '#5b4138'
  surface-tint: '#ffb59c'
  primary: '#ffb59c'
  on-primary: '#5c1900'
  primary-container: '#ff5f1f'
  on-primary-container: '#561700'
  inverse-primary: '#ab3600'
  secondary: '#bdf4ff'
  on-secondary: '#00363d'
  secondary-container: '#00e3fd'
  on-secondary-container: '#00616d'
  tertiary: '#c6c5d0'
  on-tertiary: '#2f3038'
  tertiary-container: '#93939d'
  on-tertiary-container: '#2b2c35'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdbcf'
  primary-fixed-dim: '#ffb59c'
  on-primary-fixed: '#390c00'
  on-primary-fixed-variant: '#832700'
  secondary-fixed: '#9cf0ff'
  secondary-fixed-dim: '#00daf3'
  on-secondary-fixed: '#001f24'
  on-secondary-fixed-variant: '#004f58'
  tertiary-fixed: '#e3e1ed'
  tertiary-fixed-dim: '#c6c5d0'
  on-tertiary-fixed: '#1a1b23'
  on-tertiary-fixed-variant: '#45464f'
  background: '#121318'
  on-background: '#e3e1e9'
  surface-variant: '#34343a'
typography:
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 72px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.1em
  code-data:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.4'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter-desktop: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  stack-sm: 8px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

The design system is engineered for **FCV Segurança Elétrica** to project an image of absolute precision, high-voltage energy, and modern engineering authority. The brand personality is technical and uncompromising, targeting industrial clients and high-end infrastructure projects.

The visual style merges **Corporate Modern** with **Glassmorphism** and **High-Contrast Bold** elements. This creates a "Control Center" aesthetic—utilizing deep obsidian surfaces, vibrant electrical orange accents, and frosted translucent layers that suggest sophisticated data overlays. The emotional response is one of safety through advanced technology; a feeling that the user is interacting with a powerful, well-regulated system.

## Colors

The palette is anchored in a high-contrast dark mode to simulate specialized engineering software environments.

*   **Primary (Live Wire):** A high-energy, "Electric Orange" (#FF5F1F) used for critical actions, status indicators, and branding pulses. It represents power and alertness.
*   **Secondary (Arc Flash):** A "Cyan Glow" (#00E5FF) used sparingly for data visualizations and interactive highlights, providing a high-tech counterpoint to the orange.
*   **Surface & Background:** The foundation is "Deep Obsidian" (#0A0B10), providing maximum contrast for glowing elements. Tonal variations use "Carbon Grey" (#1A1B23) for container nesting.
*   **Functionality:** Status colors follow the electrical metaphor: Danger/Fault (Red), Warning/Maintenance (Orange), and Secure/Active (Cyan/Green).

## Typography

This design system uses a tripartite typographic strategy to reinforce the industrial narrative.

*   **Headlines:** **Space Grotesk** provides a geometric, futuristic feel. Its slightly idiosyncratic letterforms suggest technical innovation. Display sizes should use tight tracking for a high-impact, editorial look.
*   **Body:** **Inter** is utilized for maximum legibility of technical specifications and safety documentation. Its neutral, systematic nature balances the aggressive headlines.
*   **Data & Labels:** **JetBrains Mono** is used for all "machine-readable" content, such as measurements, serial numbers, and navigational labels. This adds an authentic "engineered" layer to the UI.

## Layout & Spacing

The layout is built on a strict **12-column fluid grid** for desktop, transitioning to a **4-column grid** for mobile. The spacing rhythm is derived from a 4px base unit to ensure alignment with technical schematics.

*   **Grid Logic:** Content is organized into "Modules" that span the grid. Margins are generous on desktop to create a premium, spacious feel, but tighten on mobile to prioritize data density.
*   **Rhythm:** Vertical spacing between sections should be aggressive (48px+) to delineate distinct technical phases or service offerings. 
*   **Density:** Components like data tables or parameter controls use high density (8px padding) to mimic industrial hardware interfaces.

## Elevation & Depth

Visual hierarchy is established through **Tonal Layering** and **Glassmorphism**, rather than traditional soft shadows.

*   **Base Surface:** The bottom-most layer is pure black or Deep Obsidian.
*   **Glass Containers:** Cards and modals use a semi-transparent fill (8-12% white) with a high `backdrop-blur` (20px-30px). A subtle 1px inner border in a low-opacity white creates a "lens" effect.
*   **Glowing Accents:** Instead of shadows, active elements use "Neon Underglows"—diffused drop shadows using the Primary Orange color with 0px offset and large blur radii (15px+) to simulate light emission.
*   **Precision Lines:** Use thin, 1px high-contrast lines to divide sections, reminiscent of circuit board paths.

## Shapes

The shape language is **Soft (0.25rem)**, leaning towards architectural precision. 

*   **Primary Elements:** Buttons and input fields use a consistent 4px radius. This is enough to feel modern but sharp enough to remain professional and industrial.
*   **Containers:** Larger cards may use a slightly increased radius (8px) but never reach "pill" or highly rounded territory, as that would detract from the serious, engineered tone.
*   **Decorative Elements:** Use 45-degree chamfered corners for decorative accents or "technical labels" to mimic industrial stamping.

## Components

*   **Buttons:** The primary button is "Solid Orange" with white or black text. The hover state adds a primary-color glow. Secondary buttons are "Ghost" style with a 1px orange border and no fill.
*   **Input Fields:** Deep charcoal backgrounds with a bottom-only 2px border that "activates" by glowing orange when focused. Labels use the all-caps Monospaced font.
*   **Cards:** Utilizes the glassmorphic style. A card should feel like a pane of glass hovering over a dark background. Headers within cards are separated by thin, 10% opacity lines.
*   **Chips/Badges:** Small, rectangular indicators with heavy letter-spacing. For example, a "HIGH VOLTAGE" badge would have a red background with white monospaced text.
*   **Status Indicators:** Small circular "LEDs" that pulse slightly when active, using the primary orange or secondary cyan.
*   **Technical Dividers:** Instead of plain lines, use a line with a small diamond or square node at one end to signify a "terminal point."