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
    'Довідник із готовими рішеннями на основі протоколів МОЗ: відкрий потрібне, введи дані пацієнта — отримай відповідь із джерелом',
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
  text: 'Ти все робиш правильно. Але коли 15 хвилин на пацієнта — навіть найкращому потрібна опора.',
  stat: 'Це не запити для ChatGPT, які можна написати самому — це клінічна система під конкретні задачі лікаря, перевірена на реальних прийомах.',
  cta: 'Отримати довідник — 999 ₴',
};

// ── Daily Reality ──

export const dailyRealityContent = {
  before: {
    heading: 'Твій день',
    intro: 'Ти лікар на прийомі.\nУ тебе 15–30 хв на пацієнта.',
    tasks: [
      'вислухати',
      'оглянути',
      'нічого не пропустити',
      'поставити діагноз',
      'призначити обстеження',
      'пояснити лікування простою мовою',
      'заповнити документацію',
    ],
    repeat: 'І так кожного разу.',
    afterWork: 'А після роботи?\nНові статті. Нові рекомендації.\nСумнівні кейси, які хочеться з кимось обговорити.\nАле часу — немає.\nІ ти просто біжиш далі.',
    punchline: '',
  },
  after: {
    heading: 'А тепер уяви інше',
    intro: 'Ти приходиш на роботу — і:',
    benefits: [
      'виписка, яка забирала 40 хвилин — готова за 10',
      'нетипові симптоми → диференціальний діагноз із посиланням на протокол',
      'складна розмова з пацієнтом → формулювання вже готове',
      'протокол на 50 сторінок → конспект із головним за 2 хвилини',
      'перевірка взаємодій ліків — до того, як виписав рецепт',
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

export const whatsInsideHeading = 'Відкриваєш — і працюєш';
export const whatsInsideSubheading = 'Готові рішення у 4 блоках. Кожне — це конкретна задача лікаря, яку ШІ вирішує за хвилини.';

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
    text: 'Потрібно пояснити діагноз простою мовою? Відповісти на повідомлення пацієнта? Провести складну розмову? Готова відповідь — за 30 секунд.',
    icon: '/images/toolkit/illustrations/solutions/C-block-header.png',
  },
  {
    id: 'block-d',
    letter: 'Г',
    title: 'Виписки та форми',
    text: 'Виписка чи форма МОЗ — за кілька хвилин замість 40.',
    icon: '/images/toolkit/illustrations/solutions/D-block-header.png',
  },
];

export const whatsInsideFeatures = [
  '+ Покрокові інструкції до кожного рішення. Навіть якщо ти ніколи не користувався ChatGPT — відкриєш і зрозумієш. Жодних технічних навичок.',
  'Працює з безкоштовними версіями. Не потрібна платна підписка на ChatGPT чи будь-що інше.',
  'Можна диктувати голосом замість друку — натисніть 🎙️ у ChatGPT і продиктуйте дані пацієнта',
];

// ── Author Trust (full section) ──

export const authorTrustHeading = 'Зроблено лікарем, яка сама це використовує';

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
    'Доступ назавжди — не підписка, а ваш інструмент',
    'Оновлення автоматично: нові рішення, нові протоколи',
    'Telegram-підтримка: застрягли — напишіть, допоможемо',
  ],
  highlightFeatures: [1, 2], // indices of features that need visual emphasis (updates + TG support)
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
