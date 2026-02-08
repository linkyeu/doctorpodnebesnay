import type { Situation } from '../../types';
import styles from './SituationCard.module.css';

interface SituationCardProps {
  situation: Situation;
}

export default function SituationCard({ situation }: SituationCardProps) {
  return (
    <article className={styles.card}>
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.emoji} aria-hidden="true">
          {situation.emoji}
        </span>
        <h3 className={styles.title}>{situation.title}</h3>
      </div>

      {/* Myth section */}
      <div className={styles.myth}>
        <div className={styles.sectionLabel}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
            className={styles.icon}
          >
            <circle cx="10" cy="10" r="9" stroke="var(--color-myth-icon)" strokeWidth="1.5" />
            <path
              d="M7 7l6 6M13 7l-6 6"
              stroke="var(--color-myth-icon)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span className={styles.mythLabel}>Міф</span>
        </div>
        <blockquote className={styles.mythQuote}>
          {situation.myth}
        </blockquote>
        {situation.mythSource && (
          <p className={styles.mythSource}>{situation.mythSource}</p>
        )}
      </div>

      {/* Divider */}
      <div className={styles.divider}>
        <span className={styles.vs}>vs.</span>
      </div>

      {/* Science section */}
      <div className={styles.science}>
        <div className={styles.sectionLabel}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
            className={styles.icon}
          >
            <circle cx="10" cy="10" r="9" stroke="var(--color-science-icon)" strokeWidth="1.5" />
            <path
              d="M6 10l3 3 5-6"
              stroke="var(--color-science-icon)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className={styles.scienceLabel}>Наука</span>
        </div>
        <p className={styles.scienceText}>{situation.science}</p>
        <p className={styles.citation}>{situation.scienceSource}</p>
      </div>
    </article>
  );
}
