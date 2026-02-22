import styles from './PainPoints.module.css';
import { painPoints, painAccent } from '../../../data/ai-course';
import type { PainPoint } from '../../../data/ai-course';

function PainIcon({ icon }: { icon: PainPoint['icon'] }) {
  const props = {
    width: 36,
    height: 36,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
  };

  if (icon === 'clock') {
    return (
      <svg {...props}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    );
  }
  if (icon === 'books') {
    return (
      <svg {...props}>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <line x1="8" y1="7" x2="16" y2="7" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </svg>
    );
  }
  if (icon === 'alert') {
    return (
      <svg {...props}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <circle cx="12" cy="15" r="0.5" fill="currentColor" />
      </svg>
    );
  }
  if (icon === 'users') {
    return (
      <svg {...props}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  }
  return null;
}

export default function PainPoints() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Знайоме?</h2>
        <div className={styles.stack}>
          {painPoints.map((point) => (
            <div key={point.id} className={styles.card}>
              <div className={styles.iconWrapper}>
                <PainIcon icon={point.icon} />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.headline}>{point.headline}</h3>
                <p className={styles.text}>{point.text}</p>
                {point.source && <cite className={styles.source}>{point.source}</cite>}
              </div>
            </div>
          ))}
        </div>
        <blockquote className={styles.accent}>
          <p className={styles.accentText}>{painAccent.text}</p>
          <p className={styles.accentStat}>{painAccent.stat}</p>
        </blockquote>
      </div>
    </section>
  );
}
