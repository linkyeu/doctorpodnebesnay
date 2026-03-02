import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { mainInstructor, techAuthorLine } from '../../../data/ai-course';
import styles from './AuthorTrust.module.css';

export default function AuthorTrust() {
  const sectionRef = useScrollReveal<HTMLElement>(0.1);
  const inst = mainInstructor;

  return (
    <section ref={sectionRef} className={`${styles.section} reveal`}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Створено лікарем і ШІ-інженером — для лікарів</h2>

        <div className={styles.mainCard}>
          <div className={styles.photoWrapper}>
            {inst.photo ? (
              <img
                src={inst.photo}
                alt={inst.name}
                className={styles.photo}
                loading="lazy"
              />
            ) : (
              <div className={styles.initials}>{inst.initials}</div>
            )}
          </div>
          <h3 className={styles.name}>{inst.name}</h3>
          <p className={styles.title}>{inst.title}</p>
        </div>

        <p className={styles.techLine}>{techAuthorLine}</p>
      </div>
    </section>
  );
}
