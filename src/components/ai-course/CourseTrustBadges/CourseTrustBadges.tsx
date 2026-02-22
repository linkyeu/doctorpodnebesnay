import styles from './CourseTrustBadges.module.css';
import { heroContent } from '../../../data/ai-course';
import type { HeroBadge } from '../../../data/ai-course';

function BadgeIcon({ icon }: { icon: HeroBadge['icon'] }) {
  if (icon === 'chart') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    );
  }
  if (icon === 'lightning') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    );
  }
  // flag
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="4" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <line x1="2" y1="11" x2="22" y2="11" stroke="currentColor" strokeWidth="1.5" />
      <rect x="2" y="4" width="20" height="7" rx="2" fill="#005BBB" opacity="0.6" />
      <rect x="2" y="11" width="20" height="7" rx="2" fill="#FFD500" opacity="0.6" />
    </svg>
  );
}

export default function CourseTrustBadges() {
  const items = [...heroContent.badges, ...heroContent.badges];

  return (
    <section className={styles.section}>
      <div className={styles.marquee}>
        <div className={styles.track}>
          {items.map((badge: HeroBadge, i: number) => (
            <span key={i} className={styles.item}>
              <span className={styles.icon}>
                <BadgeIcon icon={badge.icon} />
              </span>
              {badge.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
