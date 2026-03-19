import { useScrollReveal } from '../../../hooks/useScrollReveal';
import styles from './BeforeAfter.module.css';
import { beforeAfterExample, TELEGRAM_PURCHASE_LINK } from '../../../data/ai-course';

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
            <div className={styles.timeBlock}>
              <span className={styles.time}>{beforeAfterExample.before.time}</span>
              <span className={styles.confidence}>{beforeAfterExample.before.confidence}</span>
            </div>
          </div>

          {/* After */}
          <div className={`${styles.column} ${styles.afterCol}`}>
            <div className={styles.label}>
              <span className={styles.labelIcon} aria-hidden="true">&#10003;</span>
              {beforeAfterExample.after.label}
            </div>
            <p className={styles.colText}>{beforeAfterExample.after.text}</p>
            <div className={styles.timeBlock}>
              <span className={styles.time}>{beforeAfterExample.after.time}</span>
              <span className={styles.confidence}>{beforeAfterExample.after.confidence}</span>
            </div>
          </div>
        </div>

        {beforeAfterExample.footer && (
          <p className={styles.footer}>{beforeAfterExample.footer}</p>
        )}

        <div className={styles.ctaBlock}>
          <a href={TELEGRAM_PURCHASE_LINK} className={styles.cta}>
            {beforeAfterExample.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
