import { useScrollReveal } from '../../../hooks/useScrollReveal';
import styles from './WhatsInside.module.css';
import {
  whatsInsideHeading,
  whatsInsideSubheading,
  whatsInsideBlocks,
  whatsInsideFeatures,
  TELEGRAM_PURCHASE_LINK,
  pricingContent,
} from '../../../data/ai-course';

export default function WhatsInside() {
  const sectionRef = useScrollReveal<HTMLElement>(0.1);

  return (
    <section id="whats-inside" ref={sectionRef} className={`${styles.section} reveal`}>
      <div className={styles.container}>
        <h2 className={styles.heading}>{whatsInsideHeading}</h2>
        <p className={styles.subheading}>{whatsInsideSubheading}</p>

        {/* 4 content blocks */}
        <div className={styles.blocksGrid}>
          {whatsInsideBlocks.map((block) => (
            <div key={block.id} className={styles.block}>
              <div className={styles.blockHeader}>
                {block.icon && (
                  <img
                    src={block.icon}
                    alt=""
                    aria-hidden="true"
                    className={styles.blockIcon}
                    loading="lazy"
                  />
                )}
                <h3 className={styles.blockTitle}>{block.title}</h3>
              </div>
              <p className={styles.blockText}>{block.text}</p>
            </div>
          ))}
        </div>

        {/* Product video tour */}
        <div className={styles.videoWrapper}>
          <div className={styles.browserFrame}>
            <div className={styles.browserBar}>
              <div className={styles.browserDots}>
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.dot} />
              </div>
              <span className={styles.browserUrl}>doctorpidnebesna.com/toolkit</span>
            </div>
            <video
              className={styles.productVideo}
              autoPlay
              loop
              muted
              playsInline
              src="/videos/toolkit-tour.webm"
            />
          </div>
        </div>

        {/* Feature callouts */}
        <div className={styles.features}>
          {whatsInsideFeatures.map((feature, i) => (
            <div key={i} className={styles.featureCard}>
              <svg className={styles.featureIcon} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <circle cx="10" cy="10" r="10" fill="var(--color-cta)" opacity="0.12" />
                <path d="M6 10l3 3 5-5" stroke="var(--color-cta)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className={styles.featureText}>{feature}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={styles.ctaBlock}>
          <a href={TELEGRAM_PURCHASE_LINK} className={styles.cta}>
            {pricingContent.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
