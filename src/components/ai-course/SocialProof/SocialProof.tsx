import { useState, useCallback } from 'react';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import styles from './SocialProof.module.css';
import { socialProofHeading, socialProofQuotes } from '../../../data/ai-course';

export default function SocialProof() {
  const sectionRef = useScrollReveal<HTMLElement>(0.1);
  const [current, setCurrent] = useState(0);
  const total = socialProofQuotes.length;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((p) => (p - 1 + total) % total);
  }, [total]);

  // Swipe support
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) { next(); } else { prev(); }
    }
    setTouchStart(null);
  };

  return (
    <section ref={sectionRef} className={`${styles.section} reveal`}>
      <div className={styles.container}>
        <h2 className={styles.heading}>{socialProofHeading}</h2>

        {/* Desktop: grid */}
        <div className={styles.grid}>
          {socialProofQuotes.map((quote) => (
            <blockquote key={quote.id} className={styles.card}>
              <p className={styles.quoteText}>{quote.text}</p>
              <footer className={styles.footer}>
                <div className={styles.avatar}>
                  {quote.author.charAt(0)}
                </div>
                <div className={styles.meta}>
                  <cite className={styles.author}>{quote.author}</cite>
                  <span className={styles.role}>{quote.role}</span>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>

        {/* Mobile: carousel with side arrows */}
        <div
          className={styles.carouselWrapper}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Left arrow */}
          <button
            className={`${styles.navBtn} ${styles.navBtnLeft}`}
            onClick={prev}
            aria-label="Попередній відгук"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Cards track */}
          <div className={styles.trackClip}>
            <div
              className={styles.track}
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {socialProofQuotes.map((quote) => (
                <blockquote key={quote.id} className={styles.slide}>
                  <p className={styles.quoteText}>{quote.text}</p>
                  <footer className={styles.footer}>
                    <div className={styles.avatar}>
                      {quote.author.charAt(0)}
                    </div>
                    <div className={styles.meta}>
                      <cite className={styles.author}>{quote.author}</cite>
                      <span className={styles.role}>{quote.role}</span>
                    </div>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>

          {/* Right arrow */}
          <button
            className={`${styles.navBtn} ${styles.navBtnRight}`}
            onClick={next}
            aria-label="Наступний відгук"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Dots — only on mobile */}
        <div className={styles.dots}>
          {socialProofQuotes.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Відгук ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
