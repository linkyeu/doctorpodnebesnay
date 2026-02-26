import styles from './CourseHero.module.css';
import { heroContent } from '../../../data/ai-course';

export default function CourseHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBackground}>
        <img
          src="/images/ai-course/hero-after.jpg"
          alt=""
          className={styles.heroImage}
          draggable={false}
        />
      </div>
      <div className={styles.heroOverlay} />

      <div className={styles.content}>
        <h1 className={styles.title}>{heroContent.title}</h1>
        <p className={styles.subtitle}>{heroContent.subtitle}</p>
        <div className={styles.ctaWrapper}>
          <a
            href="#pricing"
            className={styles.cta}
          >
            {heroContent.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
