import styles from './CourseHero.module.css';
import ParticleNetwork from './ParticleNetwork';
import { heroContent } from '../../../data/ai-course';

const trustItems = [
  { icon: '/images/ai-course/hero-badges/instant-access.png', label: 'Не курс — працює одразу' },
  { icon: '/images/ai-course/hero-badges/updates-forever.png', label: 'Оновлення назавжди' },
  { icon: '/images/ai-course/hero-badges/free-tools.png', label: 'Безкоштовні інструменти' },
];

export default function CourseHero() {
  const handleScrollToContent = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('whats-inside')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.hero}>
      {/* Dark medical still-life background */}
      <div className={styles.heroBackground}>
        <img
          src="/images/ai-course/hero-medical-bg.webp"
          alt=""
          className={`${styles.heroImage} ${styles.medicalBg}`}
          draggable={false}
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* AI particle network overlay */}
      <ParticleNetwork />

      {/* Gradient overlay for text readability */}
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
            href="#whats-inside"
            onClick={handleScrollToContent}
            className={styles.cta}
          >
            {heroContent.heroCta}
          </a>
        </div>
        <div className={styles.trustRow}>
          {trustItems.map((item) => (
            <div key={item.label} className={styles.trustItem}>
              <img src={item.icon} alt="" className={styles.trustIcon} aria-hidden="true" />
              <span className={styles.trustLabel}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
