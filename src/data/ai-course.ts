// WayForPay payment link (product: "Онлайн-довідник ШІ-інструментів для лікарів", 999₴)
export const TELEGRAM_PURCHASE_LINK = 'https://secure.wayforpay.com/payment/sed1c44a9652f';

// ── Shared interfaces ──

export interface PainPoint {
  id: string;
  icon: 'clock' | 'books' | 'alert' | 'users' | 'search' | 'brain';
  headline: string;
  text: string;
  source?: string;
}

export interface Instructor {
  id: string;
  name: string;
  title: string;
  bio: string;
  initials: string;
  photo?: string;
  socialLinks?: { platform: string; url: string }[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

// ── Hero ──

export interface HeroBadge {
  icon: 'chart' | 'lightning' | 'flag' | 'users';
  text: string;
}

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

// ── Pain Points ──

export const painPointsHeading = 'Знайомо?';

export const painPoints: PainPoint[] = [
  {
    id: 'pain-1',
    icon: 'alert',
    headline: 'Ступор перед пацієнтом',
    text: 'Симптоми не вкладаються в жоден діагноз. Теорію знаєш — а що робити прямо зараз, незрозуміло. Пацієнт дивиться на тебе і чекає відповідь.',
  },
  {
    id: 'pain-2',
    icon: 'search',
    headline: 'Гугл замість протоколів',
    text: 'Шукаєш відповідь англійською, бо українською — нічого. Знаходиш статтю 2019 року. Не впевнений, чи це ще актуально. Витрачаєш 30 хвилин — і все одно сумніваєшся.',
  },
  {
    id: 'pain-3',
    icon: 'clock',
    headline: 'Виписка на 40 хвилин',
    text: 'Колега робить виписку за 5 хвилин. Ти — за 40. Не тому що гірший лікар. Просто ніхто не показав коротший шлях.',
  },
];

export const painAccent = {
  text: 'Ти все робиш правильно. Але коли 15 хвилин на пацієнта — навіть найкращому потрібна опора.',
  stat: 'Кожне рішення — перевірена інструкція: промпт із захистом від помилок ШІ, чеклісти перевірки та посилання на протоколи. Те, на що лікарю-одинаку пішли б тижні проб і помилок.',
  cta: 'Отримати довідник — 999 ₴',
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
    closing: 'Це не про "AI замінить лікаря".\nЦе про лікаря, який працює впевненіше.',
  },
};

// ── Before/After Example ──

export const beforeAfterExample = {
  heading: 'Один випадок. Два підходи.',
  scenario: 'Пацієнтка, 34 роки. Скарги: втома, набір ваги, випадіння волосся.',
  before: {
    label: 'БЕЗ довідника',
    text: 'Невпевненість. Кілька статей англійською, протокол на десятки сторінок — і все одно страх щось пропустити. Призначаєш аналізи, але повної картини нема.',
    time: '30-40 хвилин',
    confidence: 'Сумніви залишаються.',
  },
  after: {
    label: 'З довідником',
    text: 'Впевненість. Диференціальний діагноз із посиланням на протокол МОЗ, конкретні аналізи і чому саме вони. Ти точно знаєш, що нічого не пропустив.',
    time: '2 хвилини',
    confidence: 'Рішення з джерелом.',
  },
  footer: 'Та сама задача. Той самий лікар. Різниця — інструмент.',
  cta: 'Отримати довідник — 999 ₴',
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

// ── Author Trust (full section) ──

export const authorTrustHeading = 'Зроблено лікарем, яка сама це використовує';

export const authorTrustAuthor = {
  id: 'luba',
  name: 'Любов Піднебесна',
  role: 'Сімейний лікар',
  bio: '13+ років практики, клініка «Добробут», Київ. Кожне рішення перевірено на реальних прийомах — від диференціальної діагностики до складних розмов із пацієнтами.',
  photo: '/images/ai-course/instructor-luba.webp',
  initials: 'ЛП',
};

export const authorTrustTechBadge = '⚙️ Технічна частина: ШІ-інженер з IBM — промпти, захист від галюцинацій, перевірка точності';

// Keep backward compat for authorTrustAuthors
export const authorTrustAuthors = [authorTrustAuthor];

export const authorTrustClosing = '';

// Keep backward compat
export const mainInstructor: Instructor = {
  id: 'luba',
  name: 'Др. Любов Піднебесна',
  title: 'Сімейний лікар · «Добробут», Київ · 13 років практики',
  bio: '',
  initials: 'ЛП',
  photo: '/images/ai-course/instructor-luba.webp',
  socialLinks: [],
};

export const techAuthorLine = 'Технічна частина: ШІ-інженер (IBM)';
export const instructors: Instructor[] = [mainInstructor];
export const authorTrustSubtitle = '';
export const authorTrustBadges = [
  'Створено лікарем-практиком',
  'Перевірено ШІ-інженером IBM',
  'Українською мовою',
];

// ── Pricing ──

export interface CompetitorPrice {
  name: string;
  price: string;
}

export const competitorPrices: CompetitorPrice[] = [
  { name: 'Один точний діагноз', price: 'безцінний' },
  { name: 'Курси з ШІ для лікарів', price: '11 000–65 000₴' },
  { name: 'Довідник', price: '999₴' },
];

export const pricingContent = {
  sectionTitle: 'Одна ціна. Без підписок.',
  price: '999 ₴',
  priceNote: '',
  features: [
    'Без терміну дії — доступ не зникне',
    'Оновлення автоматично: нові рішення, нові протоколи',
    'Telegram-підтримка: застрягли — напишіть, допоможемо',
  ],
  highlightFeatures: [1, 2], // indices of features that need visual emphasis (updates + TG support)
  competitorText: '',
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

// ── Legacy exports (kept for backward compat, not used on landing) ──

export interface HowItWorksStep {
  id: string;
  image: string;
  emoji: string;
  num: string;
  title: string;
  description: string;
}

export const howItWorksSteps: HowItWorksStep[] = [];
export const howItWorksFooter = '';

export interface WhatsInsideTask {
  id: string;
  image: string;
  task: string;
  result: string;
}

export const whatsInsideTasks: WhatsInsideTask[] = [];
export const whatsInsideFormat = { line1: '', line2: '' };

export interface WorkflowExample {
  id: string;
  emoji: string;
  title: string;
  before: { label: string; barPercent: number };
  after: { label: string; barPercent: number };
  multiplier: string;
  detail: string;
}

export const workflowExamples: WorkflowExample[] = [];
export const workflowExamplesFooter = '';

export interface WhyNotPoint {
  id: string;
  icon: 'zap' | 'shield' | 'target';
  title: string;
  text: string;
}

export const whyNotChatGptHeading = '';
export const whyNotChatGptPoints: WhyNotPoint[] = [];

export interface Persona {
  id: string;
  emoji: string;
  image: string;
  heading: string;
  text: string;
}

export const personas: Persona[] = [];

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

export interface ProductFeature {
  id: string;
  emoji: string;
  title: string;
  text: string;
}

export const productOverviewContent = {
  heading: '',
  subtitle: '',
  features: [] as ProductFeature[],
  footer: '',
};

export const courseFaqItems: FaqItem[] = [];

export const finalCtaContent = {
  heading: '',
  subtext: '',
  cta: 'Отримати довідник — 999 ₴',
};
