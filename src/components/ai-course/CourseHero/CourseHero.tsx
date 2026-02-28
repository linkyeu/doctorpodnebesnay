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
        <img
          src="/images/ai-course/hero-after.webp"
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
