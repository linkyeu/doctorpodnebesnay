import styles from './CourseHero.module.css';
import { heroContent } from '../../../data/ai-course';

export default function CourseHero() {
  const scrollToDetails = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById('why-not-chatgpt')?.scrollIntoView({ behavior: 'smooth' });
  };

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
          />
        </picture>
      </div>
      <div className={styles.heroOverlay} />

      <div className={styles.content}>
        <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: heroContent.title }} />
        <p className={styles.subtitle}>{heroContent.subtitle}</p>
        <div className={styles.ctaWrapper}>
          <a
            href="#why-not-chatgpt"
            onClick={scrollToDetails}
            className={styles.cta}
          >
            {heroContent.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
