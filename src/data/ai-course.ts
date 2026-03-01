// Fake door test: CTA → thank you page (was Telegram link)
// Original: 'https://t.me/doctorpidnebesna?text=Хочу%20купити%20%D0%A8%D0%86-помічник%20лікаря'
export const TELEGRAM_PURCHASE_LINK = '/ai-course/thank-you';

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
  'Формат: PDF-довідник + відео-інструкції. Одноразова покупка — без підписок.';

// ── What's Inside ──

export interface WhatsInsideTask {
  id: string;
  image: string;
  task: string;
  result: string;
}

export const whatsInsideHeading = 'Що ви отримаєте';

export const whatsInsideSubtitle =
  'PDF-довідник з готовими рішеннями для щоденних задач лікаря. Інструменти, налаштування, промпти, чеклісти — все, щоб ШІ працював на вас, а не навпаки.';

export const whatsInsideTasks: WhatsInsideTask[] = [
  {
    id: 'task-diag',
    image: '/images/ai-course/whats-inside/diagnosis.webp',
    task: 'Складний діагноз',
    result: 'Друга думка з посиланнями на джерела',
  },
  {
    id: 'task-protocols',
    image: '/images/ai-course/whats-inside/protocols.webp',
    task: 'Дозування та протоколи',
    result: 'Актуальна настанова МОЗ за секунди',
  },
  {
    id: 'task-patients',
    image: '/images/ai-course/whats-inside/patients.webp',
    task: '«А ChatGPT сказав інше!»',
    result: 'Готова відповідь пацієнту з доказами',
  },
  {
    id: 'task-safety',
    image: '/images/ai-course/whats-inside/safety.webp',
    task: 'Перевірка відповіді ШІ',
    result: 'Чеклісти: коли довіряти, а коли — ні',
  },
  {
    id: 'task-docs',
    image: '/images/ai-course/whats-inside/docs.webp',
    task: 'Виписка пацієнта',
    result: 'Готовий текст за 5 хвилин замість 40',
  },
];

export const whatsInsideFormat = {
  line1: 'PDF-довідник + відео-інструкції',
  line2: 'ChatGPT, NotebookLM, Perplexity та інші · Одноразова покупка — без підписок',
};

// ── Before/After Example ──

export const beforeAfterExample = {
  heading: 'Як це виглядає на практиці',
  scenario: 'Позалікарняна пневмонія у дитини 4 роки, 16 кг. Яке дозування?',
  before: {
    label: 'Без довідника',
    text: 'Ви пишете в ChatGPT: «Яке дозування амоксициліну для дитини з пневмонією?» Отримуєте: «250 мг 3 рази на день». Без урахування ваги. Без джерела. Без альтернативи для алергіків. Ви гуглите, перераховуєте, сумніваєтесь — 20 хвилин.',
  },
  after: {
    label: 'З довідником',
    prompt: 'Ти — сімейний лікар. Підбери антибіотикотерапію.\nПацієнт: дитина, 4 роки, 16 кг.\nДіагноз: J18.9 — позалікарняна пневмонія, нетяжкий перебіг.\nАлергії: невідомо.\nДай: препарат першої лінії з дозуванням за вагою, альтернативу при алергії на пеніциліни, тривалість курсу.\nДжерела: настанова МОЗ або NICE guidelines.',
    result: 'ChatGPT видає дозування амоксициліну 50 мг/кг/добу (800 мг/добу, розділити на 2 прийоми) з посиланням на настанову МОЗ + альтернативу азитроміцином при алергії. Ви перевіряєте і призначаєте — 3 хвилини.',
  },
  footer: 'Кожне рішення у довіднику: конкретна задача → який інструмент використати → покрокова інструкція → результат з джерелами.',
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
  title: '66% лікарів вже використовують ШІ.<br>Ви — серед них?',
  subtitle:
    'Виписка — за 5 хвилин. Діагноз з джерелами — за 2.<br>Готові рішення для роботи з ШІ під щоденні задачі лікаря.<br>Інструменти, промпти, налаштування — все зібрано.',
  productLine: 'PDF-довідник + відео · 799 ₴ · одноразова покупка',
  cta: 'Отримати довідник — 799 ₴',
  badges: [] as HeroBadge[],
};

// ── Pain Points ──

