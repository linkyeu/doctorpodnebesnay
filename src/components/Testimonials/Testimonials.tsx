import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    id: 1,
    quote:
      'Нарешті лікар, який пояснює зрозуміло і з посиланнями на дослідження. Др. Піднебесна — це спокій, якого так бракувало. Більше не гуглю симптоми о 3 ночі в паніці.',
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

export default function Testimonials() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className={styles.testimonials} id="testimonials">
      <div className={`${styles.container} reveal`} ref={ref}>
        <h2 className={styles.heading}>Що кажуть батьки</h2>

        <div className={styles.grid}>
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
