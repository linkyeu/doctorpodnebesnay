import styles from './Pricing.module.css';
import { pricingContent, TELEGRAM_PURCHASE_LINK } from '../../../data/ai-course';

export default function Pricing() {
  return (
    <section className={styles.section}>
      <div className={styles.dotGrid} aria-hidden="true" />
      <div className={styles.container}>
        <p className={styles.anchor}>{pricingContent.anchor}</p>
        <div className={styles.card}>
          <div className={styles.priceRow}>
            <span className={styles.price}>{pricingContent.price}</span>
            <span className={styles.priceEuro}>{pricingContent.priceEuro}</span>
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
          <p className={styles.urgency}>{pricingContent.urgency}</p>
          <a
            href={TELEGRAM_PURCHASE_LINK}
            className={styles.cta}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={styles.ctaIcon}>
              <path d="M21 3L1 11l7 2m13-10l-7 14-4-6m11-8l-13 10" />
            </svg>
            {pricingContent.cta}
          </a>
          <p className={styles.ctaSubtext}>{pricingContent.ctaSubtext}</p>
        </div>
        <p className={styles.guarantee}>
          <span className={styles.guaranteeCheck} aria-hidden="true">&#10003;</span>
          {pricingContent.guarantee}
        </p>
      </div>
    </section>
  );
}
