# Спека: Лендинг «AI для лікарів»

**Дата:** 19 лютого 2026
**Статус:** 📋 Готово для розробки
**Технологія:** HTML/CSS/JS — збирати через Claude Code
**Деплой:** GitHub Pages (doctorpidnebesna.com/ai-course) або окремий субдомен
**Копі:** `content/landing-copy-ai-course.md`
**Бренд:** `products/luba-brand/brand/brand-guidelines.md`

---

## 1. Загальні вимоги

### Тип сторінки
Одностраничний лендинг (Single Page Application). Один HTML-файл + inline CSS + мінімальний JS. Без фреймворків. Максимально легкий та швидкий.

### Мова
Українська. Весь контент — з `content/landing-copy-ai-course.md`.

### Респонсивність
- Mobile-first (80%+ трафіку буде з мобільного — Instagram, Telegram)
- Breakpoints: 375px (mobile), 768px (tablet), 1200px (desktop)
- Тестувати на iPhone SE, iPhone 14, Samsung Galaxy S21

### Швидкість
- Lighthouse Performance score > 90
- Без зовнішніх залежностей крім шрифтів
- Зображення: WebP, lazy loading
- Мінімальний JS (тільки для форми + smooth scroll + FOMO-таймер)

---

## 2. Дизайн-система

### Кольори (з brand-guidelines.md)

```css
:root {
  --color-primary: #1B3A4B;       /* заголовки, кнопки, текст */
  --color-bg: #FAFAF8;            /* фон основний */
  --color-bg-alt: #F5F4F1;        /* фон альтернативний, картки */
  --color-accent: #C8956C;        /* CTA hover, акценти, FOMO */
  --color-sage: #A8B5A0;          /* іконки, м'які акценти */
  --color-rose: #C4A0A0;          /* декоративні деталі */
  --color-dark: #111827;          /* контрастні секції */
  --color-footer: #0B1120;        /* футер */
  --color-white: #FFFFFF;
  --color-text: #1B3A4B;
  --color-text-light: rgba(27, 58, 75, 0.7);
}
```

### Шрифти

```css
/* Заголовки */
font-family: 'Playfair Display', serif;

/* Тіло тексту */
font-family: 'Manrope', sans-serif;
```

- Google Fonts: підключити Playfair Display (400, 700) + Manrope (400, 500, 700)
- Fallback: serif / sans-serif
- Кирилиця обов'язково

### Типографіка

| Елемент | Шрифт | Розмір (mobile) | Розмір (desktop) |
|---------|-------|-----------------|-------------------|
| H1 (hero) | Playfair Display 700 | 28px | 48px |
| H2 (секція) | Playfair Display 700 | 24px | 36px |
| H3 (підзаголовок) | Manrope 700 | 20px | 24px |
| Body text | Manrope 400 | 16px | 18px |
| Small / caption | Manrope 400 | 14px | 14px |
| CTA button text | Manrope 700 | 16px | 18px |

### Кнопки

```css
/* Основна CTA */
.btn-primary {
  background: var(--color-primary);
  color: white;
  padding: 16px 32px;
  border-radius: 8px;
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  font-size: 18px;
  transition: background 0.3s;
  cursor: pointer;
}
.btn-primary:hover {
  background: var(--color-accent);
}
```

---

## 3. Структура секцій

### 3.1. Hero (above the fold)

**Фон:** `--color-bg` або м'який градієнт `#FAFAF8 → #F5F4F1`
**Layout:**
- Desktop: текст ліворуч, ілюстрація/бейдж праворуч
- Mobile: текст зверху, кнопка знизу (фіксовано видима)

**Елементи:**
- [ ] Заголовок H1 (Playfair Display)
- [ ] Підзаголовок (Manrope)
- [ ] CTA-кнопка «Забронювати місце зі знижкою 30%» → скролить до форми
- [ ] Мікротекст під кнопкою (Manrope, 14px, --color-text-light)
- [ ] Бейджі довіри: "IBM Research", "13+ років практики", "24 000 лікарів у спільноті"

**Sticky mobile CTA:** Кнопка «Забронювати» фіксується внизу екрану при скролі на мобільному.

---

### 3.2. Проблема (Pain points)

**Фон:** `--color-bg-alt`
**Layout:** 4 пункти вертикально, іконки ліворуч
**Елементи:**
- [ ] Заголовок H2: «Вам це знайоме?»
- [ ] 4 pain-пункти з іконками (→ або ❌ або SVG-іконки в sage кольорі)
- [ ] Статистичний блок внизу: "66% лікарів вже використовують AI. 81% хочуть більше тренінгу."
- [ ] Візуальне виділення статистики (більший шрифт, accent колір)

