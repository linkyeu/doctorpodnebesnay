import styles from './CourseHero.module.css';
import { heroContent, TELEGRAM_PURCHASE_LINK } from '../../../data/ai-course';
import ParticleNetwork from './ParticleNetwork';

export default function CourseHero() {
  return (
    <section className={styles.hero}>
      <ParticleNetwork />
      <div className={styles.content}>
        <h1 className={styles.title}>{heroContent.title}</h1>
        <p className={styles.subtitle}>{heroContent.subtitle}</p>
        <div className={styles.ctaWrapper}>
          <a
            href={TELEGRAM_PURCHASE_LINK}
            className={styles.cta}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={styles.ctaIcon}>
              <path d="M21 3L1 11l7 2m13-10l-7 14-4-6m11-8l-13 10" />
            </svg>
            {heroContent.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
