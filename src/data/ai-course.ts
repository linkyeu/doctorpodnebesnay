// ── Hero ──

export const heroContent = {
  title: 'Впевнений прийом —<br>від першого огляду до виписки',
  subtitle:
    '16 готових ШІ-рішень для щоденної практики лікаря. <br>Діагностика, виписки, протоколи, саморозвиток — з джерелами, без сумнівів, за хвилини',
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

// ── AI Adoption Stats ──

export const aiAdoptionStats = {
  mainValue: '81%',
  mainLabel: 'лікарів у США використовують ШІ в клінічній практиці',
  context: 'У 2023 році — 38%.',
  source: {
    org: 'American Medical Association',
    detail: 'опитування 1 700 лікарів, 2026',
    url: 'https://www.ama-assn.org/practice-management/digital-health/more-80-physicians-use-ai-professionally-ama-survey',
  },
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
    afterWork: 'І ти просто біжиш далі.',
    punchline: '',
  },
  after: {
    heading: 'Твій прийом із ШІ',
    intro: 'Ти приходиш на роботу — і:',
    benefits: [
      'нетипові симптоми → диференціальний діагноз із посиланням на протокол',
      'перевірка взаємодій ліків — до того, як виписав рецепт',
      'виписка, яка забирала 40 хвилин — готова за 10',
    ],
    assistantIntro: '',
    assistantTraits: [],
    closing: '',
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
export const whatsInsideSubheading = 'Не курс із модулями. Онлайн-довідник: відкрив у браузері, вставив дані пацієнта, отримав відповідь.';

export const whatsInsideBlocks: WhatsInsideBlock[] = [
  {
    id: 'block-a',
    letter: 'А',
    title: 'Протоколи, статті, лекції',
    text: 'Протокол, стаття, лекція → відповідь на твоє питання з цитатою з джерела. Без читання на 2 години.',
    icon: '/images/ai-course/block-a.webp',
  },
  {
    id: 'block-b',
    letter: 'Б',
    title: 'Діагноз, аналізи, лікування',
    text: 'Вводиш симптоми та аналізи пацієнта → отримуєш диференціальний діагноз, план обстеження, перевірку взаємодій ліків. Із посиланнями на протоколи.',
    icon: '/images/ai-course/block-b.webp',
  },
  {
    id: 'block-c',
    letter: 'В',
    title: 'Коли пацієнт проти',
    text: 'Антивакс-батьки, відмова від лікування, «в інтернеті написано інакше» — готовий сценарій розмови. Від першої фрази до плану дій.',
    icon: '/images/ai-course/block-c.webp',
  },
  {
    id: 'block-d',
    letter: 'Г',
    title: 'Виписки та форми',
    text: '027/о, 028/о, 003-4/о — вставляєш дані пацієнта, отримуєш готовий текст виписки. Залишається тільки перевірити і підписати.',
    icon: '/images/ai-course/block-d.webp',
  },
];

export const whatsInsideFeatures = [
  'Працює з безкоштовним ChatGPT — без платних підписок.',
  'Не просто промпти — рішення, якими лікар користується щодня на консультаціях.',
];

// ── Author Trust ──

export const authorTrustHeading = 'Зроблено лікарем, яка сама це використовує';

export const authorTrustAuthor = {
  id: 'luba',
  name: 'Любов Піднебесна',
  role: 'Сімейний лікар',
  bio: '13+ років практики. Використовую довідник на онлайн-консультаціях.',
  photo: '/images/ai-course/instructor-luba.webp',
  initials: 'ЛП',
  socialProof: 'Медичний Telegram-канал — 24 000 підписників',
  socialLink: 'https://t.me/medicalforua',
};

export const authorTrustQuote = 'Виписка забирає пів години. Сумніваєшся в діагнозі — і нема з ким порадитись. Шукаєш інформацію між прийомами, бо на прийомі часу нема.\n\nЯ це знаю — бо в мене так само. Тому я почала тестувати ШІ-інструменти в реальній практиці. За рік відібрала те, що реально працює на прийомі.';

export const authorTrustTechBadge = '';

export const authorTrustClosing = '';

// ── Social Proof ──

export interface SocialProofQuote {
  id: string;
  text: string;
  author: string;
  role: string;
}

export const socialProofHeading = 'Відгуки колег';
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
    'Telegram-підтримка: застряг — напиши, допоможемо',
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
