import { useEffect } from 'react';
import styles from './ToolkitPaymentFailedPage.module.css';

export default function ToolkitPaymentFailedPage() {
  useEffect(() => {
    document.title = 'Помилка оплати | Онлайн-довідник ШІ-інструментів для лікарів';

    let robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    const created = !robotsMeta;
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.name = 'robots';
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.content = 'noindex, nofollow';

    return () => {
      if (created && robotsMeta) robotsMeta.remove();
    };
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.meshBg} aria-hidden="true">
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.orb3} />
      </div>

      <div className={styles.card}>
        <div className={styles.iconCircle} aria-hidden="true">
          <svg
            className={styles.icon}
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>

        <h1 className={styles.heading}>Оплата не пройшла</h1>

        <p className={styles.text}>
          На жаль, оплату не було завершено. Кошти не списані з вашого рахунку.
        </p>

        <a href="/toolkit" className={styles.retryBtn}>
          Спробувати ще раз
        </a>

        <p className={styles.textMuted}>
          Якщо проблема повторюється — спробуйте іншу картку або напишіть нам у Telegram.
        </p>
      </div>

      <a href="/toolkit" className={styles.backLink}>
        ← Повернутися на сторінку продукту
      </a>
    </div>
  );
}
