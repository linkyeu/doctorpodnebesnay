import styles from './BeforeAfter.module.css';
import { beforeAfterExample } from '../../../data/ai-course';

export default function BeforeAfter() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>{beforeAfterExample.heading}</h2>
        <p className={styles.scenario}>{beforeAfterExample.scenario}</p>

        <div className={styles.columns}>
          {/* Before */}
          <div className={`${styles.column} ${styles.beforeCol}`}>
            <div className={styles.label}>
              <span className={styles.labelIcon} aria-hidden="true">✗</span>
              {beforeAfterExample.before.label}
            </div>
            <p className={styles.colText}>{beforeAfterExample.before.text}</p>
            <p className={styles.time}>20 хвилин</p>
          </div>

          {/* After */}
          <div className={`${styles.column} ${styles.afterCol}`}>
            <div className={styles.label}>
              <span className={styles.labelIcon} aria-hidden="true">✓</span>
              {beforeAfterExample.after.label}
            </div>
            <p className={styles.colText}>{beforeAfterExample.after.result}</p>
            <p className={styles.time}>3 хвилини</p>
          </div>
        </div>
      </div>
    </section>
  );
}
