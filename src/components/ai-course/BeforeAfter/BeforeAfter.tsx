import { useScrollReveal } from '../../../hooks/useScrollReveal';
import styles from './BeforeAfter.module.css';
import { beforeAfterExample } from '../../../data/ai-course';

export default function BeforeAfter() {
  const sectionRef = useScrollReveal<HTMLElement>(0.1);

  return (
    <section ref={sectionRef} className={`${styles.section} reveal`}>
      <div className={styles.container}>
        <h2 className={styles.heading}>{beforeAfterExample.heading}</h2>
        <p className={styles.scenario}>{beforeAfterExample.scenario}</p>

        <div className={styles.columns}>
          {/* Before */}
          <div className={`${styles.column} ${styles.beforeCol}`}>
            <div className={styles.label}>
              <span className={styles.labelIcon} aria-hidden="true">&#10007;</span>
              {beforeAfterExample.before.label}
            </div>
            <p className={styles.colText}>{beforeAfterExample.before.text}</p>
            <p className={styles.time}>20 хвилин</p>
          </div>

          {/* After */}
          <div className={`${styles.column} ${styles.afterCol}`}>
            <div className={styles.label}>
              <span className={styles.labelIcon} aria-hidden="true">&#10003;</span>
              {beforeAfterExample.after.label}
            </div>

            {/* Show the actual prompt from the toolkit */}
            {beforeAfterExample.after.prompt && (
              <div className={styles.promptBlock}>
                <span className={styles.promptLabel}>Готовий запит з довідника:</span>
                <pre className={styles.prompt}>{beforeAfterExample.after.prompt}</pre>
              </div>
            )}

            <p className={styles.colText}>{beforeAfterExample.after.result}</p>
            <p className={styles.time}>3 хвилини</p>
          </div>
        </div>
      </div>
    </section>
  );
}
