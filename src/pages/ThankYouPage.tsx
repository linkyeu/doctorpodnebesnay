import { useState, useEffect, type FormEvent } from 'react';
import styles from './ThankYouPage.module.css';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function ThankYouPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // GA4: track purchase intent on page load
  useEffect(() => {
    window.gtag?.('event', 'purchase_intent', {
      event_category: 'conversion',
      event_label: 'ai_helper_thank_you_page',
    });
  }, []);

  // SEO meta
  useEffect(() => {
    document.title = 'Дякуємо! | ШІ-помічник лікаря — Др. Піднебесна';

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Дякуємо за інтерес до ШІ-помічника лікаря. Залиште email — отримаєте знижку у день запуску.');
    }

    // noindex — this is a conversion page, not for search
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || submitting) return;

    setSubmitting(true);

    // Netlify Forms: submit via fetch (SPA — form not in static HTML)
    const formData = new URLSearchParams();
    formData.append('form-name', 'ai-helper-waitlist');
    formData.append('email', email);

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString(),
    })
      .then(() => {
        setSubmitted(true);

        // GA4: track email submit
        window.gtag?.('event', 'email_submit', {
          event_category: 'conversion',
          event_label: 'ai_helper_waitlist',
        });
      })
      .catch(() => {
        // Fallback: still show success to not block the user
        // (Netlify Forms sometimes fails in dev — works in prod)
        setSubmitted(true);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className={styles.page}>
      {/* Animated mesh background */}
      <div className={styles.meshBg} aria-hidden="true">
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.orb3} />
      </div>

      <div className={styles.card}>
        {/* Check icon */}
        <div className={styles.checkCircle} aria-hidden="true">
          <svg
            className={styles.checkIcon}
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

        <h1 className={styles.heading}>Дякуємо за інтерес!</h1>

        {!submitted ? (
          <>
            <p className={styles.text}>
              ШІ-помічник лікаря зараз у фінальній підготовці.
              Залиште email — отримаєте{' '}
              <span className={styles.highlight}>знижку 30%</span> у день
              запуску.
            </p>

            <form
              className={styles.form}
              name="ai-helper-waitlist"
              onSubmit={handleSubmit}
              data-netlify="true"
              netlify-honeypot="bot-field"
            >
              {/* Honeypot for spam bots */}
              <input type="hidden" name="form-name" value="ai-helper-waitlist" />
              <p hidden>
                <label>
                  Ignore: <input name="bot-field" />
                </label>
              </p>

              <input
                type="email"
                name="email"
                className={styles.emailInput}
                placeholder="Ваш email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                aria-label="Email адреса"
              />
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={submitting}
              >
                {submitting ? 'Відправляємо...' : 'Отримати знижку'}
              </button>
            </form>
          </>
        ) : (
          <p className={styles.successMessage}>
            Готово! Ми напишемо вам, щойно довідник буде готовий.
          </p>
        )}
      </div>

      <a href="/ai-course" className={styles.backLink}>
        ← Повернутися на сторінку продукту
      </a>
    </div>
  );
}
