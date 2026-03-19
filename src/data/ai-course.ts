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

// ── How It Works (3-step process) ──

export interface HowItWorksStep {
  id: string;
  image: string;
  emoji: string;
  num: string;
  title: string;
  description: string;
}

export const howItWorksSteps: HowItWorksStep[] = [
  {
    id: 'step-choose',
    image: '/images/ai-course/steps/step-1-choose.webp',
    emoji: '📋',
    num: '01',
    title: 'Обираєте задачу',
    description:
      'Документація, діагностика, протоколи, пояснення пацієнтам, лікування тощо — відкриваєте розділ, який потрібен саме зараз.',
  },
  {
    id: 'step-use',
    image: '/images/ai-course/steps/step-2-use.webp',
    emoji: '⚡',
    num: '02',
    title: 'Використовуєте готове рішення',
    description:
      'Покрокова інструкція для кожної задачі: який інструмент відкрити, що написати, куди підставити дані пацієнта. Не треба нічого вигадувати.',
  },
  {
    id: 'step-result',
    image: '/images/ai-course/steps/step-3-result.webp',
    emoji: '✅',
    num: '03',
    title: 'Отримуєте результат за хвилини',
    description:
      'Виписка, диференційний діагноз з джерелами, відповідь батькам пацієнта та інше — те, що раніше забирало годину. Ви перевіряєте і приймаєте рішення.',
  },
];

export const howItWorksFooter =
  'Онлайн-довідник + відео-інструкції + 10 готових ноутбуків з протоколами + Telegram підтримка';

// ── What's Inside ──

export interface WhatsInsideTask {
  id: string;
  image: string;
  task: string;
  result: string;
}

export const whatsInsideHeading = 'Що ви зможете одразу';

export const whatsInsideSubtitle = '';

export const whatsInsideTasks: WhatsInsideTask[] = [
  {
    id: 'task-diag',
    image: '/images/ai-course/whats-inside/diagnosis.webp',
    task: 'Правильні промпти для діагностики',
    result: 'Як отримати диференційний діагноз з посиланнями на джерела — а не загальні фрази',
  },
  {
    id: 'task-protocols',
    image: '/images/ai-course/whats-inside/protocols.webp',
    task: 'Робота з клінічними рекомендаціями',
    result: 'Як знайти актуальну рекомендацію МОЗ, CDC та інших доказових джерел через ШІ — за секунди',
  },
  {
    id: 'task-patients',
    image: '/images/ai-course/whats-inside/patients.webp',
    task: 'Відповіді на «ChatGPT сказав інше»',
    result: 'Як за 30 секунд дати пацієнту відповідь з посиланням на протокол',
  },
  {
    id: 'task-safety',
    image: '/images/ai-course/whats-inside/safety.webp',
    task: 'Перевірка джерел і уникнення галюцинацій',
    result: 'Як відрізнити реальне джерело від вигаданого — чеклісти для кожної відповіді ШІ',
  },
  {
    id: 'task-docs',
    image: '/images/ai-course/whats-inside/docs.webp',
    task: 'Підготовка медичної документації',
    result: 'Як отримати виписку за структурою вашої клініки — фінальне рішення завжди за вами',
  },
];

export const whatsInsideFormat = {
  line1: 'Онлайн-довідник + відео-інструкції + 10 готових ноутбуків з протоколами МОЗ + Telegram підтримка',
  line2: '',
};

// ── Before/After Example ──

export const beforeAfterExample = {
  heading: 'Один випадок. Два підходи.',
  scenario: 'Пацієнт 52 роки, біль у грудях, задишка, три хронічні діагнози. Потрібен диференційний діагноз.',
  before: {
    label: 'Без довідника',
    text: 'Відкриваєте протокол — 80 сторінок. Шукаєте потрібний розділ. Згадуєте, чи оновлювали його цього року. Перевіряєте взаємодії ліків окремо. Це — години.',
  },
  after: {
    label: 'З довідником',
    prompt: 'Відкриваєте рішення «Диференційний діагноз».\nВводите дані пацієнта в ChatGPT.\nЧерез 2 хвилини — структурований список із посиланнями на джерела.',
    result: 'Жодних налаштувань. Копіюєте дані пацієнта — отримуєте відповідь із джерелом. Навіть якщо ви ніколи не відкривали ChatGPT.',
  },
  footer: '',
};

// ── Workflow Examples (merged into Solution section) ──

export interface WorkflowExample {
  id: string;
  emoji: string;
  title: string;
  before: { label: string; barPercent: number };
  after: { label: string; barPercent: number };
  multiplier: string;
  detail: string;
}

