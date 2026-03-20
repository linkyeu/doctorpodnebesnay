// WayForPay payment link (product: "Онлайн-довідник ШІ-інструментів для лікарів", 999₴)
export const TELEGRAM_PURCHASE_LINK = 'https://secure.wayforpay.com/payment/sed1c44a9652f';

// ── Hero ──

export const heroContent = {
  title: 'Впевнений прийом —<br>від першого огляду до виписки',
  subtitle:
    '16 готових ШІ-рішень для щоденної практики лікаря. <br>Діагностика, виписки, протоколи — за хвилини замість годин',
  sourceNote: '',
  productLine: '',
  heroCta: 'Що всередині ↓',
  cta: 'Отримати довідник — 999 ₴',
  badges: [
    { icon: 'lightning' as const, text: 'Працює одразу' },
    { icon: 'chart' as const, text: 'Оновлюється' },
    { icon: 'users' as const, text: 'Підтримка в Telegram' },
    { icon: 'flag' as const, text: 'Гарантія повернення' },
  ],
};

// ── Daily Reality ──

export const dailyRealityContent = {
  before: {
    heading: 'Твій прийом сьогодні',
    intro: 'Ти лікар на прийомі.\nУ тебе 15–30 хв на пацієнта.',
    tasks: [
      'не пропустити діагноз, коли симптоми нетипові',
      'підібрати лікування за протоколом',
      'пояснити пацієнту все простою мовою',
      'заповнити документацію',
    ],
    repeat: 'Сумнівні кейси, які хочеться з кимось обговорити. Але часу — немає.',
    afterWork: 'І так кожного разу. Нові статті, нові рекомендації — і ти просто біжиш далі.',
    punchline: '',
  },
  after: {
    heading: 'Той самий прийом із ШІ-рішеннями',
    intro: 'Ти приходиш на роботу — і:',
    benefits: [
      'виписка, яка забирала 40 хвилин — готова за 10',
      'нетипові симптоми → диференціальний діагноз із посиланням на протокол',
      'пацієнт прийшов з діагнозом від ChatGPT — ти перевіряєш за хвилину',
    ],
    assistantIntro: '',
    assistantTraits: [],
    closing: 'Це не про "ШІ замінить лікаря".\nЦе про лікаря, який працює впевненіше.',
  },
};

// ── What's Inside ──

export interface WhatsInsideBlock {
  id: string;
  letter: string;
  title: string;
  text: string;
  icon?: string;
}

export const whatsInsideHeading = '16 готових рішень у 4 блоках';
export const whatsInsideSubheading = 'Не курс із модулями. Відкрив, вставив дані пацієнта, отримав відповідь.';

export const whatsInsideBlocks: WhatsInsideBlock[] = [
  {
    id: 'block-a',
    letter: 'А',
    title: 'Протоколи, статті, лекції',
    text: 'Завантажуєш протокол чи статтю → отримуєш відповідь на своє питання з цитатою з джерела. Конспект лекції, переказ статті, пошук по протоколу — без читання на 2 години.',
    icon: '/images/toolkit/illustrations/solutions/A-block-header.png',
  },
  {
    id: 'block-b',
    letter: 'Б',
    title: 'Діагноз, аналізи, лікування',
    text: 'Вводиш симптоми та аналізи пацієнта → отримуєш диференціальний діагноз, план обстеження, перевірку взаємодій ліків. Із посиланнями на протоколи.',
    icon: '/images/toolkit/illustrations/solutions/B-block-header.png',
  },
  {
    id: 'block-c',
    letter: 'В',
    title: 'Розмова з пацієнтом',
    text: 'Пацієнт пише у Viber о 22:00 — «що означає мій діагноз?» Вставляєш діагноз у ChatGPT, копіюєш готове пояснення простою мовою — і йдеш спати.',
    icon: '/images/toolkit/illustrations/solutions/C-block-header.png',
  },
  {
    id: 'block-d',
    letter: 'Г',
    title: 'Виписки та форми',
    text: '027/о, 028/о, 003-4/о — вставляєш дані пацієнта, отримуєш готовий текст виписки. Залишається тільки перевірити і підписати.',
    icon: '/images/toolkit/illustrations/solutions/D-block-header.png',
  },
];

