import { useState } from 'react';
import styles from './Pricing.module.css';
import { pricingContent, courseFaqItems, TELEGRAM_PURCHASE_LINK } from '../../../data/ai-course';

export default function Pricing() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className={styles.section}>
      <div className={styles.dotGrid} aria-hidden="true" />
      <div className={styles.container}>
        <p className={styles.anchor}>{pricingContent.anchor}</p>

        {/* Pricing card */}
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
        </div>

        {/* FAQ accordion — directly below pricing */}
        <div className={styles.faqBlock}>
          <h3 className={styles.faqHeading}>Часті запитання</h3>
          <div className={styles.faqList}>
            {courseFaqItems.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div key={item.id} className={styles.faqItem}>
                  <button
                    className={styles.faqTrigger}
                    onClick={() => toggle(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${item.id}`}
                  >
                    <span className={styles.faqQuestion}>{item.question}</span>
                    <span
                      className={`${styles.faqIcon} ${isOpen ? styles.faqIconOpen : ''}`}
                      aria-hidden="true"
                    >
                      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                        <path
                          d="M10 4v12M4 10h12"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </button>
                  <div
                    id={`faq-panel-${item.id}`}
                    role="region"
                    className={`${styles.faqPanel} ${isOpen ? styles.faqPanelOpen : ''}`}
                  >
                    <div className={styles.faqPanelInner}>
                      <p className={styles.faqAnswer}>{item.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
