import { useState } from 'react';
import styles from './Credibility.module.css';
import { instructors, credibilitySubtitle } from '../../../data/ai-course';
import type { Instructor } from '../../../data/ai-course';

function InstructorPhoto({ instructor }: { instructor: Instructor }) {
  const [failed, setFailed] = useState(false);

  if (!instructor.photo || failed) {
    return (
      <div className={styles.photoWrapper}>
        <div className={styles.photo}>
          <span className={styles.initials}>{instructor.initials}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.photoWrapper}>
      <div className={styles.photoImg}>
        <img
          src={instructor.photo}
          alt={instructor.name}
          className={styles.avatar}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      </div>
    </div>
  );
}

function SocialIcon({ platform }: { platform: string }) {
  if (platform === 'instagram') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (platform === 'telegram') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 3L1 11l7 2m13-10l-7 14-4-6m11-8l-13 10" />
      </svg>
    );
  }
  if (platform === 'linkedin') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    );
  }
  return null;
}

export default function Credibility() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Хто це створив</h2>
        <div className={styles.cards}>
          {instructors.map((inst) => (
            <div key={inst.id} className={styles.card}>
              <InstructorPhoto instructor={inst} />
              <div className={styles.content}>
                <h3 className={styles.name}>{inst.name}</h3>
                <p className={styles.title}>{inst.title}</p>
                <p className={styles.bio}>{inst.bio}</p>
                {inst.socialLinks && inst.socialLinks.length > 0 && (
                  <div className={styles.socialLinks}>
                    {inst.socialLinks.map((link) => (
                      <a
                        key={link.platform}
                        href={link.url}
                        className={styles.socialLink}
                        target="_blank"
                        rel="noopener noreferrer"
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
        <p className={styles.subtitle}>{credibilitySubtitle}</p>
      </div>
    </section>
  );
}
