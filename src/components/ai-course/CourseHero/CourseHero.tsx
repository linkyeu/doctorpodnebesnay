import styles from './CourseHero.module.css';
import { heroContent, TELEGRAM_PURCHASE_LINK } from '../../../data/ai-course';

export default function CourseHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBackground}>
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet="/images/ai-course/hero-mobile.webp"
          />
          <img
            src="/images/ai-course/hero-desktop.webp"
            alt=""
            className={styles.heroImage}
            draggable={false}
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
        </picture>
      </div>
      <div className={styles.heroOverlay} />

      <div className={styles.content}>
        <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: heroContent.title }} />
        {heroContent.sourceNote && (
          <p className={styles.sourceNote}>{heroContent.sourceNote}</p>
        )}
        <p className={styles.subtitle} dangerouslySetInnerHTML={{ __html: heroContent.subtitle }} />
        {heroContent.productLine && (
          <p className={styles.productLine}>{heroContent.productLine}</p>
        )}
        <div className={styles.ctaWrapper}>
          <a
            href={TELEGRAM_PURCHASE_LINK}
            className={styles.cta}
          >
            {heroContent.cta}
          </a>
        </div>
        <p className={styles.trustLine}>Без підписок · Гарантія повернення</p>
      </div>
    </section>
  );
}