export const painPoints: PainPoint[] = [
  {
    id: 'pain-1',
    icon: 'brain',
    headline: 'Знаєте діагноз — але перед пацієнтом ступор.',
    text: '6 років теорії — а реальний пацієнт не схожий на підручник. Нечіткі симптоми, тиск часу, наставника поруч нема. Знаєте, що ПОВИННО бути — але не знаєте, що РОБИТИ зараз.',
  },
  {
    id: 'pain-2',
    icon: 'alert',
    headline: 'Діагноз є — а в дозуванні не впевнені.',
    text: 'Сотні протоколів, оновлення щоквартально, взаємодія препаратів, дозування за вагою і віком. Одна помилка в призначенні — і наслідки одразу. А єдиного актуального довідника — нема.',
  },
  {
    id: 'pain-3',
    icon: 'users',
    headline: '«А ChatGPT сказав інше!» — чуєте це все частіше.',
    text: 'Пацієнти приходять з «діагнозами» від ChatGPT і вимагають пояснень. Без готової відповіді з посиланням на протокол — спір на прийомі забирає 15 хвилин.',
  },
  {
    id: 'pain-4',
    icon: 'search',
    headline: 'Що якщо ви просто НЕ ВПІЗНАЄТЕ рідкісний діагноз?',
    text: 'Хворобу Кавасакі ви бачили тільки в підручнику. Досвідчений лікар впізнає її за секунди — бо бачив 10 000 пацієнтів. Ви бачили 200. Один пропущений рідкісний діагноз — і ви будете прокручувати це в голові місяцями.',
  },
];

export const painAccent = {
  text: 'Ви не маєте часу розбиратись з ШІ — і не повинні.',
  stat: 'У довіднику — готові рішення під щоденні задачі лікаря: інструменти, промпти, налаштування. Відкрили — зробили по інструкції — отримали результат з джерелами.',
  cta: 'Отримати довідник — 799 ₴',
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
    heading: 'Молодий лікар без досвідченого наставника',
    text: 'Колеги теж початківці, спитати нікого. Страшно щось пропустити або призначити неправильно.',
  },
  {
    id: 'persona-experienced',
    emoji: '📚',
    image: '/images/ai-course/personas/experienced-doctor.webp',
    heading: 'Досвідчений лікар, який хоче йти в ногу з часом',
    text: 'Ви багато років у професії але молодші колеги вже використовують ШІ — і встигають більше.',
  },
  {
    id: 'persona-afterleave',
    emoji: '🔄',
    image: '/images/ai-course/personas/after-leave-doctor.webp',
    heading: 'Повернулись після декрету чи перерви',
    text: 'Протоколи змінились, з\'явились нові стандарти, а часу на «перечитати все» немає.',
  },
  {
    id: 'persona-curious',
    emoji: '💡',
    image: '/images/ai-course/personas/curious-doctor.webp',
    heading: 'Просто хочете працювати ефективніше з ШІ',
    text: 'Ви чули про ChatGPT, але не розумієте, як це застосувати в медицині безпечно.',
  },
];

// ── Author Trust (full section) ──

export const instructors: Instructor[] = [
  {
    id: 'luba',
    name: 'Др. Любов Піднебесна',
    title: 'Сімейний лікар · 13+ років практики · клініка «Добробут», Київ',
    bio: '10 000+ консультацій. Автор @medicalforua (24 000+ підписників). Щодня працює з тими ж протоколами і документацією, що й ви. Перевірила кожне рішення на реальних клінічних випадках.',
    initials: 'ЛП',
    photo: '/images/ai-course/instructor-luba.webp',
    socialLinks: [
      { platform: 'instagram', url: 'https://www.instagram.com/doctorpidnebesna' },
      { platform: 'telegram', url: 'https://t.me/medicalforua' },
    ],
  },
  {
    id: 'denys',
    name: 'Денис Філіппов',
    title: 'ШІ-інженер · 12+ років · IBM',
    bio: '12 років в IT, ШІ-інженер в IBM. Налаштував інструменти, написав інструкції та промпти так, щоб вам не потрібно розбиратись у технологіях — просто відкрити і зробити по кроках.',
    initials: 'ДФ',
    photo: '/images/ai-course/instructor-denys.webp',
    socialLinks: [
      { platform: 'linkedin', url: 'https://www.linkedin.com/in/denys-filippov/' },
    ],
  },
];

