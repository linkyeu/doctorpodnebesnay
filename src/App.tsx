import { useRef, useState, useEffect } from 'react';
import { TELEGRAM_DM } from './data/links';
import StickyHeader from './components/StickyHeader/StickyHeader';
import Hero from './components/Hero/Hero';
import TrustBadges from './components/TrustBadges/TrustBadges';
import Bio from './components/Bio/Bio';
import WhenToContact from './components/WhenToContact/WhenToContact';
import Navigator from './components/Navigator/Navigator';
import Testimonials from './components/Testimonials/Testimonials';
import Services from './components/Services/Services';
import Community from './components/Community/Community';
import FAQ from './components/FAQ/FAQ';
import FinalCta from './components/FinalCta/FinalCta';
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
      <TrustBadges />
      <Bio />
      <WhenToContact />
      <Navigator />
      <Testimonials />
      <Services />
      <Community />
      <FAQ />
      <FinalCta />
      <Footer />
    </div>
  );
}
