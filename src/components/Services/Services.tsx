import { TELEGRAM_DM } from '../../data/links';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './Services.module.css';

const steps = [
  {
    number: 1,
    icon: '/images/services/step-1-describe.png',
    title: 'Опишіть ситуацію',
    description:
      'Напишіть у Telegram: симптоми, вік дитини, фото за потреби. Чим детальніше — тим точніша відповідь.',
  },
  {
    number: 2,
    icon: '/images/services/step-2-answer.png',
    title: 'Отримайте відповідь',
    description:
      'Лікар Піднебесна відповість розгорнутими рекомендаціями з поясненнями та посиланнями на протоколи.',
  },
  {
    number: 3,
    icon: '/images/services/step-3-followup.png',
    title: 'Уточнюйте далі',
    description:
      'Додаткові запитання в межах однієї теми — без обмежень. Поки не розберемося до кінця.',
  },
];

export default function Services() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className={styles.services} id="services">
      <div className={`${styles.container} reveal`} ref={ref}>
        <h2 className={styles.heading}>Консультація через Telegram</h2>
        <p className={styles.subtitle}>
          Сімейний лікар для всієї родини — консультації онлайн у текстовому форматі.
          Зручно, швидко, без черг.
        </p>

        <div className={styles.steps}>
          {steps.map((step) => (
            <div key={step.number} className={styles.stepCard}>
              <span className={styles.stepNumber}>{step.number}</span>
              <div className={styles.stepContent}>
                <div className={styles.iconWrapper}>
                  <img src={step.icon} alt="" aria-hidden="true" className={styles.stepIcon} />
                </div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
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
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className={styles.ctaIcon}
            >
              <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192L9.85 14.684l-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l2.845-13.776c.308-1.246-.476-1.812-1.268-1.337z" />
            </svg>
            <span className="sr-only"> (відкриється в новій вкладці)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
