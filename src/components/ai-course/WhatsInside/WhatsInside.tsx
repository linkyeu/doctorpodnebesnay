import styles from './WhatsInside.module.css';
import {
  whatsInsideHeading,
  whatsInsideSubtitle,
  whatsInsideTasks,
  whatsInsideFormat,
} from '../../../data/ai-course';

export default function WhatsInside() {
  return (
    <section id="whats-inside" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>{whatsInsideHeading}</h2>
        <p className={styles.subtitle}>{whatsInsideSubtitle}</p>

        {/* Task → Result list */}
        <div className={styles.taskList}>
          {whatsInsideTasks.map((t) => (
            <div key={t.id} className={styles.taskRow}>
              <span className={styles.taskEmoji} aria-hidden="true">
                {t.emoji}
              </span>
              <div className={styles.taskContent}>
                <span className={styles.taskName}>{t.task}</span>
                <span className={styles.taskArrow} aria-hidden="true">→</span>
                <span className={styles.taskResult}>{t.result}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Format badge */}
        <div className={styles.formatBadge}>
          <p className={styles.formatMain}>{whatsInsideFormat.line1}</p>
          <p className={styles.formatSub}>{whatsInsideFormat.line2}</p>
        </div>
      </div>
    </section>
  );
}
