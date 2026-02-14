import { useRef, useState, useEffect } from 'react';
import { TELEGRAM_DM } from './data/links';
import StickyHeader from './components/StickyHeader/StickyHeader';
import Hero from './components/Hero/Hero';
import Services from './components/Services/Services';
import Navigator from './components/Navigator/Navigator';
import SocialProof from './components/SocialProof/SocialProof';
import Bio from './components/Bio/Bio';
import Footer from './components/Footer/Footer';
import styles from './App.module.css';

export default function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeaderVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.app}>
      <StickyHeader visible={headerVisible} />
      <div ref={heroRef}>
        <Hero ctaUrl={TELEGRAM_DM} />
      </div>
      <Services />
      <Navigator />
      <SocialProof />
      <Bio />
      <Footer />
    </div>
  );
}
