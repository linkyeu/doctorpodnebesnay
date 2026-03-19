import { useScrollReveal } from '../../../hooks/useScrollReveal';
import styles from './DailyReality.module.css';
import { dailyRealityContent } from '../../../data/ai-course';

export default function DailyReality() {
  const sectionRef = useScrollReveal<HTMLElement>(0.1);
  const { before, after } = dailyRealityContent;

  return (
    <section ref={sectionRef} className={`${styles.section} reveal`}>
      <div className={styles.container}>
        <div className={styles.columns}>
          {/* Before — the grind */}
          <div className={`${styles.column} ${styles.beforeCol}`}>
            <h3 className={styles.colHeading}>{before.heading}</h3>
            <p className={styles.intro}>{before.intro}</p>
            <ul className={styles.dashList}>
              {before.tasks.map((task, i) => (
                <li key={i}>— {task}</li>
              ))}
            </ul>
            <p className={styles.repeat}>{before.repeat}</p>
            <p className={styles.afterWork}>{before.afterWork}</p>
            {before.punchline && <p className={styles.punchline}>{before.punchline}</p>}
          </div>

          {/* After — the solution */}
          <div className={`${styles.column} ${styles.afterCol}`}>
            <h3 className={styles.colHeading}>{after.heading}</h3>
            <p className={styles.intro}>{after.intro}</p>
            <ul className={styles.dashList}>
              {after.benefits.map((benefit, i) => (
                <li key={i}>— {benefit}</li>
              ))}
            </ul>
            <p className={styles.closing}>{after.closing}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
