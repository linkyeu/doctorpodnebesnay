import styles from './CourseHero.module.css';
import ParticleNetwork from './ParticleNetwork';
import { heroContent } from '../../../data/ai-course';

const trustIcons: Record<string, React.ReactNode> = {
  zap: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
  ),
  stethoscope: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.8 2.62a2 2 0 0 0-1.27 2.1L4.7 14a5.36 5.36 0 0 0 5.3 4.6 5.36 5.36 0 0 0 5.3-4.6l1.17-9.28a2 2 0 0 0-1.27-2.1" /><path d="M3 7h4" /><path d="M17 7h4" /><circle cx="18" cy="18" r="3" /><path d="M15.4 14.53a5.34 5.34 0 0 0 4.53 2.23" /></svg>
  ),
  send: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
  ),
};

const trustItems = [
  { icon: 'zap', label: 'Онлайн-довідник — працює одразу' },
  { icon: 'stethoscope', label: 'Від лікаря для лікарів' },
  { icon: 'send', label: 'Підтримка в Telegram' },
];

export default function CourseHero() {
  const handleScrollToContent = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('daily-reality')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.hero}>
      {/* Dark medical still-life background */}
      <div className={styles.heroBackground}>
        <img
          src="/images/ai-course/hero-medical-bg-1920w.webp"
          srcSet="/images/ai-course/hero-medical-bg-640w.webp 640w, /images/ai-course/hero-medical-bg-1024w.webp 1024w, /images/ai-course/hero-medical-bg-1920w.webp 1920w"
          sizes="100vw"
          alt=""
          className={`${styles.heroImage} ${styles.medicalBg}`}
          draggable={false}
          fetchPriority="high"
          loading="eager"
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
        <div className={styles.ctaWrapper}>
          <a
            href="#daily-reality"
            onClick={handleScrollToContent}
            className={styles.cta}
          >
            {heroContent.heroCta}
          </a>
        </div>
        <div className={styles.trustRow}>
          {trustItems.map((item) => (
            <div key={item.label} className={styles.trustItem}>
              <span className={styles.trustIcon} aria-hidden="true">{trustIcons[item.icon]}</span>
              <span className={styles.trustLabel}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
