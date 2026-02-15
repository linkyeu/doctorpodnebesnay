import GradientMesh from '../GradientMesh/GradientMesh';
import styles from './Hero.module.css';

interface HeroProps {
  ctaUrl: string;
}

export default function Hero({ ctaUrl }: HeroProps) {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.bgImage} aria-hidden="true" />
      <GradientMesh />

      <div className={styles.content}>
        <p className={styles.badge}>Сімейний лікар · 12 років досвіду</p>

        <h1 className={styles.headline}>
          Доказове
          <br />
          <span className={styles.accent}>батьківство</span>
          <br />
          без паніки
        </h1>

        <p className={styles.tagline}>
          Розвінчуємо міфи, спираємось на науку.
          <br />
          Від народження до школи — навігатор для свідомих батьків.
        </p>

        <a
          href={ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta}
        >
          Написати в Telegram
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className={styles.ctaIcon}
          >
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="sr-only"> (відкриється в новій вкладці)</span>
        </a>

        <p className={styles.subtitle}>
          Перша консультація — знайомство та план дій
        </p>
      </div>
    </section>
  );
}
