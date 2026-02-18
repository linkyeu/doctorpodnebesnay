# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Landing page for Dr. Luba — a family doctor specializing in evidence-based parenting. Static React SPA, all content in Ukrainian.

> **Business context, brand guidelines, content strategy and analytics live in a separate workspace.** This repo is code-only.

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

React Router app with two routes defined in `App.tsx`:

- `/` → `src/pages/LandingPage.tsx` (renders all landing sections)

> **Blog temporarily hidden:** The blog system (BlogTeaser on the landing page, `/blog` listing, `/blog/:slug` article pages) is commented out in `App.tsx` and `LandingPage.tsx` — not deleted. `BlogComingSoon` component also exists but is not routed. We hid it to launch/test the site faster while articles are still being prepared. Re-enable by uncommenting the relevant imports and routes.

### Landing page section order (`LandingPage.tsx`)

**StickyHeader** (fixed, glassmorphism, appears on scroll) → **Hero** (bg image + animated gradient mesh) → **TrustBadges** (infinite scrolling marquee) → **Bio** → **WhenToContact** (expandable cards grid — 7 consultation topics with illustrations) → **Navigator** (deep charcoal-navy `#111827`, tabbed age-group browser with NavigatorTiles, fade transitions) → **Testimonials** (3 parent testimonial blockquotes) → **Services** (off-white bg, 3-step process with illustrations) → **BlogTeaser** (infinite-scroll carousel of upcoming blog article cards) → **FAQ** (accordion, off-white bg) → **FinalCta** (final CTA section with Telegram link) → **Footer** (near-black navy `#0B1120`)

### Key files

- `src/pages/LandingPage.tsx` — Landing page component, assembles all sections
- `src/components/BlogComingSoon/` — Standalone `/blog` placeholder page
- `src/data/navigator-tiles.ts` — All Navigator content: 3 age-group tabs with topic tiles (key points, warning signs, doctor tips, myth/science, etc.)
- `src/data/faq.ts` — FAQ questions/answers in Ukrainian
- `src/data/blog.ts` — `BlogArticle` interface + 6 article entries for BlogTeaser
- `src/data/links.ts` — External URL constants (Telegram DM, Telegram channel, Instagram, YouTube)
- `src/types/index.ts` — `NavigatorTileData`, `NavigatorTabData`, `TileContent`, and related interfaces
- `src/hooks/useScrollReveal.ts` — IntersectionObserver scroll-triggered reveal animations
- `src/components/GradientMesh/` — Animated CSS gradient mesh background (floating blurred orbs)
- `src/styles/variables.css` — Design tokens (colors, spacing, typography scale, shadows)
- `src/styles/animations.css` — Keyframe animations (heroReveal, revealUp/Scale/Left/Right, meshFloat, marquee, counterReveal), respects `prefers-reduced-motion`
- `src/styles/global.css` — Reset, base typography, scroll reveal utility classes

### Image assets

- `public/images/hero-illustration.png` — Stylized mother-and-child line-art illustration
- `public/images/hero-bg.png` — Abstract flowing ribbon waves background
- `public/images/doctor-lyuba-portrait.png` — Professional photo cutout (waist-up, transparent bg)
- `public/images/navigator/tiles/` — 24 line-art illustration PNGs for NavigatorTiles (Gemini-generated)
- `public/images/services/` — 3 step-process illustrations (`step-1-describe.png`, `step-2-answer.png`, `step-3-followup.png`)
- `public/images/when-to-contact/` — 7 topic illustrations (6 on-brand gradient+leaves style + 1 simpler outline style — see Graphic Design Guide)

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
- NavigatorTile illustrations: radial-gradient mask for soft edge fade, `scale(1.06)` hover, lazy-loaded with emoji fallback
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
- NavigatorTile illustrations use `alt=""` + `aria-hidden="true"` (decorative, with emoji fallback)
- `.sr-only` utility class available in global.css
- `prefers-reduced-motion: reduce` disables all animations (mesh, marquee, reveals)

## Graphic Design Guide

All illustrations are generated with **Google Gemini** unless noted. Use this guide when creating new graphics to keep them visually consistent.

### Line-art icons (Navigator, WhenToContact, Services)

The primary illustration style used across most sections:

- Minimal line-art, ~3px stroke in deep teal-navy (`#1B3A4B`–`#2C3E50`)
- Sparse accent fills in muted dusty rose and teal
- Scattered small decorative leaf/petal shapes in rose and slate-teal
- Soft vertical gradient background: warm ivory/cream top → muted teal-blue bottom
- Square PNG format

### Hero illustration (`hero-illustration.png`)

- Flowing organic curves forming a stylized mother cradling a child
- Same teal-navy strokes + rose center accent as the line-art icons
- Same petal scatter and gradient background

### Hero background (`hero-bg.png`)

- Abstract flowing ribbon waves in teal and warm amber/gold
- Soft bokeh circles scattered throughout
- Fades to white at bottom-right
- Used behind the gradient mesh overlay in the Hero section

### Doctor portrait (`doctor-lyuba-portrait.png`)

- Real photograph — not illustrated
- Professional photo, transparent/white background cutout, waist-up pose

### Style inconsistency note: `pregnancy.png`

The `when-to-contact/pregnancy.png` uses a simpler style — a single continuous outline silhouette on a plain white background (no gradient, no leaf scatter). It matches the teal-navy stroke color only. When creating new WhenToContact illustrations, use the consistent gradient+leaves style from the other 6 illustrations, not this simpler variant.
