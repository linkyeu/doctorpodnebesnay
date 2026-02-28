import styles from './Pricing.module.css';
import {
  pricingContent,
  competitorPrices,
  TELEGRAM_PURCHASE_LINK,
} from '../../../data/ai-course';

export default function Pricing() {
  return (
    <section id="pricing" className={styles.section}>
      <div className={styles.dotGrid} aria-hidden="true" />
      <div className={styles.container}>
        {/* Section title */}
        <h2 className={styles.sectionTitle}>{pricingContent.sectionTitle}</h2>

        {/* Time saving reminder */}
        <p className={styles.timeSaving}>{pricingContent.timeSaving}</p>

        {/* Competitor price comparison */}
        <div className={styles.priceAnchor}>
          {competitorPrices.map((c, i) => (
            <div key={i} className={styles.competitorRow}>
              <span className={styles.competitorName}>{c.name}</span>
              <span className={styles.competitorPrice}>{c.price}</span>
            </div>
          ))}
          <div className={styles.divider} />
          <div className={styles.ourPriceRow}>
            <span className={styles.ourPriceName}>ШІ-помічник лікаря</span>
            <span className={styles.ourPrice}>{pricingContent.price}</span>
          </div>
        </div>

        {/* Pricing card */}
        <div className={styles.card}>
          <div className={styles.priceRow}>
            <span className={styles.price}>{pricingContent.price}</span>
          </div>
          <p className={styles.subtitle}>{pricingContent.subtitle}</p>
          <ul className={styles.features}>
            {pricingContent.features.map((f, i) => (
              <li key={i} className={styles.feature}>
                <span className={styles.featureCheck} aria-hidden="true">&#10003;</span>
                {f}
              </li>
            ))}
          </ul>
          {/* urgency text removed — no deadline set */}
          <a
            href={TELEGRAM_PURCHASE_LINK}
            className={styles.cta}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={styles.ctaIcon}>
              <path d="M21 3L1 11l7 2m13-10l-7 14-4-6m11-8l-13 10" />
            </svg>
            {pricingContent.cta}
          </a>

          {/* Trust badge */}
          <p className={styles.trustBadge}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={styles.trustIcon}>
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            {pricingContent.trustBadge}
          </p>
        </div>
      </div>
    </section>
  );
}
