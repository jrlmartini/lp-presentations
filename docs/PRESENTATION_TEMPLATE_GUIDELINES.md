# Presentation Template Guidelines

> Launchpad Hub — Design System for Course Presentations

This document is the single source of truth for building presentation slides.
A new developer should be able to create a fully compliant slide deck by reading
only this file.

---

## Table of Contents

1. [Design Principles](#1-design-principles)
2. [File Architecture](#2-file-architecture)
3. [Slide Anatomy](#3-slide-anatomy)
4. [Placement Rules](#4-placement-rules)
5. [Dark / Light Theme Specification](#5-dark--light-theme-specification)
6. [Typography](#6-typography)
7. [Spacing & Layout Tokens](#7-spacing--layout-tokens)
8. [Responsive Behavior](#8-responsive-behavior)
9. [Component Reference](#9-component-reference)
10. [Creating a New Presentation](#10-creating-a-new-presentation)
11. [Creating New Components](#11-creating-new-components)
12. [Do / Don't Examples](#12-do--dont-examples)
13. [Validation Checklist](#13-validation-checklist)

---

## 1. Design Principles

| Principle | Description |
|-----------|-------------|
| **Consistency** | Every slide follows the same structure, spacing, and naming. |
| **Readability** | Text is legible at any viewport size. Contrast meets WCAG AA. |
| **Responsiveness** | Layout adapts to the container via `cqw` units and `clamp()`. |
| **Simplicity** | Minimal inline styles. Design decisions live in tokens. |
| **Scalability** | New slide types and components can be added without refactoring. |

---

## 2. File Architecture

```
/
├── assets/                  Brand assets (logos, shared images)
│   ├── Logo-light.png       Used on dark slides
│   ├── Logo-dark.png        Used on light slides
│   ├── Logo-light.svg
│   └── Logo-dark.svg
├── styles/                  Shared design system
│   ├── tokens.css           Design tokens (colors, typography, spacing)
│   ├── deck.css             Deck shell, themes, transitions, controls
│   ├── slide-presets.css    Slide type variants (cover, content, divider)
│   └── components.css       Reusable slide components (.slide-*)
├── scripts/
│   └── deck-engine.js       Shared navigation & build-step logic
├── apre01/                  Canonical presentation (Aula 0.1)
│   └── index.html
├── docs/
│   └── PRESENTATION_TEMPLATE_GUIDELINES.md  (this file)
├── index.html               Landing page
└── teste/                   EXCLUDED — not part of production
```

### Import order

Every presentation must link the shared CSS in this order:

```html
<link rel="stylesheet" href="../styles/tokens.css" />
<link rel="stylesheet" href="../styles/deck.css" />
<link rel="stylesheet" href="../styles/slide-presets.css" />
<link rel="stylesheet" href="../styles/components.css" />
```

Place presentation-specific `<style>` blocks **after** the shared imports.

Include the deck engine at the end of `<body>`:

```html
<script src="../scripts/deck-engine.js"></script>
```

---

## 3. Slide Anatomy

Every slide follows a two-row grid: **brand header** + **content area**.

```
┌─────────────────────────────────────────────┐
│  [slide-tag]                   [slide-logo] │  ← .slide-brand
│─────────────────────────────────────────────│
│                                             │
│  Title (h1 or h2)                           │  ← .slide-content
│  Lead text / Bullets / Visual elements      │
│                                             │
│                                             │
├─────────────────────────────────────────────┤
│ ■■■■■■■■■■■■■■■□□□□□□□□□□ progress bar     │
└─────────────────────────────────────────────┘
```

### HTML skeleton

```html
<section class="slide dark content-slide" data-build="3">
  <header class="slide-brand">
    <span class="slide-tag">Section Name</span>
    <img class="slide-logo" src="../assets/Logo-light.png" alt="Launchpad Hub" />
  </header>
  <div class="slide-content">
    <h2>Slide Title</h2>
    <ul class="slide-bullets">
      <li class="slide-bullet-item" data-step="1">First point</li>
      <li class="slide-bullet-item" data-step="2">Second point</li>
    </ul>
    <div class="slide-panel" data-step="3">
      <!-- Supporting visual -->
    </div>
  </div>
</section>
```

---

## 4. Placement Rules

### Section tag (`.slide-tag`)

| Property | Value |
|----------|-------|
| Position | Top-left, inside `.slide-brand` header |
| Font | `var(--font-heading)` at `var(--font-size-tag)` |
| Accent bar | `1.4em` wide, `0.2em` tall, `var(--color-accent)` |

### Title (h1 / h2)

| Slide Type | Element | Font Size Token |
|------------|---------|-----------------|
| Cover | `h1` | `--font-size-display` (clamp 2.2rem → 5.3rem) |
| Content | `h2` | `--font-size-subtitle` (clamp 1.2rem → 2.95rem) |

### Logo (`.slide-logo`)

| Property | Value |
|----------|-------|
| Position | Top-right, inside `.slide-brand` header |
| Width | `var(--logo-width)` = `clamp(140px, 22cqw, 260px)` |
| Dark slides | `Logo-light.png` (white logo) |
| Light slides | `Logo-dark.png` (dark logo) |

### Content block (`.slide-content`)

| Slide Type | Max Width | Top Offset |
|------------|-----------|------------|
| Cover | 85% | 0 (vertically centered) |
| Content | 88% | `clamp(1.8rem, 3.2cqw, 3.5rem)` |
| Section Divider | 85% | 0 (vertically centered) |

---

## 5. Dark / Light Theme Specification

### Semantic color tokens

| Token | Dark Theme Value | Light Theme Value | Usage |
|-------|-----------------|-------------------|-------|
| `--color-bg` | `#080824` (navy-900) | — | Page/deck background |
| `--color-bg-deep` | `#070a12` (navy-950) | — | Deepest background |
| `--color-bg-surface` | — | `#e7ecf6` (light-100) | Light slide bg |
| `--color-bg-surface-alt` | — | `#c8d2e8` (light-200) | Light slide gradient end |
| `--color-text` | `#e7ecf6` (light-100) | — | Primary text on dark |
| `--color-text-muted` | `#c8d2e8` (light-200) | — | Secondary text on dark |
| `--color-text-inverse` | `#080824` (navy-900) | — | Text on light slides |
| `--color-accent` | `#f20f46` | `#f20f46` | Accent / bullets (dark) |
| `--color-accent-strong` | `#7b0037` | `#7b0037` | Bullets on light slides |

### Theme classes

Apply to each `<section class="slide">`:

```css
/* Dark slide */
.slide.dark {
  background: linear-gradient(145deg, var(--color-bg), #030316 72%);
  color: var(--color-text);
}

/* Light slide */
.slide.light {
  background: linear-gradient(145deg, var(--color-bg-surface), var(--color-bg-surface-alt));
  color: var(--color-text-inverse);
}
```

### Contrast guidance

- Dark slides: light text (#e7ecf6) on navy (#080824) — contrast ratio ~14:1
- Light slides: navy text (#080824) on light (#e7ecf6) — contrast ratio ~14:1
- Accent (#f20f46) is used for bullets, icons, and decorative elements only — **never** as text color on either theme

### Logo selection by theme

| Theme | Logo file |
|-------|-----------|
| `.slide.dark` | `Logo-light.png` |
| `.slide.light` | `Logo-dark.png` |

---

## 6. Typography

### Font families

| Token | Value | Usage |
|-------|-------|-------|
| `--font-heading` | `"Orbitron", sans-serif` | Titles, tags, headings |
| `--font-body` | `"Inter", system-ui, sans-serif` | Body text, bullets, UI |

### Font size scale

All sizes use `clamp(min, preferred, max)` with `cqw` (container query width) for fluid scaling.

| Token | Min | Preferred | Max | Usage |
|-------|-----|-----------|-----|-------|
| `--font-size-display` | 2.2rem | 5.3cqw | 5.3rem | Cover / section-divider titles |
| `--font-size-title` | 1.8rem | 4.8cqw | 5rem | Default h1 |
| `--font-size-subtitle` | 1.2rem | 2.75cqw | 2.95rem | Content slide h2 |
| `--font-size-lead` | 1.1rem | 1.9cqw | 2rem | Descriptive paragraph below title |
| `--font-size-body` | 1.12rem | 1.95cqw | 1.95rem | Bullet items, body text |
| `--font-size-small` | 0.92rem | 1.25cqw | 1.28rem | Panels, folders |
| `--font-size-caption` | 0.82rem | 1.08cqw | 1.22rem | Captions, fine print |
| `--font-size-tag` | 1.05rem | 1.45cqw | 1.55rem | Section tag label |

### Line heights

| Token | Value | Usage |
|-------|-------|-------|
| `--line-height-tight` | 1.12 | Headings |
| `--line-height-body` | 1.4 | Body text |
| `--line-height-reset` | 1 | Buttons, single-line elements |

---

## 7. Spacing & Layout Tokens

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--space-layout` | `clamp(1rem, 2.3cqw, 2.8rem)` | Slide padding (all sides) |
| `--space-xs` | `0.45em` | Tight gaps (tag elements) |
| `--space-sm` | `0.75em` | Bullet item gap |
| `--space-md` | `1em` | General component spacing |
| `--space-lg` | `1.4em` | Section spacing |

### Layout

| Token | Value | Description |
|-------|-------|-------------|
| `--slide-width` | `min(95vw, 180vh)` | Deck width (16:9 constrained) |
| `--slide-height` | `min(95vh, 56.25vw)` | Deck height (16:9 constrained) |
| `--radius-base` | `clamp(10px, 1.2cqw, 24px)` | Border radius for deck & panels |
| `--logo-width` | `clamp(140px, 22cqw, 260px)` | Logo image width |

---

## 8. Responsive Behavior

### Container-based sizing

The `.deck` element uses `container-type: inline-size`, enabling all child elements
to scale relative to the deck width via `cqw` units.

This means:
- Text, spacing, and element sizes scale proportionally when the deck resizes
- No media-query breakpoints needed for most layout changes
- The deck itself fits within the viewport via `min()` functions

### Scaling constraints

| Aspect | Strategy |
|--------|----------|
| Deck size | `min(95vw, 180vh)` width × `min(95vh, 56.25vw)` height — always fits viewport in 16:9 |
| Typography | All sizes use `clamp(min, ideal, max)` — never too small or too large |
| Padding | `clamp(1rem, 2.3cqw, 2.8rem)` scales with container |
| Border radius | `clamp(10px, 1.2cqw, 24px)` stays proportional |

### Narrow viewport fallback

```css
@media (max-aspect-ratio: 16/10) {
  .slide-content { max-width: 94%; }
  .slide-cards--5col { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
```

### Min/max typography rules

- **Minimum**: Smallest size in `clamp()` ensures readability on small screens (e.g., body text never below 1.12rem)
- **Maximum**: Largest size in `clamp()` prevents oversized text on ultra-wide screens
- **Preferred**: `cqw` unit scales fluidly between min and max

---

## 9. Component Reference

All classes use the `.slide-*` prefix. BEM-inspired naming: `.slide-component`, `.slide-component--modifier`, `.slide-component__element`.

### `.slide-brand`
Header bar with section tag and logo. Always the first child of a slide.

### `.slide-tag`
Section label with accent bar (auto-generated via `::before`).

### `.slide-logo`
Logo image. Use `Logo-light.png` on dark, `Logo-dark.png` on light.

### `.slide-content`
Content wrapper. Second row of the slide grid.

### `.slide-lead`
Descriptive paragraph below title. Uses `--font-size-lead`.

### `.slide-bullets` / `.slide-bullet-item`
Bullet list. Items get accent-colored square markers via `::before`.

### `.slide-panel`
Bordered content box for supporting visuals. Add `.slide-panel--grid` for 2-column layout.

### `.slide-check-row` / `.slide-check`
Checkmark rows for validation/confirmation visuals.

### `.slide-cards` / `.slide-card`
Grid of cards. Default 3 columns. Use `.slide-cards--5col` for 5-column layout.

### `.slide-folder`
Folder/file display element for showing directory structures.

### `.slide-stack`
Vertical stack of bordered items (layers, steps).

### `.slide-ban`
Prohibition icon (circle with diagonal line). Place inside `.slide-card`.

---

## 10. Creating a New Presentation

### Step-by-step

1. Create a new folder: `/apreNN/` (e.g., `/apre02/`)

2. Create `index.html` with this skeleton:

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Aula X.X | Launchpad Hub</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Orbitron:wght@500;700;800&display=swap"
      rel="stylesheet"
    />

    <!-- Shared Design System -->
    <link rel="stylesheet" href="../styles/tokens.css" />
    <link rel="stylesheet" href="../styles/deck.css" />
    <link rel="stylesheet" href="../styles/slide-presets.css" />
    <link rel="stylesheet" href="../styles/components.css" />

    <!-- Presentation-specific styles (if needed) -->
    <style>
      /* Only add styles for custom visuals unique to this presentation */
    </style>
  </head>
  <body>
    <div class="deck" id="deck">

      <!-- SLIDES GO HERE -->

      <div class="deck-progress" aria-hidden="true"><span id="progressBar"></span></div>
    </div>

    <div class="controls">
      <button class="btn" id="prevBtn" type="button">&larr; Anterior</button>
      <button class="btn" id="nextBtn" type="button">Pr&oacute;ximo &rarr;</button>
      <button class="btn" id="kioskBtn" type="button">Kiosk</button>
    </div>

    <script src="../scripts/deck-engine.js"></script>
  </body>
</html>
```

3. Add slides using the standard anatomy:

```html
<!-- Cover slide -->
<section class="slide dark cover active" data-build="1">
  <header class="slide-brand">
    <span class="slide-tag">Module X &bull; Lesson X.X</span>
    <img class="slide-logo" src="../assets/Logo-light.png" alt="Launchpad Hub" />
  </header>
  <div class="slide-content">
    <h1>Presentation Title</h1>
    <p class="slide-lead" data-step="1">Subtitle or tagline.</p>
  </div>
</section>

<!-- Content slide -->
<section class="slide light content-slide" data-build="3">
  <header class="slide-brand">
    <span class="slide-tag">Section Name</span>
    <img class="slide-logo" src="../assets/Logo-dark.png" alt="Launchpad Hub" />
  </header>
  <div class="slide-content">
    <h2>Slide Heading</h2>
    <ul class="slide-bullets">
      <li class="slide-bullet-item" data-step="1">Point one</li>
      <li class="slide-bullet-item" data-step="2">Point two</li>
      <li class="slide-bullet-item" data-step="3">Point three</li>
    </ul>
  </div>
</section>
```

4. Run the [Validation Checklist](#13-validation-checklist) before merging.

---

## 11. Creating New Components

### Rules

1. **Prefix**: All class names must use `.slide-*` (e.g., `.slide-callout`)
2. **BEM naming**: Block `.slide-callout`, element `.slide-callout__title`, modifier `.slide-callout--warning`
3. **Token-first**: Use existing tokens before creating new values
4. **Semantic HTML**: Use appropriate elements (`<aside>`, `<figure>`, etc.)

### Template

```html
<aside class="slide-callout" role="note" aria-label="Highlight">
  <h3 class="slide-callout__title">Title</h3>
  <p class="slide-callout__text">Content text.</p>
</aside>
```

```css
.slide-callout {
  padding: var(--space-md);
  border-radius: calc(var(--radius-base) * 0.7);
  font-size: var(--font-size-body);
  color: var(--color-text);
  background: color-mix(in oklab, currentColor 7%, transparent);
  border: 1px solid color-mix(in oklab, currentColor 26%, transparent);
}
```

### When to create a new token

Only create a new CSS custom property when:
- The value is shared across **two or more** components
- It represents a design decision (not an implementation detail)

Prefer `calc()` and `color-mix()` from existing tokens over new globals.

---

## 12. Do / Don't Examples

### Slide structure

```html
<!-- DO: Use standard anatomy -->
<section class="slide dark content-slide" data-build="2">
  <header class="slide-brand">
    <span class="slide-tag">Topic</span>
    <img class="slide-logo" src="../assets/Logo-light.png" alt="Launchpad Hub" />
  </header>
  <div class="slide-content">
    <h2>Title</h2>
    <ul class="slide-bullets">
      <li class="slide-bullet-item" data-step="1">Item</li>
    </ul>
  </div>
</section>

<!-- DON'T: Skip the brand header or use non-standard structure -->
<section class="slide dark">
  <h2>Title</h2>
  <ul>
    <li>Item</li>
  </ul>
</section>
```

### Class naming

```css
/* DO: Use slide-* prefix */
.slide-callout { ... }
.slide-callout__title { ... }

/* DON'T: Use generic names */
.callout { ... }
.box { ... }
.title { ... }
```

### Token usage

```css
/* DO: Reference semantic tokens */
.slide-custom {
  color: var(--color-text);
  padding: var(--space-md);
  font-size: var(--font-size-body);
  border-radius: calc(var(--radius-base) * 0.7);
}

/* DON'T: Hardcode values */
.slide-custom {
  color: #e7ecf6;
  padding: 1em;
  font-size: 1.12rem;
  border-radius: 11px;
}
```

### Theme handling

```html
<!-- DO: Match logo variant to theme -->
<section class="slide dark ...">
  <img class="slide-logo" src="../assets/Logo-light.png" ... />
</section>
<section class="slide light ...">
  <img class="slide-logo" src="../assets/Logo-dark.png" ... />
</section>

<!-- DON'T: Use wrong logo for theme -->
<section class="slide dark ...">
  <img class="slide-logo" src="../assets/Logo-dark.png" ... />
</section>
```

### Asset paths

```html
<!-- DO: Reference shared /assets/ -->
<img src="../assets/Logo-light.png" ... />

<!-- DON'T: Reference /teste/ or duplicate assets locally -->
<img src="../teste/assets/Logo-light.png" ... />
<img src="./assets/Logo-light.png" ... />
```

---

## 13. Validation Checklist

Use this checklist before merging any new or updated presentation.

### Structure
- [ ] HTML imports all 4 shared CSS files in correct order
- [ ] HTML includes `<script src="../scripts/deck-engine.js"></script>` before `</body>`
- [ ] Every slide has `.slide-brand` as first child
- [ ] Every slide has `.slide-content` as second child
- [ ] Cover slide uses class `slide dark cover` (or `slide light cover`)
- [ ] Content slides use class `slide [dark|light] content-slide`
- [ ] First slide has `active` class
- [ ] `data-build` attribute matches the highest `data-step` in the slide

### Naming
- [ ] All custom classes use `.slide-*` prefix
- [ ] No generic class names (`.box`, `.wrapper`, `.item`)
- [ ] BEM naming for new components (block, block__element, block--modifier)

### Tokens
- [ ] No hardcoded color values (use `--color-*` tokens)
- [ ] No hardcoded font sizes (use `--font-size-*` tokens)
- [ ] No hardcoded spacing for slide padding (use `--space-layout`)
- [ ] Border radius derived from `--radius-base`

### Themes
- [ ] Dark slides use `Logo-light.png`
- [ ] Light slides use `Logo-dark.png`
- [ ] Accent color bullet markers on dark slides
- [ ] Strong accent (wine) bullet markers on light slides (automatic via CSS)

### Assets
- [ ] All assets referenced from `/assets/` (not `/teste/` or local copies)
- [ ] No dependency on the `/teste/` directory

### Responsive
- [ ] Typography uses `clamp()` with `cqw` units
- [ ] Tested at narrow and wide viewports
- [ ] No horizontal overflow

### Accessibility
- [ ] Progress bar has `aria-hidden="true"`
- [ ] Logo images have meaningful `alt` text
- [ ] Semantic HTML used for slide structure (`<section>`, `<header>`)
