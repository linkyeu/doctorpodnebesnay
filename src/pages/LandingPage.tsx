import { useRef, useState, useEffect } from 'react';
import { TELEGRAM_DM } from '../data/links';
import StickyHeader from '../components/StickyHeader/StickyHeader';
import Hero from '../components/Hero/Hero';
import TrustBadges from '../components/TrustBadges/TrustBadges';
import Bio from '../components/Bio/Bio';
import WhenToContact from '../components/WhenToContact/WhenToContact';
import Navigator from '../components/Navigator/Navigator';
import Testimonials from '../components/Testimonials/Testimonials';
import Services from '../components/Services/Services';
import BlogTeaser from '../components/BlogTeaser/BlogTeaser';
import FAQ from '../components/FAQ/FAQ';
import FinalCta from '../components/FinalCta/FinalCta';
import Footer from '../components/Footer/Footer';

export default function LandingPage() {
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
    <>
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
      <BlogTeaser />
      <FAQ />
      <FinalCta />
      <Footer />
    </>
  );
}
