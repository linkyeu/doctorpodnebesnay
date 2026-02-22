import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { personas } from '../../../data/ai-course';
import styles from './Personas.module.css';

export default function Personas() {
  const sectionRef = useScrollReveal<HTMLElement>(0.1);

  return (
    <section ref={sectionRef} className={`${styles.section} reveal`}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Це для вас, якщо…</h2>
        <div className={styles.grid}>
          {personas.map((p) => (
            <div key={p.id} className={styles.card}>
              <span className={styles.emoji} aria-hidden="true">{p.emoji}</span>
              <h3 className={styles.cardHeading}>{p.heading}</h3>
              <p className={styles.cardText}>{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