export const authorTrustSubtitle =
  'Лікар написала рішення під реальні клінічні задачі. Інженер підібрав інструменти і налаштував їх, щоб ШІ не вигадував.';

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

export const socialProofHeading = 'Чому 24 000 лікарів читають др. Піднебесну';

export const socialProofQuotes: SocialProofQuote[] = [
  {
    id: 'sp-1',
    text: 'Нарешті хтось пояснює протоколи зрозумілою мовою, а не бюрократичним текстом МОЗ.',
    author: 'Лікар-терапевт',
    role: 'підписниця @medicalforua',
  },
  {
    id: 'sp-2',
    text: 'Я завжди перевіряю нові призначення через канал Люби — довіряю її підходу до доказової медицини.',
    author: 'Сімейна лікарка',
    role: 'підписниця з 2024 року',
  },
  {
    id: 'sp-3',
    text: 'Після декрету саме цей канал допоміг мені швидко зорієнтуватись у нових протоколах.',
    author: 'Педіатр',
    role: 'підписниця @medicalforua',
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

// ── Baggage (lay out the objection before pricing) ──

export const baggageContent = {
  heading: '«Це ж просто набір промптів — я й сам можу»',
  text: 'Це не просто промпти. Це інструментарій: який ШІ-інструмент обрати для якої задачі (ChatGPT, NotebookLM, Perplexity), як налаштувати пам\'ять і загальну інструкцію щоб ШІ не галюцинував, як перевіряти відповіді через рефлексію — і так, готові промпти теж. Але промпт без правильного інструменту і налаштування — як рецепт без кухні. Кожне рішення протестоване на реальних клінічних випадках сімейним лікарем із 13 роками практики.',
};

export const pricingContent = {
  sectionTitle: 'Дешевше за одну консультацію',
  timeSaving: 'Диф. діагноз з джерелами — за 3 хвилини. Дозування по протоколу — за хвилину. Менше сумнівів — з першого дня.',
  urgency: '799₴ — вступна ціна до 2 березня. Потім — 1 299₴.',
  price: '799 ₴',
  priceEuro: '€19',
  subtitle: 'Одноразова покупка. Менше ніж одна консультація — а менше сумнівів з першого дня.',
  features: [
    'Готові рішення для щоденних задач — інструменти, промпти, налаштування',
    'Працює з безкоштовними сервісами — ChatGPT, NotebookLM, Perplexity',
    'Жодних IT-навичок — покрокові інструкції для кожної задачі',
    'Чеклісти безпеки — коли НЕ довіряти ШІ',
    'Оновлення — нові рішення на email безкоштовно',
  ],
  cta: 'Отримати довідник — 799 ₴',
  trustBadge: 'Створено лікарем з 13+ років практики та ШІ-інженером IBM',
  guarantee: 'Якщо довідник вам не підійде — повернемо гроші. Без питань.',
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
  {
    id: 'cfaq-4',
    question: 'Дані пацієнтів у ChatGPT — це безпечно?',
    answer:
      'В книзі є окрема інструкція з анонімізації даних: що можна вводити, що категорично ні. Чіткі правила — без ризику.',
  },
  {
    id: 'cfaq-5',
    question: 'Мені потрібна платна підписка на ШІ-сервіси?',
    answer:
      'Ні. Більшість рішень працюють з безкоштовними інструментами — ChatGPT, NotebookLM, Perplexity. Ми показуємо різні варіанти для кожної задачі — ви обираєте що підходить.',
  },
  {
    id: 'cfaq-6',
    question: 'Це підійде для моєї спеціальності?',
    answer:
      'Так. Рішення універсальні — документація, діагностика, пошук протоколів, комунікація з пацієнтами. Працюють для будь-якої спеціальності.',
  },
];

// ── Final CTA ──

export const finalCtaContent = {
  heading: 'Наступний складний пацієнт — вже з підтримкою.',
  subtext: 'Менше сумнівів. Більше впевненості. З першого дня.',
  cta: 'Отримати довідник — 799 ₴',
};

// ── Footer ──

export const courseFooterContent = {
  telegram: '@doctorpidnebesna',
  telegramUrl: 'https://t.me/doctorpidnebesna',
  siteUrl: 'https://doctorpidnebesna.com',
  copyright: `© ${new Date().getFullYear()} Др. Піднебесна`,
};

