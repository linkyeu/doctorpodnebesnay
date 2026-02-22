import { useScrollReveal } from '../../../hooks/useScrollReveal';
import {
  whatsInsideCards,
  whatsInsideSubtitle,
  whatsInsideFooter,
} from '../../../data/ai-course';
import type { WhatsInsideCard } from '../../../data/ai-course';
import styles from './WhatsInside.module.css';

function FeatureIcon({ icon }: { icon: WhatsInsideCard['icon'] }) {
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

  if (icon === 'copy') {
    return (
      <svg {...props}>
        <rect x="9" y="9" width="13" height="13" rx="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
    );
  }
  if (icon === 'book-open') {
    return (
      <svg {...props}>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    );
  }
  // wallet
  return (
    <svg {...props}>
      <rect x="2" y="5" width="20" height="16" rx="2" />
      <path d="M2 10h20" />
      <path d="M6 5V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2" />
      <circle cx="16" cy="15" r="1" />
    </svg>
  );
}

export default function WhatsInside() {
  const sectionRef = useScrollReveal<HTMLElement>(0.1);

  return (
    <section ref={sectionRef} className={`${styles.section} reveal`}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Що всередині</h2>
        <p className={styles.subtitle}>{whatsInsideSubtitle}</p>

        <div className={styles.bookWrapper}>
          <img
            src="/images/ai-course/book-cover.png"
            alt=""
            aria-hidden="true"
            className={styles.bookImage}
            loading="lazy"
          />
        </div>

        <div className={styles.cards}>
          {whatsInsideCards.map((card, i) => (
            <div
              key={card.id}
              className={styles.card}
              style={{ '--card-index': i } as React.CSSProperties}
            >
              <div className={styles.iconWrapper}>
                <FeatureIcon icon={card.icon} />
              </div>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardText}>{card.description}</p>
            </div>
          ))}
        </div>

        <p className={styles.footer}>{whatsInsideFooter}</p>
      </div>
    </section>
  );
}
