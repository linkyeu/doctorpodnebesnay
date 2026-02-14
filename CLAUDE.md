# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Landing page for Dr. Luba — an evidence-based parenting consultant. Static React SPA, all content in Ukrainian.

## Commands

- `npm run dev` — Start Vite dev server (http://localhost:5173)
- `npm run build` — TypeScript check + Vite production build (output: `dist/`)
- `npm run lint` — ESLint (flat config, v9)
- `npm run preview` — Preview production build locally

No test runner is configured.

## Tech Stack

- React 19, TypeScript 5.9 (strict), Vite 7
- CSS Modules for component styling, CSS custom properties for design tokens
- Fonts: Fraunces (serif, headings) + Plus Jakarta Sans (sans-serif, body) via Google Fonts

## Deployment

- **Live site:** https://doctorpidnebesna.com
- Hosted on Netlify (Node 22, SPA fallback configured)

## Architecture

Single-page app with these sections rendered sequentially in `App.tsx`:

**StickyHeader** (fixed, appears on scroll) → **Hero** → **Services** → **Navigator** (tabbed age-group browser with SituationCards) → **SocialProof** → **Bio** → **Footer**

- `src/data/situations.ts` — All content data: 3 age groups × 3 myth/science pairs
- `src/data/links.ts` — External URL constants (Telegram, Instagram)
- `src/types/index.ts` — `Situation` and `AgeGroup` interfaces
- `src/styles/variables.css` — Design tokens (colors, spacing, typography scale)
- `src/styles/animations.css` — Keyframe animations, respects `prefers-reduced-motion`
- `src/styles/global.css` — Reset, base typography, paper-texture background

## Mobile First

~95% of users visit on mobile devices. Always design and implement mobile-first — start with the small-screen layout and enhance for larger viewports. Every new component and layout change must look and work great on phones before considering desktop.

## Styling Conventions

- Every component has a co-located `.module.css` file
- Color palette: sage green (`#4A6741`), terracotta (`#C27B5C`), teal (`#5B8A8A`), warm beige background (`#FAF7F2`)
- Fluid typography via `clamp()`, 8px spacing grid (`--space-*` variables)
- Botanical SVG decorations are inline in `BotanicalDecor` component

## Accessibility

- Navigator uses ARIA tablist with keyboard arrow-key navigation
- StickyHeader uses `aria-hidden` when not visible
- External link CTAs include sr-only hint text
- Decorative SVGs marked `aria-hidden="true"`
- `.sr-only` utility class available in global.css
