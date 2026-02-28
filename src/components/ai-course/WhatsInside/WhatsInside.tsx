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

        {/* Format badge */}
        <div className={styles.formatBadge}>
          <div className={styles.formatIcons} aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
            <span>+</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="23 7 16 12 23 17 23 7" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
          </div>
          <p className={styles.formatMain}>{whatsInsideFormat.line1}</p>
          <p className={styles.formatSub}>{whatsInsideFormat.line2}</p>
        </div>
      </div>
    </section>
  );
}
