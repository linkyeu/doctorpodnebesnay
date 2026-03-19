import { useScrollReveal } from '../../../hooks/useScrollReveal';
import styles from './TimeSavings.module.css';
import { workflowExamples } from '../../../data/ai-course';

export default function TimeSavings() {
  const sectionRef = useScrollReveal<HTMLElement>(0.1);

  return (
    <section ref={sectionRef} className={`${styles.section} reveal`}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Скільки часу ви заощадите</h2>
        <p className={styles.subtitle}>
          Реальні задачі — реальна різниця. Довідник замінює пошук і ручну роботу.
        </p>

        <div className={styles.grid}>
          {workflowExamples.slice(0, 4).map((wf) => (
            <div key={wf.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.emoji} aria-hidden="true">{wf.emoji}</span>
                <h3 className={styles.cardTitle}>{wf.title}</h3>
              </div>

              <div className={styles.bars}>
                <div className={styles.barRow}>
                  <div className={styles.barLabel}>{wf.before.label}</div>
                  <div className={styles.barTrack}>
                    <div
                      className={`${styles.bar} ${styles.barBefore}`}
                      style={{ width: `${wf.before.barPercent}%` }}
                    />
                  </div>
                </div>
                <div className={styles.barRow}>
                  <div className={styles.barLabel}>{wf.after.label}</div>
                  <div className={styles.barTrack}>
                    <div
                      className={`${styles.bar} ${styles.barAfter}`}
                      style={{ width: `${Math.max(wf.after.barPercent, 4)}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.multiplier}>{wf.multiplier}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
