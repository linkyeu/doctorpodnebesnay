import { useScrollReveal } from '../../../hooks/useScrollReveal';
import styles from './NotACourse.module.css';

export default function NotACourse() {
  const ref = useScrollReveal<HTMLElement>(0.2);

  return (
    <section ref={ref} className={`${styles.section} reveal`}>
      <div className={styles.inner}>
        <p className={styles.headline}>Це не курс</p>
        <p className={styles.statement}>
          Нема модулів, домашок і тижнів навчання.
          <br />
          Все адаптовано під щоденну практику лікаря —
          <br />
          <span className={styles.accent}>відкриваєш і одразу застосовуєш.</span>
        </p>
      </div>
    </section>
  );
}
