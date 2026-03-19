import { useScrollReveal } from '../../../hooks/useScrollReveal';
import styles from './PainPoints.module.css';
import { painPoints, painAccent, painPointsHeading } from '../../../data/ai-course';

export default function PainPoints() {
  const sectionRef = useScrollReveal<HTMLElement>(0.1);

  return (
    <section ref={sectionRef} className={`${styles.section} reveal`}>
      <div className={styles.container}>
        <h2 className={styles.heading}>{painPointsHeading}</h2>

        <div className={styles.grid}>
          {painPoints.map((point, index) => (
            <div key={point.id} className={styles.card}>
              <span className={styles.cardNumber}>{String(index + 1).padStart(2, '0')}</span>
              <h3 className={styles.headline}>{point.headline}</h3>
              <p className={styles.text}>{point.text}</p>
            </div>
          ))}
        </div>

        <blockquote className={styles.accent}>
          <div className={styles.accentBar} aria-hidden="true" />
          <p className={styles.accentText}>{painAccent.text}</p>
        </blockquote>
      </div>
    </section>
  );
}
