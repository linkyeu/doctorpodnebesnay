import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { authorTrustHeading, authorTrustAuthors, authorTrustClosing } from '../../../data/ai-course';
import styles from './AuthorTrust.module.css';

export default function AuthorTrust() {
  const sectionRef = useScrollReveal<HTMLElement>(0.1);

  return (
    <section ref={sectionRef} className={`${styles.section} reveal`}>
      <div className={styles.container}>
        <h2 className={styles.heading}>{authorTrustHeading}</h2>

        <div className={styles.authorsGrid}>
          {authorTrustAuthors.map((author) => (
            <div key={author.id} className={styles.authorCard}>
              <div className={styles.photoWrapper}>
                {author.photo ? (
                  <img
                    src={author.photo}
                    alt={author.name}
                    className={styles.photo}
                    loading="lazy"
                  />
                ) : (
                  <div className={styles.initials}>{author.initials}</div>
                )}
              </div>
              <div className={styles.authorInfo}>
                <h3 className={styles.authorName}>{author.name}</h3>
                <span className={styles.authorRole}>{author.role}</span>
                <p className={styles.authorBio}>{author.bio}</p>
              </div>
            </div>
          ))}
        </div>

        <blockquote className={styles.closingBlock}>
          <p className={styles.closingText}>{authorTrustClosing}</p>
        </blockquote>
      </div>
    </section>
  );
}