export const workflowExamples: WorkflowExample[] = [
  {
    id: 'wf-1',
    emoji: '📋',
    title: 'Виписка пацієнта',
    before: { label: '40 хвилин ручного друку', barPercent: 85 },
    after: { label: '5 хвилин з ШІ', barPercent: 12 },
    multiplier: 'у 8× швидше',
    detail: 'Шаблон генерує виписку за структурою вашої клініки — вам лишається перевірити і підписати.',
  },
  {
    id: 'wf-2',
    emoji: '🔍',
    title: 'Друга думка при складному випадку',
    before: { label: 'Пошук у підручниках та дзвінки колегам — 30 хв', barPercent: 75 },
    after: { label: 'Диф. діагноз з джерелами за 2 хвилини', barPercent: 8 },
    multiplier: 'у 15× швидше',
    detail: 'Описуєте симптоми — отримуєте варіанти диф. діагнозу з посиланнями на протоколи. Ви перевіряєте і приймаєте рішення.',
  },
  {
    id: 'wf-3',
    emoji: '🛡️',
    title: 'Пацієнт із «діагнозом від ChatGPT»',
    before: { label: 'Спір на прийомі, пошук спростування — 15 хв', barPercent: 65 },
    after: { label: 'Відповідь з посиланням на протокол — 30 сек', barPercent: 5 },
    multiplier: 'миттєво',
    detail: 'Пацієнт каже "ChatGPT сказав інше" — ви за секунди знаходите підтвердження чи спростування з посиланням на клінічну настанову.',
  },
  {
    id: 'wf-4',
    emoji: '💊',
    title: 'Рідкісне призначення по протоколу',
    before: { label: 'Пошук дозування та схеми — 20-40 хв', barPercent: 70 },
    after: { label: 'Схема з дозуванням і джерелом — 1 хв', barPercent: 6 },
    multiplier: 'у 20× швидше',
    detail: 'Діагноз є, але схема лікування рідкісна. ШІ знаходить актуальний протокол з дозуванням і посиланням — ви перевіряєте.',
  },
  {
    id: 'wf-5',
    emoji: '📰',
    title: 'Моніторинг оновлень і новин',
    before: { label: 'Самостійно перевіряти джерела — годинами щотижня', barPercent: 80 },
    after: { label: 'ШІ збирає дайджест за вас — раз на тиждень', barPercent: 5 },
    multiplier: 'автоматично',
    detail: 'Нові протоколи, зміни в настановах, важливі публікації — ШІ моніторить джерела і готує стислий дайджест. Ви просто читаєте.',
  },
  {
    id: 'wf-6',
    emoji: '📅',
    title: 'Підготовка до планового прийому',
    before: { label: 'Перечитувати картку, згадувати історію — 10-15 хв', barPercent: 60 },
    after: { label: 'Стислий брифінг від ШІ — за 1 хвилину', barPercent: 5 },
    multiplier: 'у 10× швидше',
    detail: 'Завтра плановий прийом — ШІ готує коротке резюме: діагнози, призначення, на що звернути увагу. Ви приходите підготовленим.',
  },
];

export const workflowExamplesFooter =
  '...і ще рішення для комунікації з пацієнтами, пошуку evidence, наукових статей та безпеки даних.';

// ── Hero ──

export interface HeroBadge {
  icon: 'chart' | 'lightning' | 'flag' | 'users';
  text: string;
}

export const heroContent = {
  title: 'Впевнений діагноз —<br>навіть у складному випадку',
  subtitle:
    '17 готових рішень на основі протоколів МОЗ: відкрий потрібне рішення, введи дані пацієнта в ChatGPT — отримай відповідь із джерелом',
  sourceNote: '',
  productLine: 'ОНЛАЙН-ДОВІДНИК ВІД ЛІКАРЯ-ПРАКТИКА З 13+ РОКАМИ ДОСВІДУ',
  heroCta: 'Що всередині ↓',
  cta: 'Отримати довідник — 999 ₴',
  badges: [] as HeroBadge[],
};

// ── Pain Points ──

export const painPoints: PainPoint[] = [
  {
    id: 'pain-1',
    icon: 'alert',
    headline: 'П\'ять скарг одночасно — і думка: «Може, я щось пропустив?»',
    text: 'Дивитесь на аналізи — і не впевнені, що нічого не пропустили. Вечір, а в голові все ще той складний випадок.',
  },
  {
    id: 'pain-2',
    icon: 'brain',
    headline: 'Протокол оновили — а ви ще не бачили.',
    text: 'Виписка, яку треба було здати ще вчора. Настанови змінились — а ви дізнались постфактум.',
  },
  {
    id: 'pain-3',
    icon: 'users',
    headline: 'Колега каже: «Я запитав ChatGPT» — а ви ще не пробували.',
    text: 'Не знаєте, що відповісти. Не тому, що не знаєте медицину — а тому, що не було часу розібратись.',
  },
];

