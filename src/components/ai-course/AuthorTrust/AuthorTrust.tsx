import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { mainInstructor, techAuthorLine, authorTrustBadges } from '../../../data/ai-course';
import styles from './AuthorTrust.module.css';

export default function AuthorTrust() {
  const sectionRef = useScrollReveal<HTMLElement>(0.1);
  const inst = mainInstructor;

  return (
    <section ref={sectionRef} className={`${styles.section} reveal`}>
      <div className={styles.container}>
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
          <div>
            <h2 className={styles.name}>{inst.name}</h2>
            <p className={styles.title}>{inst.title}</p>
            {authorTrustBadges.length > 0 && (
              <div className={styles.badges}>
                {authorTrustBadges.map((badge, i) => (
                  <span key={i} className={styles.badge}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M13 5L6 12 3 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    {badge}
                  </span>
                ))}
              </div>
            )}
            <p className={styles.techLine}>{techAuthorLine}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
