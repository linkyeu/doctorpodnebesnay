# Blog Content Strategy — doctorpidnebesna.com

> **Version:** 1.0
> **Last updated:** 2026-02-16
> **Author:** AI-drafted, reviewed by Dr. Luba Pidnebesna
> **Purpose:** Comprehensive guide for creating evidence-based parenting articles for Ukrainian parents

---

## Table of Contents

1. [Topic Cluster Architecture](#1-topic-cluster-architecture)
2. [Approved Evidence Sources](#2-approved-evidence-sources)
3. [Article Writing Process](#3-article-writing-process)
4. [Article Template](#4-article-template)
5. [SEO Checklist Per Article](#5-seo-checklist-per-article)
6. [Content Quality Standards](#6-content-quality-standards)
7. [Priority Article List](#7-priority-article-list)
8. [Appendix](#appendix)

---

## 1. Topic Cluster Architecture

### Overview

Content is organized into **3 topic clusters**, each mapped to an age group already defined in the site's Navigator section (`src/data/situations.ts`). Each cluster has a pillar concept and satellite articles that interlink.

### Cluster A — Infant Health (0–1 рік)

**Pillar concept:** Evidence-based care for the first year of life

| Satellite Article | Internal Links To |
|---|---|
| Перший прикорм | Cluster A pillar, Article #4 (Sleep) |
| Температура у дитини | Cluster A pillar, Article #2 (Vaccination) |
| Сон немовляти | Cluster A pillar, Article #1 (Complementary feeding) |

**Maps to Navigator tab:** "Немовлята (0–1)" — fever, teething, sleep myth/science cards

### Cluster B — Toddler Development (1–3 роки)

**Pillar concept:** Neuroscience of toddler behaviour and healthy development

| Satellite Article | Internal Links To |
|---|---|
| Дитячі істерики | Cluster B pillar, Article #6 (Screen time) |
| Екранний час для дітей | Cluster B pillar, Article #5 (Tantrums) |

**Maps to Navigator tab:** "Малюки (1–3)" — screens, tantrums, picky eating cards

### Cluster C — Vaccination (cross-age)

**Pillar concept:** Immunization facts, schedules, and myth-busting

| Satellite Article | Internal Links To |
|---|---|
| Вакцинація дітей | Cluster A (fever), Cluster B (toddler health) |

**Maps to Navigator tab:** Referenced across all age groups; directly expands the "fever" card myth about febrile seizures

### Future Expansion (Phase 2+)

After the initial 6 articles are published:

- **Cluster A expansion:** Breastfeeding & formula, teething myths, tummy time
- **Cluster B expansion:** Picky eating, toilet training, language development
- **Cluster C expansion:** Ukrainian vaccination calendar deep-dive, travel vaccines
- **New Cluster D — Preschool Readiness (3–5):** Reading readiness, imaginary friends, time-outs vs time-ins (maps to the "Дошкільнята" Navigator tab)

---

## 2. Approved Evidence Sources

### Tier 1 — Must Cite (at least 1 per article)

Every article must include at least one citation from this tier.

| Source | Abbreviation | URL | Notes |
|---|---|---|---|
| American Academy of Pediatrics | AAP | https://www.aap.org | Clinical practice guidelines, policy statements |
| World Health Organization | WHO / ВООЗ | https://www.who.int | Global guidelines on nutrition, activity, immunization |
| Centers for Disease Control and Prevention | CDC | https://www.cdc.gov | Milestones, immunization schedules, injury data |
| Harvard Center on the Developing Child | Harvard CCDC | https://developingchild.harvard.edu | Brain architecture, serve-and-return, toxic stress |
| PubMed / PMC | PubMed | https://pubmed.ncbi.nlm.nih.gov | Peer-reviewed primary research, systematic reviews |

### Tier 2 — Recommended

Use these to supplement Tier 1 citations or when Tier 1 doesn't cover the specific topic.

| Source | URL | Best For |
|---|---|---|
| HealthyChildren.org (AAP parent site) | https://www.healthychildren.org | Parent-friendly explanations of AAP guidelines |
| NICE (UK) | https://www.nice.org.uk | Clinical guidelines, fever/infection management |
| Cochrane Library | https://www.cochranelibrary.com | Systematic reviews and meta-analyses |
| Ukraine Ministry of Health (МОЗ) | https://moz.gov.ua | Ukrainian vaccination calendar, local protocols |
| AAPD (American Academy of Pediatric Dentistry) | https://www.aapd.org | Dental health, fluoride guidelines |
| Zero to Three | https://www.zerotothree.org | Early development, social-emotional milestones |
| Johns Hopkins Medicine | https://www.hopkinsmedicine.org | Feeding guides, clinical overviews |

### Never-Use List

The following should **never** be used as primary sources:

- **Wikipedia** — acceptable only for finding primary sources listed in references
- **Mommy blogs, parenting forums** — no peer review, high misinformation risk
- **Manufacturer/brand websites** — inherent conflict of interest (formula companies, supplement brands, app developers)
- **Sources older than 10 years** — unless they are landmark studies (e.g., LEAP study 2015) or foundational guidelines still in effect
- **Social media posts** — including Instagram infographics, TikTok videos, Facebook groups
- **AI-generated content without source verification** — all AI-drafted claims must be traced to a Tier 1-2 source

### Citation Bank

The project maintains a pre-vetted evidence base in **`docs/knowledge.md`** (50+ citations, accessed February 2026). This is the **primary starting point** for article research. It covers:

- Brain architecture & neurobiology (Harvard CCDC) — Sections 2.1–2.3
- Infant health protocols: fever (AAP 2021), safe sleep (AAP 2022), feeding — Sections 3.3–3.4
- Toddler development: tantrums, co-regulation, language — Sections 4.1–4.2
- Preschool: screen time (WHO 2019), school readiness — Sections 5.2–5.3
- Immunization schedules (general + Ukraine MOH note) — Section 6.1
- Dental health (AAPD) — Section 6.2
- Developmental screening red flags — Section 6.3

---

## 3. Article Writing Process

### Step 1: Topic Selection & Keyword Research

**Owner:** Dr. Luba + content writer

1. Select topic from Priority Article List (Section 7) or propose a new one based on:
   - Patient questions Dr. Luba receives frequently
   - Seasonal relevance (flu season → fever, spring → allergies)
   - Telegram channel engagement data
2. Research primary keyword (Ukrainian):
   - Google autocomplete in Ukrainian (type partial query, note suggestions)
   - Google Trends (compare keyword variants, e.g., "прикорм дитини" vs "введення прикорму")
   - Google Search: check what currently ranks for the keyword — note gaps and opportunities
3. Select 2–3 secondary keywords and 3–5 long-tail queries (from "People Also Ask" and autocomplete)
4. Document in article brief:
   ```
   Primary keyword: прикорм дитини
   Secondary: введення прикорму, перший прикорм
   Long-tail: коли починати прикорм, з чого починати прикорм, прикорм за ВООЗ
   Search intent: informational
   ```

### Step 2: Evidence Gathering & Outline

**Owner:** Content writer (AI-assisted)

1. **Start with `docs/knowledge.md`** — find all relevant sections for the topic
2. Cross-reference with Tier 1 sources for updates or additional data
3. Check if any guidelines have been updated since the knowledge.md was compiled
4. Create a structured outline with:
   - H2 headings that include secondary keywords naturally
   - Under each H2, bullet points with the specific claim + source
   - Flag any claims that need Dr. Luba's input with `[NEEDS REVIEW]`
5. Outline must have 5–7 H2 sections (see Article Template)

### Step 3: AI Drafting with Claude

**Owner:** Content writer using Claude

Use the following prompt structure when drafting:

```
You are writing a blog article for doctorpidnebesna.com — a Ukrainian family doctor's
website. The audience is Ukrainian parents (ages 25-38), 95% reading on mobile.

ARTICLE BRIEF:
- Title: [title]
- Primary keyword: [keyword]
- Target length: 1800-2200 words (body text only)
- Evidence base: [list knowledge.md sections + any additional sources]

TONE:
- Empathy first, evidence second
- "Ви" (formal Ukrainian address)
- Explain the "why" behind every recommendation
- No medical jargon without immediate plain-language explanation
- No guilt-tripping, no shaming, no "you should have..."

STRUCTURE: Follow the article template from docs/blog-content-strategy.md Section 4.

RULES:
- Every factual claim must include an inline citation [Source, Year]
- If you are uncertain about a claim, mark it with [VERIFY: reason]
- Do not invent statistics — use only provided sources
- Include a disclaimer box after the lead paragraph
- End with a CTA to Telegram channel and consultation booking
```

**Important:** The AI draft is a **starting point**, not a final product. All `[VERIFY]` tags must be resolved before publication.

### Step 4: Dr. Luba's Medical Review

**Owner:** Dr. Luba Pidnebesna

Review checklist:

- [ ] **Medical accuracy:** Every claim is correct and reflects current guidelines
- [ ] **Ukrainian context:** Recommendations are applicable in Ukraine (available medications, MOH protocols, local vaccine schedule)
- [ ] **Tone check:** Empathetic, non-judgmental, doesn't create anxiety
- [ ] **Disclaimer present:** Medical disclaimer box is included and accurate
- [ ] **No specific dosages** without "consult your doctor" caveat
- [ ] **No diagnosis guidance** — article informs but directs to doctor for diagnosis
- [ ] **All [VERIFY] tags resolved** — either confirmed with source or removed
- [ ] **Personal insight added** — at least 1-2 sentences from Dr. Luba's clinical experience (E-E-A-T signal)

### Step 5: SEO & Technical Review

**Owner:** Content writer

Follow the full SEO Checklist in Section 5. Key actions:

1. Verify primary keyword in: H1, meta title, meta description, first 100 words, at least one H2
2. Add 2+ internal links to articles in the same cluster
3. Add 1 internal link to the landing page (relevant section anchor)
4. Add 3+ external links to authoritative sources (open in new tab)
5. Write meta title (≤60 chars) and meta description (≤155 chars) in Ukrainian
6. Prepare OG image (1200×630px) with article title overlay
7. Prepare JSON-LD structured data (see Section 5)

### Step 6: Publication

**Owner:** Developer

Technical steps when publishing an article:

1. Create article page component in `src/components/Blog/` or `src/pages/blog/`
2. Add route in `src/App.tsx`:
   ```tsx
   <Route path="/blog/:slug" element={<BlogArticle />} />
   ```
3. Update `src/data/blog.ts`:
   - Change the matching placeholder article to include `slug`, `publishedDate`, and `isPublished: true`
   - Or add new article to the array
4. Update `public/sitemap.xml`:
   ```xml
   <url>
     <loc>https://doctorpidnebesna.com/blog/[slug]</loc>
     <changefreq>monthly</changefreq>
     <priority>0.8</priority>
   </url>
   ```
5. Submit new URL in Google Search Console for indexing
6. Update `BlogComingSoon` component if transitioning to a real blog listing page

### Step 7: Post-Publication

**Owner:** Dr. Luba + content writer

1. **Share on Telegram channel** (`t.me/medicalforua`) with a brief teaser and link
2. **Share on Instagram** (`@doctorpidnebesna`) — carousel or story with key takeaways
3. **Monitor Google Search Console** after 1 week:
   - Check indexing status
   - Monitor impressions, clicks, average position for target keyword
4. **Update cycle:** Review article every 6 months for guideline updates (especially AAP/WHO publications)

---

## 4. Article Template

Every blog article must follow this structure. Estimated total length: **1800–2200 words** (body text, excluding references and bio).

```
# [H1: Article Title — includes primary keyword]

**Автор: Др. Люба Піднебесна** · Сімейний лікар · [Дата публікації]
**Час читання:** [X] хв

[Lead paragraph: 2-3 sentences. Hook the reader with a relatable scenario or
surprising fact. Include primary keyword naturally within first 100 words.]

---

> ⚕️ **Важливо:** Ця стаття має інформаційний характер і не замінює консультацію лікаря.
> Якщо у вас є занепокоєння щодо здоров'я вашої дитини — зверніться до вашого педіатра
> або сімейного лікаря.

---

## Зміст
- [Section 1 title](#)
- [Section 2 title](#)
- ...

---

## [H2: Section 1 — ideally includes a secondary keyword]

[Body text. 200-350 words per section. Every factual claim has an inline citation.
Use short paragraphs (2-4 sentences) for mobile readability. Include at least one
practical actionable tip per section.]

## [H2: Section 2]
...

## [H2: Section 3]
...

## [H2: Section 4]
...

## [H2: Section 5 — "Коли звертатися до лікаря" (When to See a Doctor)]

[REQUIRED section for all health articles. Clear red-flag list with specific
symptoms that warrant medical attention. Format as a visible list or callout box.]

---

### 📋 Головне — коротко

[Key Takeaways box. 4-6 bullet points summarizing the most important actionable
advice from the article. Formatted as a visually distinct callout/card.]

---

### Запис на консультацію

Маєте питання щодо [topic]? Я допоможу розібратися — запишіться на онлайн-консультацію
через Telegram.

[CTA button → TELEGRAM_DM: https://t.me/doctorpidnebesna]

Або приєднуйтесь до Telegram-каналу, де я щодня ділюсь корисною інформацією для батьків:

[CTA button → TELEGRAM_CHANNEL: https://t.me/medicalforua]

---

### Джерела

1. [Author/Organization]. [Title]. [Journal/Publisher], [Year]. [URL]
2. ...
(Minimum 5 references, ideally 8-12. At least 1 from Tier 1.)

---

### Про автора

**Др. Люба Піднебесна** — сімейний лікар, що спеціалізується на доказовому батьківстві.
[1-2 sentences about qualifications and approach.]

---

*Цю статтю було підготовлено за допомогою AI та ретельно перевірено Др. Любою Піднебесною
на медичну точність. Останнє оновлення: [дата].*
```

### Template Notes

- **Word count target:** 1800–2200 words of body text (H2 sections). References, bio, and boilerplate are additional.
- **Paragraphs:** Maximum 4 sentences each. On mobile (375px), long paragraphs become walls of text.
- **Lists:** Use bullet or numbered lists for any sequence of 3+ items. Lists improve mobile scannability.
- **"Коли звертатися до лікаря" section** is mandatory for all health/medical articles (YMYL compliance).
- **Key Takeaways box** must be visually distinct (background colour, border, or card) — it's the most-shared section.

---

## 5. SEO Checklist Per Article

### On-Page SEO

- [ ] Primary keyword appears in:
  - [ ] H1 (article title)
  - [ ] Meta title (≤60 characters)
  - [ ] Meta description (≤155 characters, includes CTA-like phrasing)
  - [ ] First 100 words of body text
  - [ ] At least one H2 subheading
  - [ ] URL slug (`/blog/[keyword-based-slug]`)
- [ ] Secondary keywords appear naturally in H2s and body text (no keyword stuffing)
- [ ] **Internal links:** 2+ links to other articles in the same cluster
- [ ] **Internal links:** 1+ link to landing page section (e.g., `/#navigator`, `/#services`)
- [ ] **External links:** 3+ links to authoritative sources (Tier 1-2), `target="_blank"` with `rel="noopener noreferrer"`
- [ ] Article length: 1800–2200 words body text
- [ ] No duplicate content (every article offers unique value vs. existing pages)

### Structured Data (JSON-LD)

Add to the `<head>` of each article page:

```json
{
  "@context": "https://schema.org",
  "@type": ["Article", "MedicalWebPage"],
  "headline": "[Article H1]",
  "description": "[Meta description]",
  "author": {
    "@type": "Person",
    "name": "Др. Люба Піднебесна",
    "jobTitle": "Сімейний лікар",
    "url": "https://doctorpidnebesna.com"
  },
  "reviewedBy": {
    "@type": "Person",
    "name": "Др. Люба Піднебесна",
    "jobTitle": "Сімейний лікар"
  },
  "datePublished": "[YYYY-MM-DD]",
  "dateModified": "[YYYY-MM-DD]",
  "publisher": {
    "@type": "Organization",
    "name": "Др. Люба Піднебесна",
    "url": "https://doctorpidnebesna.com"
  },
  "mainEntityOfPage": "https://doctorpidnebesna.com/blog/[slug]",
  "inLanguage": "uk",
  "citation": [
    {
      "@type": "CreativeWork",
      "name": "[Source title]",
      "url": "[Source URL]"
    }
  ]
}
```

### Images

- [ ] All images have Ukrainian `alt` text (descriptive, includes keyword if natural)
- [ ] Images in WebP format (with PNG/JPG fallback)
- [ ] Lazy loading via `loading="lazy"` attribute
- [ ] Descriptive filenames in Ukrainian transliteration (e.g., `pershyj-prykorm-tablytsia.webp`)
- [ ] OG image (1200×630px) with article title — for social sharing

### Mobile Optimization (95% of audience)

- [ ] Text readable at 375px viewport without horizontal scrolling
- [ ] All tap targets ≥44×44px (buttons, links)
- [ ] Table of Contents collapsible on mobile (hamburger or accordion)
- [ ] CTA buttons full-width on mobile
- [ ] Images scale properly (no overflow)
- [ ] No fixed-position elements blocking content

### Technical SEO

- [ ] New URL added to `public/sitemap.xml`
- [ ] URL submitted in Google Search Console for indexing
- [ ] OG tags present: `og:title`, `og:description`, `og:image`, `og:url`, `og:type=article`
- [ ] `<link rel="canonical">` points to the article URL
- [ ] Page loads in <3 seconds (check with Lighthouse)
- [ ] No Lighthouse accessibility errors related to the article content

---

## 6. Content Quality Standards

### Definition of "Evidence-Based"

For this blog, "evidence-based" means:

1. **Every factual claim is cited** — no uncited health/medical statements
2. **Sources are from Tier 1 or Tier 2** (see Section 2)
3. **Evidence hierarchy is respected:**
   - Systematic reviews & meta-analyses (strongest)
   - Randomized controlled trials
   - Cohort/observational studies
   - Expert consensus / clinical practice guidelines
   - Expert opinion (weakest — always noted as such)
4. **Recency matters** — prefer guidelines from the last 5 years; note when citing older landmark studies

### Red Lines — Never Publish Content That:

- Provides **specific medication dosages** without "проконсультуйтесь з лікарем" (consult your doctor)
- Offers **diagnosis guidance** — the article informs, it does not diagnose
- Contains **anti-vaccination messaging** or presents anti-vax positions as equally valid
- **Shames or guilt-trips** parents (e.g., "if you didn't breastfeed, you harmed your child")
- Makes **guarantees** about health outcomes (e.g., "this will cure...", "your child will definitely...")
- Recommends **specific brands** of medications, supplements, or products
- Includes **unverified statistics** or invented data points

### Handling Uncertainty

Medical science isn't always black and white. Use this framework:

| Confidence Level | How to Write It | Example |
|---|---|---|
| **Strong consensus** (AAP + WHO + CDC agree) | State as fact with citation | "ВООЗ рекомендує виключно грудне вигодовування до 6 місяців [WHO, 2023]" |
| **Different guidelines exist** | Present both, note which is local standard | "AAP рекомендує... тоді як МОЗ України зазначає... Поговоріть з вашим лікарем про оптимальний підхід" |
| **Limited evidence** | Acknowledge limitation explicitly | "Дослідження в цій сфері обмежені, але наявні дані свідчать про..." |
| **Expert opinion only** | Label clearly | "На думку фахівців... (поки що великих досліджень з цього питання не проводилось)" |

### Tone Guidelines

| Do | Don't |
|---|---|
| Empathy first, then evidence: "Ми розуміємо, як це хвилює..." | Jump straight to clinical facts without emotional acknowledgment |
| Use "ви" (formal address) consistently | Switch between "ти" and "ви" |
| Explain "why" behind recommendations | Just list rules without context |
| Acknowledge that parenting is hard | Imply that good parents always follow every guideline perfectly |
| Use analogies to explain complex concepts | Use medical jargon without explanation |
| End sections with actionable advice | Leave readers with only theoretical knowledge |
| Mention when to seek professional help | Imply the article replaces medical consultation |

### E-E-A-T Signals (Google Quality Guidelines)

Every article must demonstrate:

- **Experience:** Dr. Luba's personal clinical observations (1-2 per article, e.g., "У моїй практиці я часто бачу...")
- **Expertise:** Author credentials clearly displayed, medical review noted
- **Authoritativeness:** Citations from Tier 1-2 sources, structured data with author info
- **Trustworthiness:** Medical disclaimer, AI disclosure, "when to see a doctor" section, no commercial bias

---

## 7. Priority Article List

Six articles for Phase 1, ordered by estimated impact and readiness of source material.

### Article #1: Перший прикорм

| Field | Value |
|---|---|
| **Title** | Перший прикорм: коли починати, з чого і як правильно вводити |
| **Cluster** | A (Infant Health) |
| **Primary keyword** | прикорм дитини |
| **Secondary keywords** | введення прикорму, перший прикорм, прикорм за ВООЗ |
| **Target URL** | `/blog/pershyj-prykorm` |
| **knowledge.md sections** | 3.4.1 (breastfeeding/formula context), 3.4.2 (complementary foods — timing, texture), 3.4.3 (LEAP study — allergen introduction) |
| **Additional sources needed** | WHO complementary feeding guidelines (2023 update), Ukraine MOH feeding recommendations |
| **Navigator connection** | Expands beyond the "teething" card into comprehensive feeding guidance |
| **Existing blog.ts match** | `first-complementary-feeding` — update this entry on publication |

### Article #2: Вакцинація дітей

| Field | Value |
|---|---|
| **Title** | Вакцинація дітей: міфи, факти та календар щеплень в Україні |
| **Cluster** | C (Vaccination) |
| **Primary keyword** | вакцинація дітей |
| **Secondary keywords** | щеплення дітям, календар щеплень Україна, міфи про вакцинацію |
| **Target URL** | `/blog/vakcinacija-ditej` |
| **knowledge.md sections** | 6.1 (immunization schedules — general framework + Ukraine MOH note), 2.2.1 (positive stress — immunizations as example) |
| **Additional sources needed** | Ukraine MOH 2024 vaccination calendar, WHO position papers on individual vaccines |
| **Navigator connection** | Directly expands the fever card's myth about febrile seizures post-vaccination |
| **Existing blog.ts match** | `vaccination-myths` — update this entry on publication |

### Article #3: Температура у дитини

| Field | Value |
|---|---|
| **Title** | Температура у дитини: коли збивати, коли чекати і коли до лікаря |
| **Cluster** | A (Infant Health) |
| **Primary keyword** | температура у дитини |
| **Secondary keywords** | гарячка у дитини, коли збивати температуру, фебрильні судоми |
| **Target URL** | `/blog/temperatura-u-dytyny` |
| **knowledge.md sections** | 3.3.1 (AAP 2021 fever management — full risk stratification by age: 8-21 days, 22-28 days, 29-60 days) |
| **Additional sources needed** | NICE fever in under 5s guideline, practical home management tips |
| **Navigator connection** | Deep-dive of the "Температура у немовляти" myth/science card (age 0-1 Navigator tab) |
| **Existing blog.ts match** | No direct match — add new entry to `blog.ts` |

### Article #4: Сон немовляти

| Field | Value |
|---|---|
| **Title** | Сон немовляти: чому дитина не спить і як допомогти |
| **Cluster** | A (Infant Health) |
| **Primary keyword** | сон немовляти |
| **Secondary keywords** | дитина не спить, безпечний сон, регресія сну |
| **Target URL** | `/blog/son-nemovljaty` |
| **knowledge.md sections** | 3.3.2 (AAP 2022 safe sleep — supine positioning, firm surface, room sharing, sitting devices), 3.2.1 (WHO physical activity — connection to sleep quality) |
| **Additional sources needed** | Sleep regression research, practical sleep hygiene tips for infants |
| **Navigator connection** | Deep-dive of the "Сон немовляти" myth/science card (age 0-1 Navigator tab) |
| **Existing blog.ts match** | `baby-sleep-science` — update this entry on publication |

### Article #5: Дитячі істерики

| Field | Value |
|---|---|
| **Title** | Дитячі істерики: нейронаука пояснює, чому дитина кричить |
| **Cluster** | B (Toddler Development) |
| **Primary keyword** | дитячі істерики |
| **Secondary keywords** | істерики у дитини 2 роки, як заспокоїти дитину, ко-регуляція |
| **Target URL** | `/blog/dytjachi-isteryky` |
| **knowledge.md sections** | 4.2.1 (amygdala hijack — tantrum neuroscience), 4.2.2 (co-regulation strategy — caregiver as external prefrontal cortex), 2.2.1 (stress taxonomy — positive vs tolerable vs toxic), 2.1.2 (serve and return), 2.3 (executive function — why toddlers can't self-regulate) |
| **Additional sources needed** | Siegel & Bryson practical techniques, age-specific strategies |
| **Navigator connection** | Deep-dive of the "Істерики" myth/science card (age 1-3 Navigator tab) |
| **Existing blog.ts match** | No direct match — add new entry to `blog.ts` |

### Article #6: Екранний час для дітей

| Field | Value |
|---|---|
| **Title** | Екранний час для дітей: скільки, з якого віку і що каже ВООЗ |
| **Cluster** | B (Toddler Development) |
| **Primary keyword** | екранний час для дітей |
| **Secondary keywords** | екранний час ВООЗ, планшет дитині, скільки дивитися телевізор |
| **Target URL** | `/blog/ekrannyj-chas` |
| **knowledge.md sections** | 5.3 (WHO guidelines — 24-hour movement guidelines for 3-5 years: 180 min activity, ≤1 hour screen, 10-13 hours sleep), 3.2.2 (infant restraint/screen time — no screens under 1 year) |
| **Additional sources needed** | AAP Media Use Policy 2016 details, practical alternatives to screen time |
| **Navigator connection** | Deep-dive of the "Екранний час" myth/science card (age 1-3 Navigator tab) |
| **Existing blog.ts match** | No direct match — add new entry to `blog.ts` |

---

## Appendix

### A. Suggested Content Calendar

Publishing cadence: **1 article every 2–3 weeks** (allows for proper evidence gathering, AI drafting, medical review, and SEO optimization).

| Week | Article | Status |
|---|---|---|
| 1–3 | #1 — Перший прикорм | Draft + review |
| 4–6 | #2 — Вакцинація дітей | Draft + review |
| 7–9 | #3 — Температура у дитини | Draft + review |
| 10–12 | #4 — Сон немовляти | Draft + review |
| 13–15 | #5 — Дитячі істерики | Draft + review |
| 16–18 | #6 — Екранний час для дітей | Draft + review |

**Total Phase 1 timeline:** ~18 weeks (4.5 months)

After Phase 1, evaluate performance and adjust cadence. Consider bi-weekly publishing if the workflow is smooth.

### B. Codebase Files Affected by Blog Publication

When publishing articles, the following files will need updates:

| File | Change Required |
|---|---|
| `src/data/blog.ts` | Add/update `BlogArticle` entries with `slug`, `publishedDate`, mark `isPublished` |
| `src/App.tsx` | Add `/blog/:slug` route for individual articles |
| `public/sitemap.xml` | Add `<url>` entry for each published article |
| `src/components/BlogTeaser/BlogTeaser.tsx` | May need updates to link to actual articles instead of `/blog` |
| `src/components/BlogComingSoon/BlogComingSoon.tsx` | Replace with a real blog listing page once ≥3 articles are live |
| `index.html` | Add JSON-LD structured data for article pages (or handle in React component) |

### C. Relationship to Existing Site Content

The blog articles are designed to **extend and deepen** content already present on the landing page:

- **Navigator section** (`src/data/situations.ts`): Each myth/science card covers a topic in ~50 words. Blog articles expand these into 1800–2200 word deep-dives with full citations. Articles should link back to the landing page Navigator section, and Navigator cards can eventually link forward to full articles.

- **WhenToContact section**: The 7 consultation topic cards (fever, sleep, feeding, etc.) align with blog topics. Blog articles' "Коли звертатися до лікаря" sections reinforce the same messaging.

- **BlogTeaser section** (`src/data/blog.ts`): Currently has 3 placeholder articles. Articles #1, #2, and #4 directly match these placeholders. Articles #3, #5, #6 are net-new entries. As articles are published, the BlogTeaser should transition from "Скоро" badges to direct article links.

- **FAQ section** (`src/data/faq.ts`): FAQ answers can reference blog articles for deeper reading. Blog articles can reference FAQ for quick answers.

### D. Content Performance Metrics

Track these metrics in Google Search Console and analytics after publication:

| Metric | Target (after 3 months) |
|---|---|
| Indexed in Google | Yes, within 1 week of submission |
| Average position for primary keyword | Top 30 (new domain, realistic goal) |
| Impressions per article per month | 500+ |
| Clicks per article per month | 50+ |
| Telegram channel click-through from article | Track via UTM parameters |

Review these quarterly and adjust keyword targeting, content updates, or new article priorities based on data.
