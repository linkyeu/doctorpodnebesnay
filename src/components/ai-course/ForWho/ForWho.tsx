import styles from './ForWho.module.css';
import { personaCards, forWhoDisclaimer } from '../../../data/ai-course';
import type { PersonaCard } from '../../../data/ai-course';

function PersonaIcon({ icon }: { icon: PersonaCard['icon'] }) {
  const props = {
    width: 32,
    height: 32,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
  };

  if (icon === 'stethoscope') {
    return (
      <svg {...props}>
        <path d="M4.8 2.65l-.6 3.45a4 4 0 0 0 1.98 4.17l.82.46a2 2 0 0 0 2 0l.82-.46A4 4 0 0 0 11.8 6.1l-.6-3.45" />
        <path d="M6 2h4" />
        <path d="M8 12v5a4 4 0 0 0 4 4h0a4 4 0 0 0 4-4v-1a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2" />
      </svg>
    );
  }
  if (icon === 'phone-question') {
    return (
      <svg {...props}>
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      </svg>
    );
  }
  // rocket
  return (
    <svg {...props}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

export default function ForWho() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Це для вас, якщо:</h2>
        <div className={styles.cards}>
          {personaCards.map((card) => (
            <div key={card.id} className={styles.card}>
              <div className={styles.iconWrapper}>
                <PersonaIcon icon={card.icon} />
              </div>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardText}>{card.description}</p>
            </div>
          ))}
        </div>
        <div className={styles.disclaimer}>
          {forWhoDisclaimer.map((line, i) => (
            <p key={i} className={styles.disclaimerLine}>
              {i === 0 && <span aria-hidden="true">&#10005; </span>}
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
