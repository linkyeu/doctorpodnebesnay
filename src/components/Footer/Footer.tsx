import { TELEGRAM_DM, INSTAGRAM, YOUTUBE } from '../../data/links';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.main}>
          <p className={styles.name}>Др. Люба</p>
          <p className={styles.tagline}>Науковий навігатор батьківства</p>
        </div>

        <div className={styles.social}>
          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="Instagram"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="18" cy="6" r="1" fill="currentColor" />
            </svg>
          </a>
          <a
            href={TELEGRAM_DM}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="Telegram"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M21 3L10 14M21 3l-7 18-4-8M21 3L3 11l7 3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href={YOUTUBE}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="YouTube"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="2" y="4.5" width="20" height="15" rx="4" stroke="currentColor" strokeWidth="1.5" />
              <path d="M10 9.5v5l4.5-2.5L10 9.5z" fill="currentColor" />
            </svg>
          </a>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} Др. Люба. Всі права захищені.
          </p>
          <p className={styles.disclaimer}>
            Матеріали на цьому сайті мають інформаційний характер і не замінюють
            індивідуальну консультацію лікаря.
          </p>
        </div>
      </div>
    </footer>
  );
}
