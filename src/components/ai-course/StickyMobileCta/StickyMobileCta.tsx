import { useState, useEffect } from 'react';
import styles from './StickyMobileCta.module.css';
import { TELEGRAM_PURCHASE_LINK } from '../../../data/ai-course';

export default function StickyMobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`${styles.bar} ${visible ? styles.visible : ''}`}
      aria-hidden={!visible}
    >
      <a
        href={TELEGRAM_PURCHASE_LINK}
        className={styles.button}
      >
        Забрати довідник
      </a>
    </div>
  );
}