---

### 3.3. Outcomes (Що ви отримаєте)

**Фон:** `--color-bg`
**Layout:** Grid 2×2 (desktop), вертикальний стек (mobile)
**Елементи:**
- [ ] Заголовок H2: «Після курсу ви зможете:»
- [ ] 4 картки з outcomes (кожна: іконка + заголовок H3 + опис 1-2 речення)
- [ ] Тізер під картками: «+ ще 5 практичних модулів з реальними кейсами»

**Картки:**
```
Border: 1px solid rgba(27, 58, 75, 0.1)
Background: white
Border-radius: 12px
Padding: 24px
Shadow: subtle (0 2px 8px rgba(0,0,0,0.05))
```

---

### 3.4. Для кого

**Фон:** `--color-bg-alt`
**Layout:** Два блоки: ✅ «Для кого» ліворуч, ❌ «Не потрібно» праворуч (desktop). Стек (mobile).
**Елементи:**
- [ ] Заголовок H2: «Для кого це»
- [ ] 3 пункти ✅ (зелений чекмарк у sage кольорі)
- [ ] 3 пункти ❌ (перекреслення або red-ish)

---

### 3.5. Credibility (Хто веде)

**Фон:** `--color-bg`
**Layout:** Дві карти поруч (desktop), стек (mobile)
**Елементи:**
- [ ] Заголовок H2: «Вас навчатимуть»
- [ ] Карта Дениса: placeholder для фото (круг 120px), ім'я, опис
- [ ] Карта Люби: placeholder для фото (круг 120px), ім'я, опис
- [ ] Підтекст під картами: унікальність пари (AI engineer + лікар)

**Фото:** Поки що — placeholder з ініціалами на тлі `--color-primary`. Реальні фото додамо пізніше.

---

### 3.6. Тарифи

**Фон:** `--color-dark` (контрастна секція)
**Текст:** білий
**Layout:** 3 колонки (desktop), горизонтальний скрол або стек (mobile)
**Елементи:**
- [ ] Заголовок H2: «Оберіть свій формат»
- [ ] 3 карти тарифів

**Кожна карта:**
```
Background: white (або напівпрозорий)
Border-radius: 16px
Padding: 32px
```
- Назва тарифу (H3)
- Стара ціна (закреслена, --color-text-light)
- Нова ціна early bird (великий шрифт, accent колір)
- Список що входить (✓ пункти)
- CTA-кнопка (primary для рекомендованого тіру, outline для інших)

**Premium карта — виділена:** більший розмір, бейдж «Популярний» у accent кольорі

---

### 3.7. Email-форма (основний CTA)

**Фон:** `--color-bg`
**Layout:** Центрований блок, max-width 600px
**Елементи:**
- [ ] Заголовок H2: «Забронюйте місце з ранньою знижкою 30%»
- [ ] Підтекст: про бонусний PDF
- [ ] Поле email (input, великий, з placeholder "ваш@email.com")
- [ ] CTA-кнопка «Забронювати місце»
- [ ] Мікротекст: «Знижка діє для перших 50 учасників»
- [ ] FOMO-каунтер: «Залишилось X місць зі знижкою» (JS-каунтер, стартує з 50, зменшується — деталі в секції JS)

**Форма:**
- Backend: Google Forms embed АБО Formspree.io АБО простий fetch до Google Sheets API
- Validation: email format, required
- Success state: «Дякуємо! Перевірте email — бонус вже летить ✉️»
- Error state: «Щось пішло не так. Спробуйте ще раз або напишіть нам у Telegram.»

---

### 3.8. Сертифікат

**Фон:** `--color-bg-alt`
**Layout:** Текст + декоративний mockup сертифіката
**Елементи:**
- [ ] Заголовок H2: «Сертифікат»
- [ ] Текст: сертифікат проходження + працюємо над БПР
- [ ] Опціонально: візуальний mockup сертифіката (можна згенерувати)

---

### 3.9. FAQ

**Фон:** `--color-bg`
**Layout:** Accordion (клік → розкривається відповідь)
**Елементи:**
- [ ] Заголовок H2: «Часті запитання»
- [ ] 6 питань-відповідей (accordion, pure CSS або мін. JS)
- [ ] Кожне питання: H3 + стрілка ▼/▲
- [ ] Плавна анімація відкриття (CSS transition max-height)

---

### 3.10. Фінальний CTA

**Фон:** `--color-primary` (темна секція)
**Текст:** білий
**Layout:** Центрований
**Елементи:**
- [ ] Заголовок H2: «66% ваших колег вже використовують AI. А ви?»
- [ ] CTA-кнопка (білий фон, primary текст) → скролить до форми

