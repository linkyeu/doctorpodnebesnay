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
        <p className={styles.badge}>Лікар Любов Піднебесна · Сімейний лікар · 13 років досвіду</p>

        <h1 className={styles.headline}>
          Доказове{' '}
          <br />
          <span className={styles.accent}>батьківство</span>{' '}
          <br />
          без паніки
        </h1>

        <p className={styles.tagline}>
          Розвінчуємо міфи, спираємось на науку.
          <br />
          Від народження до школи — навігатор для свідомих батьків.
        </p>

        <p className={styles.subtitle}>
          🌍 Консультую українських батьків по всьому світу
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
            fill="currentColor"
            aria-hidden="true"
            className={styles.ctaIcon}
          >
            <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192L9.85 14.684l-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l2.845-13.776c.308-1.246-.476-1.812-1.268-1.337z" />
          </svg>
          <span className="sr-only"> (відкриється в новій вкладці)</span>
        </a>
      </div>
    </section>
  );
}
