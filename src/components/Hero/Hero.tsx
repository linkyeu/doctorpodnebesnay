import BotanicalDecor from '../BotanicalDecor/BotanicalDecor';
import styles from './Hero.module.css';

interface HeroProps {
  ctaUrl: string;
}

export default function Hero({ ctaUrl }: HeroProps) {
  return (
    <section className={styles.hero} id="hero">
      <BotanicalDecor
        variant="leaf-1"
        style={{ top: '10%', right: '5%', animationDelay: '0s' }}
      />
      <BotanicalDecor
        variant="leaf-2"
        style={{ bottom: '15%', left: '3%', animationDelay: '2s' }}
      />
      <BotanicalDecor
        variant="stem"
        style={{ top: '5%', left: '8%', animationDelay: '4s' }}
      />

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
          <span className="sr-only"> (відкриється в новій вкладці)</span>
        </a>

        <p className={styles.subtitle}>
          Перша консультація — знайомство та план дій
        </p>
      </div>
    </section>
  );
}
