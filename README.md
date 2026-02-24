# Launchpad Hub — Course Presentations

Static presentation system for the [Launchpad Hub](https://curso.deeptechs.com.br) deeptech funding course. Each presentation is a self-contained HTML slide deck that shares a common design system.

## Site objectives

- Deliver course lesson content as interactive slide presentations
- Maintain a consistent visual identity across all lessons
- Enable non-developers to create new presentations by following documented patterns
- Run on GitHub Pages with zero build steps

## Live site

**URL**: [curso.deeptechs.com.br](https://curso.deeptechs.com.br)

## Project structure

```
/
├── assets/               Shared brand logos (PNG + SVG, dark/light variants)
├── styles/               Shared design system CSS
│   ├── tokens.css        Design tokens (colors, typography, spacing, layout)
│   ├── deck.css          Deck container, themes, transitions, controls
│   ├── slide-presets.css Slide type layout variants
│   └── components.css    Reusable .slide-* component classes
├── scripts/
│   └── deck-engine.js    Shared slide navigation engine
├── apre01/               Aula 0.1 — "Como funciona o curso" (canonical template)
│   └── index.html
├── docs/
│   └── PRESENTATION_TEMPLATE_GUIDELINES.md
├── index.html            Landing page
├── CNAME                 GitHub Pages domain config
└── teste/                Excluded test folder (not production)
```

## How to create a new presentation

1. Read **[docs/PRESENTATION_TEMPLATE_GUIDELINES.md](docs/PRESENTATION_TEMPLATE_GUIDELINES.md)** — it contains the full design system specification, component reference, and boilerplate code.

2. Create a new folder following the naming convention: `/apreNN/` (e.g., `/apre02/`).

3. Copy the HTML skeleton from the guidelines. Each presentation imports the shared CSS and JS:

   ```html
   <link rel="stylesheet" href="../styles/tokens.css" />
   <link rel="stylesheet" href="../styles/deck.css" />
   <link rel="stylesheet" href="../styles/slide-presets.css" />
   <link rel="stylesheet" href="../styles/components.css" />
   <!-- ... slides ... -->
   <script src="../scripts/deck-engine.js"></script>
   ```

4. Build slides using the standard components: `.slide-brand`, `.slide-tag`, `.slide-logo`, `.slide-content`, `.slide-bullets`, `.slide-panel`, `.slide-cards`, etc.

5. Run through the **Validation Checklist** in the guidelines before merging.

## Design system

All visual decisions are centralized in `/styles/tokens.css`. To change colors, fonts, or spacing globally, edit that single file.

| Layer | File | Purpose |
|-------|------|---------|
| Tokens | `tokens.css` | CSS custom properties — colors, fonts, spacing, layout |
| Deck | `deck.css` | Reset, body, deck container, slide base, themes, animation, controls |
| Presets | `slide-presets.css` | Layout rules for cover / content / section-divider slides |
| Components | `components.css` | Reusable building blocks (`.slide-brand`, `.slide-bullets`, etc.) |
| Engine | `deck-engine.js` | Keyboard/click navigation, progressive reveal, fullscreen |

## Slide navigation

| Input | Action |
|-------|--------|
| Arrow Right / Space / PageDown | Next build step or slide |
| Arrow Left / PageUp | Previous build step or slide |
| F | Toggle fullscreen (kiosk mode) |
| Prev / Next buttons | Navigate slides |

## Important notes

- `/teste/` is excluded from production. Do not use it as a reference or dependency.
- `/apre01/` is the canonical base template. Use it as the reference for new presentations.
- All assets must be referenced from the shared `/assets/` folder.
- No build step is required — the site runs on static HTML/CSS/JS.
