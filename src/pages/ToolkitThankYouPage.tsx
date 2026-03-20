import { useEffect } from 'react';
import styles from './ToolkitThankYouPage.module.css';
import { trackPurchase } from '../utils/analytics';

export default function ToolkitThankYouPage() {
  useEffect(() => {
    trackPurchase();
  }, []);

  useEffect(() => {
    document.title = 'Оплата успішна! | Онлайн-довідник ШІ-інструментів для лікарів';

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Дякуємо за покупку онлайн-довідника ШІ-інструментів для лікарів.');
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
          Дякуємо за покупку <strong>онлайн-довідника ШІ-інструментів для лікарів</strong>.
        </p>

        <div className={styles.accessBlock}>
          <div className={styles.emailIconWrap} aria-hidden="true">
            <svg className={styles.emailIcon} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>
          <p className={styles.emailNote}>
            Пароль для доступу надіслано на вашу <strong>електронну пошту</strong>.
          </p>
          <p className={styles.emailHint}>
            Перевірте вхідні — лист прийде протягом кількох хвилин. Якщо не бачите — загляньте у «Спам».
          </p>
          <a href="/toolkit" className={styles.accessBtn}>
            Відкрити довідник →
          </a>
        </div>

        <p className={styles.textMuted}>
          Не отримали лист?{' '}
          <a href="https://t.me/ai_toolkit_support_bot" className={styles.supportLink} target="_blank" rel="noopener noreferrer">
            Напишіть нам у Telegram
          </a>{' '}
          — допоможемо.
        </p>
      </div>
    </div>
  );
}