export const painAccent = {
  text: 'Це не про брак знань. Це про брак часу та інструментів, які дають відповідь одразу.',
  stat: 'Навіть якщо ви ніколи не відкривали ChatGPT — довідник проведе вас по кроках',
  cta: 'Отримати довідник — 999 ₴',
};

// ── Why Not Just ChatGPT ──

export interface WhyNotPoint {
  id: string;
  icon: 'zap' | 'shield' | 'target';
  title: string;
  text: string;
}

export const whyNotChatGptHeading = 'Чому не просто ChatGPT?';

export const whyNotChatGptPoints: WhyNotPoint[] = [
  {
    id: 'why-1',
    icon: 'target',
    title: 'ChatGPT не знає ваших протоколів',
    text: 'Ви питаєте про дозування — ChatGPT відповідає без настанов МОЗ, без PubMed, без віку пацієнта. Просто «в середньому». Щоб відповідь була точною — потрібен запит зі структурою і джерелами.',
  },
  {
    id: 'why-2',
    icon: 'shield',
    title: 'Він помиляється — і ви цього не бачите',
    text: 'ChatGPT впевнено називає дозування, вигадує джерела, посилається на скасовані протоколи. Виглядає переконливо — поки не перевірите. А перевірка займає стільки ж часу, скільки пошук без ШІ.',
  },
  {
    id: 'why-3',
    icon: 'zap',
    title: 'Правильно використовувати ШІ — це методологія',
    text: 'Який інструмент обрати? Як налаштувати пам\'ять? Як перевірити відповідь? Правильний промпт — лише частина. У довіднику — повна методологія: інструменти, налаштування, промпти, перевірка.',
  },
];

// ── Audience Personas ──

export interface Persona {
  id: string;
  emoji: string;
  image: string;
  heading: string;
  text: string;
}

export const personas: Persona[] = [
  {
    id: 'persona-young',
    emoji: '🩺',
    image: '/images/ai-course/personas/young-doctor.webp',
    heading: 'Молодий лікар — хочете впевненіше приймати рішення',
    text: 'Перший самостійний прийом, нечіткі симптоми — а спитати нікого. Довідник дає другу думку з джерелами.',
  },
  {
    id: 'persona-experienced',
    emoji: '📚',
    image: '/images/ai-course/personas/experienced-doctor.webp',
    heading: 'Досвідчений лікар — хочете працювати швидше',
    text: 'Не хочете витрачати години на пошук інформації в десятках PDF. ШІ знаходить потрібне за секунди.',
  },
  {
    id: 'persona-afterleave',
    emoji: '🔄',
    image: '/images/ai-course/personas/after-leave-doctor.webp',
    heading: 'Повернулись після декрету — треба наздогнати',
    text: 'Рекомендації змінились, з\'явились нові стандарти. Довідник допоможе закрити прогалини швидко.',
  },
  {
    id: 'persona-curious',
    emoji: '💡',
    image: '/images/ai-course/personas/curious-doctor.webp',
    heading: 'Хочете бути конкурентними в епоху ШІ',
    text: 'Питання не в тому, чи використовувати ШІ. Питання — чи будете ви використовувати його краще за інших.',
  },
];

// ── Author Trust (full section) ──

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

// Keep backward compat
export const instructors: Instructor[] = [mainInstructor];

export const authorTrustSubtitle = '';

export const authorTrustBadges = [
  'Створено лікарем-практиком',
  'Перевірено ШІ-інженером IBM',
  'Українською мовою',
];

// ── Social Proof (trust quotes from @medicalforua community) ──

export interface SocialProofQuote {
  id: string;
  text: string;
  author: string;
  role: string;
}

export const socialProofHeading = 'Перші відгуки колег';

