import { TELEGRAM_CHANNEL } from '../../data/links';
import { useCountUp } from '../../hooks/useCountUp';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './SocialProof.module.css';

const testimonials = [
  {
    id: 1,
    quote:
      'Нарешті лікар, який пояснює зрозуміло і з посиланнями на дослідження. Більше не гуглю симптоми о 3 ночі в паніці.',
    author: 'Оксана',
    description: 'мама хлопчика, 2 роки',
  },
  {
    id: 2,
    quote:
      'Одна консультація зекономила нам купу нервів і грошей на непотрібні аналізи. Все чітко, по суті, без залякування.',
    author: 'Марина',
    description: 'мама дівчинки, 8 місяців',
  },
  {
    id: 3,
    quote:
      'Підписалась на канал ще до вагітності. Тепер із кожним питанням — одразу до Люби. Спокій, якого так бракувало.',
    author: 'Катерина',
    description: 'мама двох дітей',
  },
];

export default function SocialProof() {
  const { count, ref: counterRef } = useCountUp(30000);
  const testimonialsRef = useScrollReveal<HTMLDivElement>();

  return (
    <section className={styles.socialProof} id="community">
      <div className={styles.container}>
        <div className={styles.stat} ref={counterRef}>
          <p className={styles.number}>{count.toLocaleString('uk-UA')}+</p>
          <p className={styles.label}>батьків у Telegram-спільноті</p>
          <p className={styles.description}>
            Щодня — доказові пости про здоров'я дітей, розбори випадків та
            відповіді на запитання підписників.
          </p>
          <a
            href={TELEGRAM_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.channelCta}
          >
            Приєднатися до каналу
            <span className="sr-only"> (відкриється в новій вкладці)</span>
          </a>
        </div>

        <div className={`${styles.testimonials} reveal`} ref={testimonialsRef}>
          {testimonials.map((t) => (
            <blockquote key={t.id} className={styles.card}>
              <span className={styles.quote} aria-hidden="true">&ldquo;</span>
              <p className={styles.text}>{t.quote}</p>
              <footer className={styles.author}>
                <strong>{t.author}</strong>, {t.description}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
