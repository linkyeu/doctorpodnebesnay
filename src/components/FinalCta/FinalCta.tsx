import { TELEGRAM_DM } from '../../data/links';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './FinalCta.module.css';

export default function FinalCta() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className={styles.finalCta}>
      <div className={`${styles.container} reveal`} ref={ref}>
        <h2 className={styles.heading}>Залишились запитання?</h2>
        <p className={styles.subheading}>
          Напишіть — перша консультація починається зі знайомства та плану дій.
          Без зобов'язань.
        </p>
        <a
          href={TELEGRAM_DM}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta}
        >
          Написати в Telegram →
          <span className="sr-only"> (відкриється в новій вкладці)</span>
        </a>
        <p className={styles.note}>Відповідь зазвичай протягом 2-4 годин</p>
      </div>
    </section>
  );
}
