import styles from './PainPoints.module.css';
import { painPoints, painAccent } from '../../../data/ai-course';
import type { PainPoint } from '../../../data/ai-course';

function PainIcon({ icon }: { icon: PainPoint['icon'] }) {
  const props = {
    width: 28,
    height: 28,
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
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    );
  }
  if (icon === 'users') {
    return (
      <svg {...props}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <line x1="9" y1="9" x2="15" y2="9" />
        <line x1="12" y1="6" x2="12" y2="12" />
      </svg>
    );
  }
  if (icon === 'search') {
    return (
      <svg {...props}>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </svg>
    );
  }
  if (icon === 'brain') {
    return (
      <svg {...props}>
        <path d="M9.5 2a5.5 5.5 0 0 0-4.17 9.08A6 6 0 0 0 4 15v1a2 2 0 0 0 2 2h1" />
        <path d="M14.5 2a5.5 5.5 0 0 1 4.17 9.08A6 6 0 0 1 20 15v1a2 2 0 0 1-2 2h-1" />
        <path d="M12 2v8" />
        <path d="M7 18v2a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2" />
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
        <div className={styles.grid}>
          {painPoints.map((point) => (
            <div key={point.id} className={styles.card}>
              <div className={styles.iconWrapper}>
                <PainIcon icon={point.icon} />
              </div>
              <h3 className={styles.headline}>{point.headline}</h3>
              <p className={styles.text}>{point.text}</p>
              {point.source && <cite className={styles.source}>{point.source}</cite>}
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
