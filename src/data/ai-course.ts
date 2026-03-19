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
  title: 'Впевнений діагноз —<br>навіть у складному випадку',
  subtitle:
    'Готові рішення на основі протоколів МОЗ: відкрий потрібне, введи дані пацієнта в ChatGPT — отримай відповідь із джерелом',
  sourceNote: '',
  productLine: 'ОНЛАЙН-ДОВІДНИК ВІД ЛІКАРЯ-ПРАКТИКА З 13+ РОКАМИ ДОСВІДУ',
  heroCta: 'Що всередині ↓',
  cta: 'Отримати довідник — 999 ₴',
  badges: [] as HeroBadge[],
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
  text: 'Ти не поганий лікар. Тобі просто потрібен інструмент, який працює з українськими протоколами МОЗ — і дає відповідь за хвилину, а не за годину.',
  stat: '',
  cta: 'Отримати довідник — 999 ₴',
};

// ── Before/After Example ──

export const beforeAfterExample = {
  heading: 'Один випадок. Два підходи.',
  scenario: 'Пацієнтка, 34 роки. Скарги: втома, набір ваги, випадіння волосся.',
  before: {
    label: 'БЕЗ довідника',
    text: 'Гуглиш диференціальну діагностику. Відкриваєш три статті англійською. Перечитуєш протокол МОЗ — десятки сторінок. Призначаєш аналізи — але не впевнений, чи нічого не пропустив.',
    time: '30-40 хвилин',
    confidence: 'Впевненості: мало.',
  },
  after: {
    label: 'З довідником',
    text: 'Відкриваєш готове рішення. Вводиш дані пацієнтки в ChatGPT. Отримуєш диференціальний діагноз із посиланням на протокол МОЗ. Бачиш, які аналізи призначити і чому.',
    time: '2 хвилини',
    confidence: 'Впевненості: максимум.',
  },
  footer: 'Не потрібно нічого вчити. Не потрібно проходити курс. Відкрив — скопіював — отримав результат.',
  cta: 'Отримати довідник — 999 ₴',
};

// ── What's Inside ──

export interface WhatsInsideBlock {
  id: string;
  letter: string;
  title: string;
  count: number;
  text: string;
}

export const whatsInsideHeading = 'Що всередині';
export const whatsInsideSubheading = 'Готові рішення у 4 блоках. Кожне — це конкретна задача лікаря, яку ШІ вирішує за хвилини.';

export const whatsInsideBlocks: WhatsInsideBlock[] = [
  {
    id: 'block-a',
    letter: 'А',
    title: 'Протоколи, статті, лекції',
    count: 5,
    text: 'Завантажуєш протокол чи статтю → отримуєш відповідь на своє питання з цитатою з джерела. Конспект лекції, переказ статті, пошук по протоколу — без читання на 2 години.',
  },
  {
    id: 'block-b',
    letter: 'Б',
    title: 'Діагноз, аналізи, лікування',
    count: 6,
    text: 'Вводиш симптоми та аналізи пацієнта → отримуєш диференціальний діагноз, план обстеження, перевірку взаємодій ліків. Із посиланнями на протоколи.',
  },
  {
    id: 'block-c',
    letter: 'В',
    title: 'Розмова з пацієнтом',
    count: 3,
    text: 'Потрібно пояснити діагноз простою мовою? Відповісти на повідомлення пацієнта? Провести складну розмову? Готова відповідь — за 30 секунд.',
  },
  {
    id: 'block-d',
    letter: 'Г',
    title: 'Виписки та форми',
    count: 2,
    text: 'Виписка чи форма МОЗ — за кілька хвилин замість 40.',
  },
];

export const whatsInsideFeatures = [
  '+ Покрокові інструкції + відео до кожного рішення. Навіть якщо ти ніколи не користувався ChatGPT — відкриєш і зрозумієш. Жодних технічних навичок.',
  'Працює з безкоштовними версіями. Не потрібна платна підписка на ChatGPT чи будь-що інше.',
  'Можна диктувати голосом замість друку — натисніть 🎙️ у ChatGPT і продиктуйте дані пацієнта',
];

// ── Author Trust (full section) ──

export const authorTrustHeading = 'Хто це створив';

export const authorTrustAuthor = {
  id: 'luba',
  name: 'Любов Піднебесна',
  role: 'Сімейний лікар',
  bio: '13+ років практики. Працює в Добробут, Київ. Щодня приймає пацієнтів — і щодня користується цими рішеннями сама.',
  photo: '/images/ai-course/instructor-luba.webp',
  initials: 'ЛП',
};

export const authorTrustTechBadge = '⚙️ Перевірено ШІ-інженером IBM (12+ років)';

// Keep backward compat for authorTrustAuthors
export const authorTrustAuthors = [authorTrustAuthor];

export const authorTrustClosing = 'Це не маркетинговий продукт від людей, далеких від медицини. Це робочий інструмент від лікаря, яка сама ним користується на прийомах.';

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
  { name: 'Hillel AI курс', price: '11 610₴' },
  { name: 'WebPromoExperts', price: '22 500₴' },
  { name: 'Закордонні курси', price: '$500–2 500' },
];

export const pricingContent = {
  sectionTitle: 'Одна ціна. Без підписок.',
  price: '999 ₴',
  priceNote: 'Одноразово. Назавжди.',
  features: [
    'Готові рішення для щоденних задач лікаря',
    'Покрокові інструкції + відео до кожного рішення',
    'Доступ до онлайн-довідника — назавжди',
    'Оновлення: нові рішення, нові інструменти, нові протоколи — автоматично',
    'Telegram-підтримка: застрягли? Напишіть — допоможемо',
  ],
  highlightFeatures: [3, 4], // indices of features that need visual emphasis (updates + TG support)
  competitorText: '',
  guarantee: 'Гарантія повернення грошей. Не підійшло? Повне повернення. Без питань.',
  cta: 'Отримати довідник — 999 ₴',
  trustBadge: 'Створено лікарем з 13+ років практики',
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

export const socialProofHeading = '';
export const socialProofQuotes: SocialProofQuote[] = [];

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
