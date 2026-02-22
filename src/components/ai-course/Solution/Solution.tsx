import { useScrollReveal } from '../../../hooks/useScrollReveal';
import {
  whatsInsideCards,
  whatsInsideSubtitle,
  whatsInsideFooter,
  previewPages,
  workflowExamples,
  workflowExamplesFooter,
} from '../../../data/ai-course';
import type { WhatsInsideCard } from '../../../data/ai-course';
import styles from './Solution.module.css';

function FeatureIcon({ icon }: { icon: WhatsInsideCard['icon'] }) {
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
  return (
    <svg {...props}>
      <rect x="2" y="5" width="20" height="16" rx="2" />
      <path d="M2 10h20" />
      <path d="M6 5V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2" />
      <circle cx="16" cy="15" r="1" />
    </svg>
  );
}

export default function Solution() {
  const sectionRef = useScrollReveal<HTMLElement>(0.1);

  return (
    <section ref={sectionRef} className={`${styles.section} reveal`}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Ось як саме це працює</h2>
        <p className={styles.subtitle}>{whatsInsideSubtitle}</p>

        {/* Book mockup */}
        <div className={styles.bookWrapper}>
          <img
            src="/images/ai-course/book-cover.png"
            alt=""
            aria-hidden="true"
            className={styles.bookImage}
            loading="lazy"
          />
        </div>

        {/* Preview pages */}
        <div className={styles.previewPages}>
          <h3 className={styles.previewHeading}>Приклади рішень з книги:</h3>
          <div className={styles.previewGrid}>
            {previewPages.map((page) => (
              <div key={page.num} className={styles.previewPage}>
                <div className={styles.previewCategory}>{page.category}</div>
                <div className={styles.previewNum}>{page.num}</div>
                <div className={styles.previewTitle}>{page.title}</div>
                <div className={styles.previewBlur} aria-hidden="true">
                  <div className={styles.blurLine} style={{ width: '90%' }} />
                  <div className={styles.blurLine} style={{ width: '75%' }} />
                  <div className={styles.blurLine} style={{ width: '85%' }} />
                  <div className={styles.blurLine} style={{ width: '60%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature cards */}
        <div className={styles.featureCards}>
          {whatsInsideCards.map((card, i) => (
            <div
              key={card.id}
              className={styles.featureCard}
              style={{ '--card-index': i } as React.CSSProperties}
            >
              <div className={styles.featureIconWrapper}>
                <FeatureIcon icon={card.icon} />
              </div>
              <h3 className={styles.featureCardTitle}>{card.title}</h3>
              <p className={styles.featureCardText}>{card.description}</p>
            </div>
          ))}
        </div>

        <p className={styles.featureFooter}>{whatsInsideFooter}</p>

        {/* Workflow examples — dark sub-section */}
        <div className={styles.workflows}>
          <h3 className={styles.workflowHeading}>Результати на практиці</h3>
          <div className={styles.workflowGrid}>
            {workflowExamples.map((wf, i) => (
              <div
                key={wf.id}
                className={styles.workflowCard}
                style={{ '--card-index': i } as React.CSSProperties}
              >
                <div className={styles.workflowHeader}>
                  <span className={styles.emoji} aria-hidden="true">{wf.emoji}</span>
                  <h4 className={styles.workflowTitle}>{wf.title}</h4>
                </div>

                <div className={styles.bars} aria-hidden="true">
                  <div className={styles.barRow}>
                    <span className={styles.barLabelBefore}>ДО</span>
                    <div className={styles.barTrack}>
                      <div
                        className={`${styles.barFill} ${styles.barBefore}`}
                        style={{ '--bar-width': `${wf.before.barPercent}%` } as React.CSSProperties}
                      />
                    </div>
                  </div>
                  <p className={styles.barText}>{wf.before.label}</p>

                  <div className={styles.barRow}>
                    <span className={styles.barLabelAfter}>ПІСЛЯ</span>
                    <div className={styles.barTrack}>
                      <div
                        className={`${styles.barFill} ${styles.barAfter}`}
                        style={{ '--bar-width': `${wf.after.barPercent}%` } as React.CSSProperties}
                      />
                    </div>
                  </div>
                  <p className={styles.barText}>{wf.after.label}</p>
                </div>

                <span className={styles.multiplier}>{wf.multiplier}</span>
                <p className={styles.detail}>{wf.detail}</p>
              </div>
            ))}
          </div>
          <p className={styles.workflowFooter}>{workflowExamplesFooter}</p>
        </div>
      </div>
    </section>
  );
}
