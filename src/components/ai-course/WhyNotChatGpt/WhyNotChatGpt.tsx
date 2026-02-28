import styles from './WhyNotChatGpt.module.css';
import { whyNotChatGptHeading, whyNotChatGptPoints } from '../../../data/ai-course';
import type { WhyNotPoint } from '../../../data/ai-course';

function PointIcon({ icon }: { icon: WhyNotPoint['icon'] }) {
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

  if (icon === 'target') {
    return (
      <svg {...props}>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    );
  }
  if (icon === 'shield') {
    return (
      <svg {...props}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    );
  }
  if (icon === 'zap') {
    return (
      <svg {...props}>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    );
  }
  return null;
}

export default function WhyNotChatGpt() {
  return (
    <section id="why-not-chatgpt" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>{whyNotChatGptHeading}</h2>
        <div className={styles.grid}>
          {whyNotChatGptPoints.map((point) => (
            <div key={point.id} className={styles.card}>
              <div className={styles.iconWrapper}>
                <PointIcon icon={point.icon} />
              </div>
              <h3 className={styles.title}>{point.title}</h3>
              <p className={styles.text}>{point.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