---

### 3.11. Футер

**Фон:** `--color-footer`
**Текст:** білий, opacity 0.7
**Елементи:**
- [ ] Копірайт
- [ ] Контактний email
- [ ] Посилання: Telegram, Instagram
- [ ] Опціонально: "Створено з ❤️ в Україні"

---

## 4. JavaScript

### Мінімальний набір:
1. **Smooth scroll** — CTA-кнопки плавно скролять до форми
2. **FAQ accordion** — розкриття/закриття питань
3. **FOMO-каунтер** — "Залишилось X місць зі знижкою" (localStorage для збереження між сесіями, поступово зменшується випадково кожні 2-8 годин)
4. **Form submission** — fetch до Google Sheets або Formspree
5. **Sticky mobile CTA** — показується при скролі нижче hero на мобільному
6. **Simple analytics** — UTM-параметри зберігаються, передаються з формою

### Що НЕ потрібно:
- Ніяких фреймворків (React, Vue тощо)
- Ніяких анімаційних бібліотек
- Ніякого jQuery
- Ніяких кукі-банерів (немає кукі — нема банера)

---

## 5. SEO

```html
<title>AI для лікарів — практичний курс | Денис Фіщенко + Др. Піднебесна</title>
<meta name="description" content="Практичний курс з використання ChatGPT та AI у медичній практиці. Від AI-інженера IBM та практикуючого лікаря. Без коду, тільки медичні кейси.">
<meta name="keywords" content="AI для лікарів, ChatGPT медицина, курс AI лікар, штучний інтелект медицина, БПР бали">
<meta property="og:title" content="AI для лікарів — лікарі які використовують AI замінять тих хто ні">
<meta property="og:description" content="Практичний курс від AI-інженера IBM + практикуючого лікаря. Старт березень 2026.">
<meta property="og:image" content="[og-image.jpg — 1200x630]">
<meta property="og:type" content="website">
<link rel="canonical" href="https://doctorpidnebesna.com/ai-course">
```

---

## 6. Трекінг та аналітика

### UTM-параметри
Лендинг зберігає UTM з URL та передає разом з email:
- `utm_source` (instagram, telegram, linkedin, facebook, medicalforua)
- `utm_medium` (organic, paid, post, story)
- `utm_campaign` (ai-course-launch)

### Google Analytics / Plausible
- Підключити Plausible (легший за GA, GDPR-friendly, без кукі)
- Events: page_view, scroll_50%, scroll_100%, form_submit, form_error

### Conversion tracking
- Головна метрика: email submissions
- По каналах: utm_source розбивка
- Формула: конверсія = emails / unique_visitors

---

## 7. Хостинг та деплой

### Варіант 1 (рекомендований): GitHub Pages
- Репо: `doctorpodnebesnay` (вже є)
- Шлях: `/docs/ai-course/` або окрема гілка `gh-pages`
- URL: `doctorpidnebesna.com/ai-course` (CNAME вже налаштований для основного сайту)
- Безкоштовно, HTTPS автоматично

### Варіант 2: Окремий субдомен
- `ai.doctorpidnebesna.com`
- Той самий GitHub Pages, окремий CNAME

---

## 8. Файлова структура

```
ai-course/
├── index.html          # Весь лендинг (HTML + inline CSS + JS)
├── og-image.jpg        # Open Graph зображення 1200x630
├── favicon.ico         # Фавікон
├── robots.txt          # SEO
└── assets/
    ├── denys.webp      # Фото Дениса (placeholder поки)
    ├── luba.webp       # Фото Люби (placeholder поки)
    └── cert-mockup.webp # Mockup сертифіката (опціонально)
```

---

## 9. Критерії готовності (Definition of Done)

- [ ] Всі 11 секцій реалізовані згідно копі
- [ ] Responsive: тестовано на 375px, 768px, 1200px
- [ ] Форма працює: email зберігається (Google Sheets / Formspree)
- [ ] UTM-параметри передаються з формою
- [ ] FAQ accordion працює
- [ ] FOMO-каунтер працює
- [ ] Lighthouse Performance > 90
- [ ] OG-мета заповнена (шерінг у Telegram/FB виглядає добре)
- [ ] Задеплоєно на GitHub Pages
- [ ] URL працює: doctorpidnebesna.com/ai-course

---

## 10. Таймлайн розробки

```
Feb 20 (завтра):
  Ранок:  Claude Code генерує HTML → перший драфт
  Обід:   Денис перевіряє, правки
  Вечір:  Фінальна версія → деплой на GitHub Pages

Feb 21 (субота):
  Тестування на мобільному → фікси → запуск реклами
```

---

*Створено: 19 лютого 2026*
