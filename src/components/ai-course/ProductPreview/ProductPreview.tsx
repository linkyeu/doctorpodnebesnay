import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { workflowExamples } from '../../../data/ai-course';
import styles from './ProductPreview.module.css';

const showcaseItems = workflowExamples.slice(0, 4);

function TimeBar({ label, percent, variant }: { label: string; percent: number; variant: 'before' | 'after' }) {
  return (
    <div className={styles.timeRow}>
      <div
        className={`${styles.bar} ${styles[variant]}`}
        style={{ width: `${Math.max(percent, 8)}%` }}
      />
      <span className={styles.timeLabel}>{label}</span>
    </div>
  );
}

export default function ProductPreview() {
  const sectionRef = useScrollReveal<HTMLElement>(0.1);

  return (
    <section ref={sectionRef} className={`${styles.section} reveal`}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Результати на практиці</h2>
        <p className={styles.subheading}>
          Ось що змінюється, коли лікар використовує готові рішення замість «голого» ChatGPT.
        </p>

        <div className={styles.grid}>
          {showcaseItems.map((wf) => (
            <div key={wf.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.emoji}>{wf.emoji}</span>
                <h3 className={styles.cardTitle}>{wf.title}</h3>
              </div>

              <div className={styles.comparison}>
                <TimeBar label={wf.before.label} percent={wf.before.barPercent} variant="before" />
                <TimeBar label={wf.after.label} percent={wf.after.barPercent} variant="after" />
              </div>

              <div className={styles.multiplier}>{wf.multiplier}</div>
              <p className={styles.detail}>{wf.detail}</p>
            </div>
          ))}
        </div>

        <p className={styles.footer}>
          Копіюєте готовий текст → вставляєте в ChatGPT → отримуєте результат. Без IT-навичок.
        </p>
      </div>
    </section>
  );
}
