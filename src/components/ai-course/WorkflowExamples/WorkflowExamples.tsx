import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { workflowExamples, workflowExamplesFooter } from '../../../data/ai-course';
import styles from './WorkflowExamples.module.css';

export default function WorkflowExamples() {
  const sectionRef = useScrollReveal<HTMLElement>(0.1);

  return (
    <section ref={sectionRef} className={`${styles.section} reveal`}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Як це виглядає на практиці</h2>
        <p className={styles.subtitle}>
          3 приклади з готових рішень — скопіювали, вставили, отримали результат
        </p>

        <div className={styles.grid}>
          {workflowExamples.map((wf, i) => (
            <div
              key={wf.id}
              className={styles.card}
              style={{ '--card-index': i } as React.CSSProperties}
            >
              <div className={styles.cardHeader}>
                <span className={styles.emoji} aria-hidden="true">{wf.emoji}</span>
                <h3 className={styles.cardTitle}>{wf.title}</h3>
              </div>

              <div className={styles.bars} aria-hidden="true">
                <div className={styles.barRow}>
                  <span className={styles.barLabelBefore}>ДО</span>
                  <div className={styles.barTrack}>
                    <div
                      className={`${styles.barFill} ${styles.barBefore}`}
                      style={{ '--bar-width': `${wf.before.barPercent}%` } as React.CSSProperties}
                    />
                  </div>
                </div>
                <p className={styles.barText}>{wf.before.label}</p>

                <div className={styles.barRow}>
                  <span className={styles.barLabelAfter}>ПІСЛЯ</span>
                  <div className={styles.barTrack}>
                    <div
                      className={`${styles.barFill} ${styles.barAfter}`}
                      style={{ '--bar-width': `${wf.after.barPercent}%` } as React.CSSProperties}
                    />
                  </div>
                </div>
                <p className={styles.barText}>{wf.after.label}</p>
              </div>

              <span className={styles.multiplier}>{wf.multiplier}</span>

              <p className={styles.detail}>{wf.detail}</p>
            </div>
          ))}
        </div>

        <p className={styles.footer}>{workflowExamplesFooter}</p>
      </div>
    </section>
  );
}
