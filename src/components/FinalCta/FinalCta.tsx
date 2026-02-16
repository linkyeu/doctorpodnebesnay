import { TELEGRAM_DM } from '../../data/links';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './FinalCta.module.css';

export default function FinalCta() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className={styles.finalCta}>
      <div className={`${styles.container} reveal`} ref={ref}>
        <div className={styles.photoWrapper}>
          <picture>
            <source srcSet="/images/daughter-phone.webp" type="image/webp" />
            <img
              src="/images/daughter-phone.png"
              alt=""
              aria-hidden="true"
              className={styles.photo}
              loading="lazy"
              width="533"
              height="800"
            />
          </picture>
        </div>
        <div className={styles.content}>
          <h2 className={styles.heading}>Залишились запитання?</h2>

          <a
            href={TELEGRAM_DM}
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
      </div>
    </section>
  );
}