export const whatsInsideFeatures = [
  'Працює з безкоштовним ChatGPT — без платних підписок.',
];

// ── Author Trust ──

export const authorTrustHeading = 'Зроблено лікарем, яка сама це використовує';

export const authorTrustAuthor = {
  id: 'luba',
  name: 'Любов Піднебесна',
  role: 'Сімейний лікар',
  bio: 'Клініка «Добробут», Київ. 13+ років практики. Використовую довідник щодня на онлайн-консультаціях.',
  photo: '/images/ai-course/instructor-luba.webp',
  initials: 'ЛП',
  socialProof: 'Медичний Telegram-канал — 24 000 підписників',
  socialLink: 'https://t.me/medicalforua',
};

export const authorTrustQuote = '';

export const authorTrustTechBadge = '⚙️ Технічну частину розробив Lead AI інженер з IBM';

export const authorTrustClosing = '';

// ── Social Proof ──

export interface SocialProofQuote {
  id: string;
  text: string;
  author: string;
  role: string;
}

export const socialProofHeading = 'Перші відгуки колег';
export const socialProofQuotes: SocialProofQuote[] = [
  { id: 'sp-1', text: 'Перший самостійний прийом, нечіткі симптоми — ступор. Відкрив довідник, ввів скарги — три диференціальні діагнози з поясненням. Як досвідчений колега поруч, тільки о третій ночі.', author: 'Андрій М.', role: 'лікар-інтерн, терапія' },
  { id: 'sp-2', text: 'Колега робить епікризи за 5 хвилин — я витрачала 40. Соромно було спитати «як?». Після довідника — 7 хвилин. Без програмування, просто copy-paste.', author: 'Ірина В.', role: 'кардіолог, 12 років стажу' },
  { id: 'sp-3', text: 'Діагноз поставила, але сумнівалась у виборі антибіотика — покоління, дозування, взаємодія з іншими ліками пацієнта. Перевірка протоколів виявила взаємодію, яку я б пропустила.', author: 'Олена К.', role: 'лікар-інтерн, ендокринологія' },
  { id: 'sp-4', text: 'Думала, ШІ — це програмування. Уникала рік. Виявилось — копіюєш текст, вставляєш, отримуєш відповідь. Донька б сміялась, але для мене це було відкриття. Тепер користуюсь щодня.', author: 'Наталія Г.', role: 'невролог, 18 років стажу' },
  { id: 'sp-5', text: 'Ледь не призначила те, що ChatGPT видав з неіснуючого джерела. У довіднику є чеклісти перевірки — тепер знаю, що перевіряти, і працюю спокійно.', author: 'Марія Т.', role: 'лікар-інтерн, гастроентерологія' },
];

// ── Pricing ──

export const pricingContent = {
  sectionTitle: 'Одна ціна. Без підписок.',
  price: '999 ₴',
  priceNote: '',
  features: [
    'Без терміну дії — доступ не зникне',
    'Оновлення автоматично: нові рішення, нові протоколи',
    'Telegram-підтримка: застрягли — напишіть, допоможемо',
  ],
  highlightFeatures: [1, 2],
  competitors: [],
  uniqueBadge: '',
  priceAnchor: '≈ ціна однієї консультації',
  guarantee: 'Не підійшло — повне повернення без питань.',
  cta: 'Отримати довідник — 999 ₴',
  trustBadge: 'Оплата карткою Visa / Mastercard',
  subtitle: '',
  timeSaving: '',
  urgency: '',
  priceEuro: '',
};

// ── Footer ──

export const courseFooterContent = {
  telegram: '@doctorpidnebesna',
  telegramUrl: 'https://t.me/doctorpidnebesna',
  siteUrl: 'https://doctorpidnebesna.com',
  copyright: '© Лікар Піднебесна, 2026',
};
