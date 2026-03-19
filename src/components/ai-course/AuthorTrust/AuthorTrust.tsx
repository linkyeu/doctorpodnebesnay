import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { authorTrustHeading, authorTrustAuthor, authorTrustTechBadge, authorTrustClosing } from '../../../data/ai-course';
import styles from './AuthorTrust.module.css';

export default function AuthorTrust() {
  const sectionRef = useScrollReveal<HTMLElement>(0.1);

  return (
    <section ref={sectionRef} className={`${styles.section} reveal`}>
      <div className={styles.container}>
        <h2 className={styles.heading}>{authorTrustHeading}</h2>

        <div className={styles.authorCard}>
          <div className={styles.photoWrapper}>
            {authorTrustAuthor.photo ? (
              <img
                src={authorTrustAuthor.photo}
                alt={authorTrustAuthor.name}
                className={styles.photo}
                loading="lazy"
              />
            ) : (
              <div className={styles.initials}>{authorTrustAuthor.initials}</div>
            )}
          </div>
          <div className={styles.authorInfo}>
            <h3 className={styles.authorName}>{authorTrustAuthor.name}</h3>
            <span className={styles.authorRole}>{authorTrustAuthor.role}</span>
            <p className={styles.authorBio}>{authorTrustAuthor.bio}</p>
            <span className={styles.techBadge}>{authorTrustTechBadge}</span>
          </div>
        </div>

        <blockquote className={styles.closingBlock}>
          <p className={styles.closingText}>{authorTrustClosing}</p>
        </blockquote>
      </div>
    </section>
  );
}
