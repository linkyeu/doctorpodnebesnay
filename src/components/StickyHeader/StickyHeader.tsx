import { TELEGRAM_DM } from '../../data/links';
import styles from './StickyHeader.module.css';

interface StickyHeaderProps {
  visible: boolean;
}

const navLinks = [
  { href: '#about', label: 'Про лікаря' },
  { href: '#navigator', label: 'Навігатор' },
  { href: '#services', label: 'Консультації' },
  { href: '/blog', label: 'Блог' },
  { href: '#faq', label: 'FAQ' },
];

export default function StickyHeader({ visible }: StickyHeaderProps) {
  return (
    <header
      className={`${styles.header} ${visible ? styles.visible : ''}`}
      aria-hidden={!visible}
    >
      <div className={styles.inner}>
        <a href="#hero" className={styles.logo}>
          Др. Люба
          <span className={styles.logoSurname}>Піднебесна</span>
        </a>

        <nav className={styles.nav}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={TELEGRAM_DM}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta}
          tabIndex={visible ? 0 : -1}
        >
          Написати в Telegram
          <svg
            width="16"
            height="16"
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
    </header>
  );
}
