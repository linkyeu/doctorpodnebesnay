import { useScrollReveal } from '../../../hooks/useScrollReveal';
import styles from './DailyReality.module.css';
import { dailyRealityContent } from '../../../data/ai-course';

export default function DailyReality() {
  const sectionRef = useScrollReveal<HTMLElement>(0.1);
  const { before, after } = dailyRealityContent;

  return (
    <section id="daily-reality" ref={sectionRef} className={`${styles.section} reveal`}>
      <div className={styles.split}>
          {/* Before — the grind */}
          <div className={`${styles.half} ${styles.before}`}>
            <div className={styles.content}>
              <span className={styles.tag}>Зараз</span>
              <h3 className={styles.heading}>{before.heading}</h3>
              <p className={styles.intro}>{before.intro}</p>
              <ul className={styles.list}>
                {before.tasks.map((task, i) => (
                  <li key={i}>{task}</li>
                ))}
              </ul>
              <p className={styles.bottom}>{before.repeat} {before.afterWork}</p>
            </div>
          </div>

          {/* After — the solution */}
          <div className={`${styles.half} ${styles.after}`}>
            <div className={styles.content}>
              <span className={styles.tag}>З ШІ-рішеннями</span>
              <h3 className={styles.heading}>{after.heading}</h3>
              <p className={styles.intro}>{after.intro}</p>
              <ul className={`${styles.list} ${styles.afterList}`}>
                {after.benefits.map((benefit, i) => (
                  <li key={i}>{benefit}</li>
                ))}
              </ul>
              {after.closing && <p className={styles.closing}>{after.closing}</p>}
            </div>
          </div>
      </div>
    </section>
  );
}
