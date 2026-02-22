import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { instructors, authorTrustSubtitle } from '../../../data/ai-course';
import styles from './AuthorTrust.module.css';

function SocialIcon({ platform }: { platform: string }) {
  const props = {
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
  };

  if (platform === 'telegram') {
    return (
      <svg {...props}>
        <path d="M21 3L1 11l7 2m13-10l-7 14-4-6m11-8l-13 10" />
      </svg>
    );
  }
  if (platform === 'instagram') {
    return (
      <svg {...props}>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (platform === 'linkedin') {
    return (
      <svg {...props}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    );
  }
  return null;
}

export default function AuthorTrust() {
  const sectionRef = useScrollReveal<HTMLElement>(0.1);

  return (
    <section ref={sectionRef} className={`${styles.section} reveal`}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Створено лікарем і ШІ-інженером — для лікарів</h2>
        <p className={styles.subtitle}>{authorTrustSubtitle}</p>

        <div className={styles.instructors}>
          {instructors.map((inst) => (
            <div key={inst.id} className={styles.card}>
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
              <div className={styles.info}>
                <h3 className={styles.name}>{inst.name}</h3>
                <p className={styles.title}>{inst.title}</p>
                <p className={styles.bio}>{inst.bio}</p>
                {inst.socialLinks && inst.socialLinks.length > 0 && (
                  <div className={styles.socials}>
                    {inst.socialLinks.map((link) => (
                      <a
                        key={link.platform}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                        aria-label={link.platform}
                      >
                        <SocialIcon platform={link.platform} />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
