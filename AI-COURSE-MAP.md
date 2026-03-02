# /ai-course — Component Architecture Map

> **Last updated:** 2026-03-02
> **Purpose:** Quick reference for anyone editing the landing page. What's where, what's active, what's dead.

---

## Section Order (as user sees top→bottom)

| # | Section | Component | CSS Module | Data source |
|---|---------|-----------|------------|-------------|
| 1 | **Hero** (fullscreen, photo bg, title + CTA) | `CourseHero/CourseHero.tsx` | `CourseHero.module.css` | `ai-course.ts` → `heroContent` |
| 2 | **"Знайоме?"** (3 pain cards + accent CTA) | `PainPoints/PainPoints.tsx` | `PainPoints.module.css` | `ai-course.ts` → `painPoints[]`, `painAccent` |
| 3 | **"Як це виглядає на практиці"** (before/after pneumonia example) | `BeforeAfter/BeforeAfter.tsx` | `BeforeAfter.module.css` | `ai-course.ts` → `beforeAfterExample` |
| 4 | **"Що ви отримаєте"** (5 task cards + how-it-works 3 steps) | `WhatsInside/WhatsInside.tsx` | `WhatsInside.module.css` | `ai-course.ts` → `whatsInsideTasks[]`, `howItWorksSteps[]` |
| 5 | **"Створено лікарем і ШІ-інженером"** (2 author cards + badges) | `AuthorTrust/AuthorTrust.tsx` | `AuthorTrust.module.css` | `ai-course.ts` → `instructors[]`, `authorTrustBadges[]` |
| 6 | **"Перші відгуки колег"** (3 review cards) | `SocialProof/SocialProof.tsx` | `SocialProof.module.css` | `ai-course.ts` → `socialProofQuotes[]` |
| 7 | **"Це ж просто набір промптів..."** (objection handling) | `Baggage/Baggage.tsx` | `Baggage.module.css` | `ai-course.ts` → `baggageContent` |
| 8 | **Pricing** (799₴, features, competitor anchors, guarantee) | `Pricing/Pricing.tsx` | `Pricing.module.css` | `ai-course.ts` → `pricingContent`, `competitorPrices[]` |
| 9 | **FAQ** (5 accordion items) | `CourseFaq/CourseFaq.tsx` | `CourseFaq.module.css` | `ai-course.ts` → `courseFaqItems[]` |
| 10 | **Final CTA** (last push) | `FinalCta/FinalCta.tsx` | `FinalCta.module.css` | `ai-course.ts` → `finalCtaContent` |
| 11 | **Footer** | `CourseFooter/CourseFooter.tsx` | `CourseFooter.module.css` | `ai-course.ts` → `courseFooterContent` |
| — | **Sticky Mobile CTA** (fixed bottom bar, mobile only) | `StickyMobileCta/StickyMobileCta.tsx` | `StickyMobileCta.module.css` | `ai-course.ts` → `pricingContent.cta` |

---

## Key Files

| File | What it does |
|------|-------------|
| `src/pages/AiCoursePage.tsx` | Page shell — imports + orders all sections. SEO meta tags, OG tags, canonical. |
| `src/pages/AiCoursePage.module.css` | Page-level styles (`.coursePage` wrapper). |
| `src/data/ai-course.ts` | **ALL text content lives here.** Headings, descriptions, pricing, FAQ, quotes — everything. Edit text → edit this file. |
| `public/images/ai-course/` | All images: hero (desktop/mobile .webp), personas, steps, whats-inside icons, instructors, workflows. |

---

## CTA Flow (where buttons lead)

| Location | Button text | Action |
|----------|------------|--------|
| Hero | "Отримати довідник — 799 ₴" | `scrollIntoView('#pricing')` — smooth scroll to pricing section |
| PainPoints accent | "Отримати довідник — 799 ₴" | Link → `/ai-course/thank-you` (fake door) |
| WhatsInside | trust micro-text only, no CTA button | — |
| Pricing | "Отримати довідник — 799 ₴" | Link → `/ai-course/thank-you` (fake door) |
| Final CTA | "Отримати довідник — 799 ₴" | Link → `/ai-course/thank-you` (fake door) |
| Sticky Mobile | "Отримати довідник — 799 ₴" | Link → `/ai-course/thank-you` (fake door) |

**Purchase link constant:** `TELEGRAM_PURCHASE_LINK` in `ai-course.ts` = `/ai-course/thank-you`

**Thank You page:** `src/pages/ThankYouPage.tsx` — email form (Netlify Forms, `ai-helper-waitlist`), honeypot.

---

## Dead Components (in filesystem but NOT imported)

These exist in `src/components/ai-course/` but are **commented out or not used** in `AiCoursePage.tsx`:

| Component | Why dead |
|-----------|---------|
| `Personas/` | Removed from page (01.03) — kept files for potential reuse |
| `Solution/` | Replaced by BeforeAfter + WhatsInside restructure |
| `Syllabus/` | Old course structure — product is now "довідник" not "курс" |
| `Certificate/` | Removed — no certification for a PDF toolkit |
| `WhyDifferent/` | Old section, logic merged into PainPoints |
| `WhyNotChatGpt/` | Logic merged into PainPoints card #2 |
| `EmailForm/` | Standalone form component — only used inside ThankYouPage now |
| `CourseHero/ParticleNetwork.tsx` | Decorative animation — may or may not be imported inside CourseHero |

---

## Common Edit Scenarios

| Task | Where to edit |
|------|--------------|
| Change any text/heading/CTA | `src/data/ai-course.ts` — find the relevant export |
| Change section order | `src/pages/AiCoursePage.tsx` — reorder JSX components |
| Change hero background photo | Replace `public/images/ai-course/hero-desktop.webp` + `hero-mobile.webp` |
| Change hero overlay/gradient | `CourseHero.module.css` → `.heroOverlay::before` gradient stops |
| Add/remove a pain card | `ai-course.ts` → `painPoints[]` array + check `PainPoints.module.css` grid |
| Add/remove a FAQ item | `ai-course.ts` → `courseFaqItems[]` array |
| Change price | `ai-course.ts` → `pricingContent.price` + `heroContent.productLine` + all CTA texts |
| Change CTA destination | `ai-course.ts` → `TELEGRAM_PURCHASE_LINK` constant (one place) |
| Fix mobile layout | Each component's `.module.css` has `@media` queries |
