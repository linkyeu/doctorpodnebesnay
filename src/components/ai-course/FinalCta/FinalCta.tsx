import styles from './FinalCta.module.css';
import { finalCtaContent, TELEGRAM_PURCHASE_LINK } from '../../../data/ai-course';

export default function CourseFinalCta() {
  return (
    <section className={styles.section}>
      <div className={styles.meshBg} aria-hidden="true">
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.orb3} />
      </div>
      <div className={styles.container}>
        <h2 className={styles.heading}>{finalCtaContent.heading}</h2>
        <p className={styles.subtext}>{finalCtaContent.subtext}</p>
        <a
          href={TELEGRAM_PURCHASE_LINK}
          className={styles.cta}
        >
          {finalCtaContent.cta}
        </a>
      </div>
    </section>
  );
}
