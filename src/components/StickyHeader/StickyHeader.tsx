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
  { href: '#community', label: 'Спільнота' },
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
          <span className="sr-only"> (відкриється в новій вкладці)</span>
        </a>
      </div>
    </header>
  );
}
