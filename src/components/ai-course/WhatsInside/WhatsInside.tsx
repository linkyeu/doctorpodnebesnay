import styles from './WhatsInside.module.css';
import {
  whatsInsideCards,
  whatsInsideSubtitle,
  whatsInsideFooter,
  previewPages,
} from '../../../data/ai-course';
import type { WhatsInsideCard } from '../../../data/ai-course';

function CardIcon({ icon }: { icon: WhatsInsideCard['icon'] }) {
  const props = {
    width: 24,
    height: 24,
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
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
      </svg>
    );
  }
  if (icon === 'book-open') {
    return (
      <svg {...props}>
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
      </svg>
    );
  }
  if (icon === 'wallet') {
    return (
      <svg {...props}>
        <rect x="1" y="5" width="22" height="16" rx="2" />
        <path d="M1 10h22" />
        <circle cx="18" cy="15" r="1" fill="currentColor" />
      </svg>
    );
  }
  return null;
}

export default function WhatsInside() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Що всередині</h2>
        <p className={styles.subtitle}>{whatsInsideSubtitle}</p>

        {/* Value prop cards */}
        <div className={styles.cardsGrid}>
          {whatsInsideCards.map((card) => (
            <div key={card.id} className={styles.card}>
              <div className={styles.cardIcon}>
                <CardIcon icon={card.icon} />
              </div>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardText}>{card.description}</p>
            </div>
          ))}
        </div>

        {/* Preview pages — mini table of contents */}
        <div className={styles.preview}>
          <h3 className={styles.previewHeading}>Приклади розділів</h3>
          <div className={styles.previewList}>
            {previewPages.map((page) => (
              <div key={page.num} className={styles.previewItem}>
                <span className={styles.previewNum}>{page.num}</span>
                <div className={styles.previewContent}>
                  <span className={styles.previewTitle}>{page.title}</span>
                  <span className={styles.previewCategory}>{page.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Format footer */}
        <p className={styles.footer}>{whatsInsideFooter}</p>
      </div>
    </section>
  );
}
