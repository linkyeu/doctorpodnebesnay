import { useEffect } from 'react';
import styles from './ToolkitThankYouPage.module.css';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function ToolkitThankYouPage() {
  useEffect(() => {
    window.gtag?.('event', 'purchase', {
      event_category: 'conversion',
      event_label: 'ai_toolkit_payment_success',
      value: 799,
      currency: 'UAH',
    });
  }, []);

  useEffect(() => {
    document.title = 'Оплата успішна! | AI-інструменти для лікарів';

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Дякуємо за покупку AI-інструментів для лікарів.');
    }

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
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className={styles.heading}>Оплата успішна!</h1>

        <p className={styles.text}>
          Дякуємо за покупку <strong>AI-інструментів для лікарів</strong>.
          Довідник буде надіслано на вашу пошту протягом кількох хвилин.
        </p>

        <p className={styles.textMuted}>
          Якщо лист не прийшов — перевірте папку «Спам» або напишіть нам у Telegram.
        </p>
      </div>

      <a href="/toolkit" className={styles.backLink}>
        ← Повернутися на сторінку продукту
      </a>
    </div>
  );
}
