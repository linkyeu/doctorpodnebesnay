import { useScrollReveal } from '../../../hooks/useScrollReveal';
import styles from './Pricing.module.css';
import {
  pricingContent,
  competitorPrices,
  TELEGRAM_PURCHASE_LINK,
} from '../../../data/ai-course';

export default function Pricing() {
  const sectionRef = useScrollReveal<HTMLElement>(0.1);

  return (
    <section id="pricing" ref={sectionRef} className={`${styles.section} reveal`}>
      <div className={styles.dotGrid} aria-hidden="true" />
      <div className={styles.container}>
        {/* Competitor price comparison */}
        <div className={styles.priceAnchor}>
          {competitorPrices.map((c, i) => (
            <div key={i} className={styles.competitorRow}>
              <span className={styles.competitorName}>{c.name}</span>
              <span className={styles.competitorPrice}>{c.price}</span>
            </div>
          ))}
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
          {/* CTA — second price mention */}
          <a
            href={TELEGRAM_PURCHASE_LINK}
            className={styles.cta}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={styles.ctaIcon}>
              <path d="M21 3L1 11l7 2m13-10l-7 14-4-6m11-8l-13 10" />
            </svg>
            {pricingContent.cta}
          </a>

          {/* Guarantee */}
          {pricingContent.guarantee && (
            <p className={styles.guarantee}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={styles.guaranteeIcon}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
              {pricingContent.guarantee}
            </p>
          )}

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
