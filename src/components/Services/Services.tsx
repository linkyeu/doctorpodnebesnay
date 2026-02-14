import { TELEGRAM_DM } from '../../data/links';
import styles from './Services.module.css';

const steps = [
  {
    number: 1,
    title: 'Опишіть ситуацію',
    description:
      'Напишіть у Telegram: симптоми, вік дитини, фото за потреби. Чим детальніше — тим точніша відповідь.',
  },
  {
    number: 2,
    title: 'Отримайте відповідь',
    description:
      'Др. Люба відповість розгорнутими рекомендаціями з поясненнями та посиланнями на протоколи.',
  },
  {
    number: 3,
    title: 'Уточнюйте далі',
    description:
      'Додаткові запитання в межах однієї теми — без обмежень. Поки не розберемося до кінця.',
  },
];

export default function Services() {
  return (
    <section className={styles.services} id="services">
      <div className={styles.container}>
        <h2 className={styles.heading}>Консультація через Telegram</h2>
        <p className={styles.subtitle}>
          Сімейний лікар для всієї родини — консультації онлайн у текстовому форматі.
          Зручно, швидко, без черг.
        </p>

        <div className={styles.steps}>
          {steps.map((step) => (
            <div key={step.number} className={styles.stepCard}>
              <span className={styles.stepNumber}>{step.number}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </div>
          ))}
        </div>

        <div className={styles.priceCard}>
          <p className={styles.price}>500 ₴ за консультацію</p>
          <p className={styles.priceNote}>
            Одна тема — одна консультація. Усі уточнення входять у вартість.
          </p>
          <a
            href={TELEGRAM_DM}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cta}
          >
            Написати в Telegram
            <span className="sr-only"> (відкриється в новій вкладці)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
