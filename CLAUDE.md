# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Landing page for Dr. Luba — a family doctor specializing in evidence-based parenting. Static React SPA, all content in Ukrainian.

## Commands

- `npm run dev` — Start Vite dev server (http://localhost:5173)
- `npm run build` — TypeScript check + Vite production build (output: `dist/`)
- `npm run lint` — ESLint (flat config, v9)
- `npm run preview` — Preview production build locally

No test runner is configured.

## Tech Stack

- React 19, TypeScript 5.9 (strict), Vite 7, React Router v7 (`react-router-dom`)
- CSS Modules for component styling, CSS custom properties for design tokens
- Fonts: Playfair Display (serif, headings, full Cyrillic, variable 400-900) + Manrope (sans-serif, body, full Cyrillic) via Google Fonts

## Deployment

- **Live site:** https://doctorpidnebesna.com
- Hosted on Netlify (Node 22, SPA fallback configured)
- **Google Search Console:** linked with Luba's email (doctorpodbenesnay)

## Architecture

Single-page app with these sections rendered sequentially in `App.tsx`:

**StickyHeader** (fixed, glassmorphism, appears on scroll) → **Hero** (bg image + animated gradient mesh) → **TrustBadges** (infinite scrolling marquee) → **Services** (off-white bg) → **Navigator** (deep charcoal-navy `#111827`, tabbed age-group browser with SituationCards, fade transitions) → **Bio** → **FAQ** (accordion, off-white bg) → **Footer** (near-black navy `#0B1120`)

- `src/data/situations.ts` — All content data: 3 age groups × 3 myth/science pairs
- `src/data/faq.ts` — FAQ questions/answers in Ukrainian
- `src/data/links.ts` — External URL constants (Telegram, Instagram)
- `src/types/index.ts` — `Situation` and `AgeGroup` interfaces
- `src/hooks/useScrollReveal.ts` — IntersectionObserver scroll-triggered reveal animations
- `src/components/GradientMesh/` — Animated CSS gradient mesh background (floating blurred orbs)
- `src/styles/variables.css` — Design tokens (colors, spacing, typography scale, shadows)
- `src/styles/animations.css` — Keyframe animations (heroReveal, revealUp/Scale/Left/Right, meshFloat, marquee, counterReveal), respects `prefers-reduced-motion`
- `src/styles/global.css` — Reset, base typography, scroll reveal utility classes
- `public/images/navigator/` — 9 line-art illustration PNGs for SituationCards (Gemini-generated, matching services icon style)

## Mobile First

~95% of users visit on mobile devices. Always design and implement mobile-first — start with the small-screen layout and enhance for larger viewports. Every new component and layout change must look and work great on phones before considering desktop.

## Styling Conventions

- Every component has a co-located `.module.css` file
- Color palette: near-white bg (`#FAFAF8`), off-white alt (`#F5F4F1`), deep teal-navy primary (`#1B3A4B`), warm amber accent (`#C8956C`, used sparingly)
- Dark sections: Navigator (`#111827`), Footer (`#0B1120`)
- Fluid typography via `clamp()`, 8px spacing grid (`--space-*` variables)
- Rectangular dark buttons (`border-radius: 8px`, `--color-primary` bg), clean shadows (no glow)
- Animated gradient mesh in Hero (CSS pseudo-elements with `meshFloat` keyframes)
- TrustBadges as infinite CSS marquee (duplicated content for seamless loop)
- Varied scroll reveal animations: revealUp, revealScale, revealLeft, revealRight
- Navigator tab switch: fade out → swap content → fade in with staggered card reveals
- SituationCard illustrations: radial-gradient mask for soft edge fade, `scale(1.06)` hover, lazy-loaded with emoji fallback
- Scroll reveal animations via `.reveal` / `.visible` CSS classes + `useScrollReveal` hook
- Bio portrait grounding: Bio has a transparent bg with a `::before` pseudo-element that stops 5rem from the bottom (off-white-to-white transition zone). WhenToContact overlaps into that zone via `margin-top: -5rem`. The grid uses `align-items: stretch` so the photo column fills the full row height, `.content` uses `align-self: center`, and `.photoWrapper` uses `align-items: flex-end` to push the photo to the bottom into the off-white zone. **Pitfall:** `align-items: center` on the grid causes the photo to float mid-row when the text column is taller — always use `stretch` + per-column `align-self`.

## SEO Files

- `public/robots.txt` — Crawler directives + sitemap reference
- `public/sitemap.xml` — XML sitemap listing all indexable URLs

**Review these files when:** adding new pages/routes, changing the domain, or adding sections that should be independently indexable.

**Reminder:** After deploying changes that affect pages/routes or SEO metadata, verify indexing and check for crawl errors in [Google Search Console](https://search.google.com/).

## Accessibility

- Navigator uses ARIA tablist with keyboard arrow-key navigation
- FAQ uses ARIA-compliant accordion (button + region roles, aria-expanded)
- StickyHeader uses `aria-hidden` when not visible
- External link CTAs include sr-only hint text
- Decorative elements marked `aria-hidden="true"`
- SituationCard illustrations use `alt=""` + `aria-hidden="true"` (decorative, with emoji fallback)
- `.sr-only` utility class available in global.css
- `prefers-reduced-motion: reduce` disables all animations (mesh, marquee, reveals)
