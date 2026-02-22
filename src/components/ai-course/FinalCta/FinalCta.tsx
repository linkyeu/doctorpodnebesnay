import styles from './FinalCta.module.css';
import { finalCtaContent, TELEGRAM_PURCHASE_LINK } from '../../../data/ai-course';

export default function CourseFinalCta() {
  return (
    <section className={styles.section}>
      <div className={styles.bgImage} aria-hidden="true" />
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.container}>
        <h2 className={styles.heading}>{finalCtaContent.heading}</h2>
        <p className={styles.subtext}>{finalCtaContent.subtext}</p>
        <a
          href={TELEGRAM_PURCHASE_LINK}
          className={styles.cta}
          target="_blank"
          rel="noopener noreferrer"
        >
          {finalCtaContent.cta}
        </a>
        <p className={styles.ctaSubtext}>{finalCtaContent.ctaSubtext}</p>
      </div>
    </section>
  );
}
