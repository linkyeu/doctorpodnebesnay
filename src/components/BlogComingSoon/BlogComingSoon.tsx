import { TELEGRAM_CHANNEL } from '../../data/links';
import Footer from '../Footer/Footer';
import styles from './BlogComingSoon.module.css';

export default function BlogComingSoon() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <a href="/" className={styles.logo}>
          Др. Люба
        </a>
      </header>

      <main className={styles.main}>
        <span className={styles.illustration} aria-hidden="true">
          📚
        </span>
        <h1 className={styles.heading}>Блог скоро з'явиться</h1>
        <p className={styles.subtitle}>
          Доказові статті про здоров'я дітей вже готуються. А поки — корисний
          контент щодня у Telegram-каналі.
        </p>
        <div className={styles.actions}>
          <a href="/" className={styles.primaryCta}>
            Повернутися на головну
          </a>
          <a
            href={TELEGRAM_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.outlineCta}
          >
            Telegram-канал
            <span className="sr-only"> (відкриється в новій вкладці)</span>
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
