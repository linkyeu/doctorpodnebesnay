import styles from './WhatsInside.module.css';
import {
  whatsInsideHeading,
  whatsInsideTasks,
  heroContent,
  TELEGRAM_PURCHASE_LINK,
} from '../../../data/ai-course';

export default function WhatsInside() {
  return (
    <section id="whats-inside" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>{whatsInsideHeading}</h2>

        {/* Task cards */}
        <div className={styles.taskGrid}>
          {whatsInsideTasks.map((t) => (
            <div key={t.id} className={styles.taskCard}>
              <div className={styles.taskIcon}>
                <img
                  src={t.image}
                  alt=""
                  aria-hidden="true"
                  className={styles.taskImage}
                  loading="lazy"
                />
              </div>
              <div className={styles.taskBody}>
                <span className={styles.taskName}>{t.task}</span>
                <span className={styles.taskResult}>{t.result}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA after value demonstration */}
        <div className={styles.ctaBlock}>
          <a href={TELEGRAM_PURCHASE_LINK} className={styles.cta}>
            {heroContent.cta}
          </a>
          <p className={styles.trustLine}>Без підписок · Гарантія повернення</p>
        </div>
      </div>
    </section>
  );
}