export const socialProofQuotes: SocialProofQuote[] = [
  {
    id: 'sp-1',
    text: 'Раніше писала в ChatGPT «підбери антибіотик при отиті» — загальні фрази без джерел. Тут вставляю дані пацієнта — отримую варіанти з посиланнями на протоколи.',
    author: 'Олена К.',
    role: 'лікар-інтерн, сімейна медицина',
  },
  {
    id: 'sp-2',
    text: 'Перший самостійний прийом, нечіткі симптоми — ступор. Добре що це довідник, а не курс на 20 годин: відкрив, ввів симптоми, отримав три варіанти з поясненням. Як досвідчений колега поруч.',
    author: 'Андрій М.',
    role: 'лікар-інтерн, терапія',
  },
  {
    id: 'sp-3',
    text: 'Ледь не призначила те, що ChatGPT видав з неіснуючого джерела. Тепер є чеклісти «коли НЕ довіряти ШІ» — знаю, що перевіряти.',
    author: 'Марія Т.',
    role: 'лікар-інтерн, педіатрія',
  },
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

// ── What's Inside Overview (product explanation — after pain points) ──

export interface ProductFeature {
  id: string;
  emoji: string;
  title: string;
  text: string;
}

export const productOverviewContent = {
  heading: 'Це не промпти — це методологія',
  subtitle: 'Промпт без правильного інструменту і налаштування — як рецепт без кухні.',
  features: [
    {
      id: 'pf-tools',
      emoji: '🔧',
      title: 'Який інструмент для якої задачі',
      text: 'ChatGPT, Claude, Perplexity — що краще для діагностики, що для документації, що для пошуку протоколів.',
    },
    {
      id: 'pf-memory',
      emoji: '🧠',
      title: 'Налаштування пам\'яті та інструкцій',
      text: 'Як зробити, щоб ШІ знав вашу спеціальність, клініку та стандарти — і не вигадував.',
    },
    {
      id: 'pf-prompts',
      emoji: '💬',
      title: 'Готові промпти під клінічні задачі',
      text: 'Не загальні шаблони, а конкретні запити: дозування, диф. діагноз, виписка, відповідь пацієнту.',
    },
    {
      id: 'pf-check',
      emoji: '🛡️',
      title: 'Чеклісти перевірки',
      text: 'Коли довіряти відповіді ШІ, коли ні. Як розпізнати галюцинацію. Що перевірити перед призначенням.',
    },
    {
      id: 'pf-steps',
      emoji: '📋',
      title: 'Покрокові інструкції',
      text: 'Що відкрити, куди натиснути, що вставити — для кожної задачі. Жодних IT-навичок.',
    },
  ] as ProductFeature[],
  footer: 'Кожне рішення протестоване на реальних клінічних випадках сімейним лікарем із 13 роками практики.',
};

export const pricingContent = {
  sectionTitle: '999 ₴',
  timeSaving: '',
  urgency: '',
  price: '999 ₴',
  priceEuro: '~€24',
  subtitle: 'Одноразова покупка. Без підписок.',
  features: [
    'Готові рішення для щоденних задач — інструменти, промпти, налаштування',
    '10 готових ноутбуків з протоколами МОЗ та міжнародними гайдлайнами — просто відкрийте і працюйте',
    'Telegram бот-підтримка — не зрозуміли? напишіть, допоможемо',
    'Працює з безкоштовними ШІ-сервісами — без платних підписок',
    'Жодних IT-навичок — покрокові інструкції для кожної задачі',
    'Оновлення назавжди — нові рішення, інструменти та протоколи додаються автоматично',
  ],
  cta: 'Отримати довідник — 999 ₴',
  trustBadge: 'Створено лікарем з 13+ років практики',
  guarantee: 'Якщо довідник вам не підійде — повернемо гроші.',
};

// ── FAQ (merged with common doubts — shown under pricing) ──

export const courseFaqItems: FaqItem[] = [
  {
    id: 'cfaq-1',
    question: 'Це занадто технічне для мене — я не розбираюсь в IT',
    answer:
      'Ніяких IT-навичок. Кожне рішення — покрокова інструкція: який інструмент відкрити, що натиснути, що вставити. Як переслати повідомлення. Усе написано простою мовою, українською.',
  },
  {
    id: 'cfaq-2',
    question: 'А якщо ШІ помилиться — відповідаю ж я?',
    answer:
      'Саме тому кожне рішення має чеклист перевірки — що перевірити, на що звернути увагу, коли НЕ довіряти ШІ. Ви завжди контролюєте результат. ШІ — помічник, не заміна.',
  },
];

// ── Final CTA ──

export const finalCtaContent = {
  heading: 'Наступний складний пацієнт — вже з підтримкою.',
  subtext: 'Менше сумнівів. Більше впевненості. З першого дня.',
  cta: 'Отримати довідник — 999 ₴',
};

// ── Footer ──

export const courseFooterContent = {
  telegram: '@doctorpidnebesna',
  telegramUrl: 'https://t.me/doctorpidnebesna',
  siteUrl: 'https://doctorpidnebesna.com',
  copyright: `© ${new Date().getFullYear()} Др. Піднебесна`,
};

