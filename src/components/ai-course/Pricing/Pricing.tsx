import { useScrollReveal } from '../../../hooks/useScrollReveal';
import styles from './Pricing.module.css';
import {
  pricingContent,
  TELEGRAM_PURCHASE_LINK,
} from '../../../data/ai-course';

export default function Pricing() {
  const sectionRef = useScrollReveal<HTMLElement>(0.1);

  return (
    <section id="pricing" ref={sectionRef} className={`${styles.section} reveal`}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>{pricingContent.sectionTitle}</h2>

        {/* Pricing card */}
        <div className={styles.card}>
          {/* Big price */}
          <div className={styles.priceBlock}>
            <span className={styles.price}>{pricingContent.price}</span>
            <span className={styles.priceAnchor}>{pricingContent.priceAnchor}</span>
          </div>

          {/* Features — visually prominent */}
          <div className={styles.features}>
            {pricingContent.features.map((f, i) => {
              const isHighlight = pricingContent.highlightFeatures.includes(i);
              return (
                <div
                  key={i}
                  className={`${styles.feature} ${isHighlight ? styles.featureHighlight : ''}`}
                >
                  <svg className={styles.featureCheck} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <circle cx="10" cy="10" r="10" fill="var(--color-cta)" opacity="0.12" />
                    <path d="M6 10l3 3 5-5" stroke="var(--color-cta)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className={styles.featureText}>{f}</span>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <a href={TELEGRAM_PURCHASE_LINK} className={styles.cta}>
            {pricingContent.cta}
          </a>

          {/* Guarantee */}
          <div className={styles.guarantee}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={styles.guaranteeIcon}>
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
            <span>{pricingContent.guarantee}</span>
          </div>
        </div>

      </div>
    </section>
  );
}
