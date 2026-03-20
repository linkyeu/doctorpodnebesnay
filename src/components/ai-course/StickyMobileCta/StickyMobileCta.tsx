import { useState, useEffect } from 'react';
import styles from './StickyMobileCta.module.css';
import { heroContent } from '../../../data/ai-course';
import { getPaymentUrl, trackPurchaseIntent } from '../../../utils/analytics';

export default function StickyMobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 1500);
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
        href={getPaymentUrl('sticky')}
        className={styles.button}
        onClick={() => trackPurchaseIntent('sticky')}
      >
        {heroContent.cta}
      </a>
    </div>
  );
}
