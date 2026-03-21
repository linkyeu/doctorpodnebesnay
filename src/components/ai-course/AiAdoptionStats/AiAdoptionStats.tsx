import { aiAdoptionStats } from '../../../data/ai-course';
import styles from './AiAdoptionStats.module.css';

export default function AiAdoptionStats() {
  const { mainValue, mainLabel, context, source } = aiAdoptionStats;

  return (
    <section className={styles.section} aria-label="AI adoption statistics">
      <div className={styles.container}>
        <div className={styles.card}>
          <span className={styles.value}>{mainValue}</span>
          <p className={styles.label}>{mainLabel}</p>
          <p className={styles.context}>{context}</p>
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.source}
          >
            {source.org} — {source.detail}&nbsp;↗
          </a>
        </div>
      </div>
    </section>
  );
}
