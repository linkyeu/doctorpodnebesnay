import { useState, useCallback, useRef } from 'react';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import styles from './SocialProof.module.css';
import { socialProofHeading, socialProofQuotes, type SocialProofQuote } from '../../../data/ai-course';

function QuoteCard({ quote, className }: { quote: SocialProofQuote; className?: string }) {
  return (
    <blockquote className={className}>
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
  );
}

const ArrowIcon = ({ direction }: { direction: 'left' | 'right' }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points={direction === 'left' ? '15 18 9 12 15 6' : '9 18 15 12 9 6'} />
  </svg>
);

const TRANSITION_MS = 400;

export default function SocialProof() {
  const sectionRef = useScrollReveal<HTMLElement>(0.1);
  const total = socialProofQuotes.length;

  // 3 copies: [copy1][copy2][copy3] — start in the middle
  const allCards = [...socialProofQuotes, ...socialProofQuotes, ...socialProofQuotes];
  const totalCards = allCards.length;
  const startIdx = total; // beginning of middle copy

  const [deskIdx, setDeskIdx] = useState(startIdx);
  const [animated, setAnimated] = useState(true);
  const lockRef = useRef(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const getTranslate = (idx: number) => -(idx / totalCards) * 100;

  const deskNext = useCallback(() => {
    if (lockRef.current) return;
    lockRef.current = true;
    setAnimated(true);
    setDeskIdx((prev) => {
      const next = prev + 1;
      // After animation, silently reset if we've gone past middle copy
      setTimeout(() => {
        if (next >= startIdx + total) {
          const reset = next - total;
          setAnimated(false);
          setDeskIdx(reset);
          // Re-enable animation on next frame
          requestAnimationFrame(() => setAnimated(true));
        }
        lockRef.current = false;
      }, TRANSITION_MS + 50);
      return next;
    });
  }, [total, startIdx]);

  const deskPrev = useCallback(() => {
    if (lockRef.current) return;
    lockRef.current = true;
    setAnimated(true);
    setDeskIdx((prev) => {
      const next = prev - 1;
      setTimeout(() => {
        if (next < startIdx) {
          const reset = next + total;
          setAnimated(false);
          setDeskIdx(reset);
          requestAnimationFrame(() => setAnimated(true));
        }
        lockRef.current = false;
      }, TRANSITION_MS + 50);
      return next;
    });
  }, [total, startIdx]);

  // --- Mobile: single-card carousel ---
  const [mobIdx, setMobIdx] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const mobNext = useCallback(() => {
    setMobIdx((prev) => (prev + 1) % total);
  }, [total]);

  const mobPrev = useCallback(() => {
    setMobIdx((p) => (p - 1 + total) % total);
  }, [total]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) { mobNext(); } else { mobPrev(); }
    }
    setTouchStart(null);
  };

  return (
    <section ref={sectionRef} className={`${styles.section} reveal`}>
      <div className={styles.container}>
        <h2 className={styles.heading}>{socialProofHeading}</h2>

        {/* Desktop: 3-visible sliding carousel */}
        <div className={styles.desktopCarousel}>
          <button
            className={styles.navBtn}
            onClick={deskPrev}
            aria-label="Попередній відгук"
          >
            <ArrowIcon direction="left" />
          </button>

          <div className={styles.desktopTrackClip}>
            <div
              ref={trackRef}
              className={styles.desktopTrack}
              style={{
                width: `${(totalCards / 3) * 100}%`,
                transform: `translateX(${getTranslate(deskIdx)}%)`,
                transition: animated ? `transform ${TRANSITION_MS}ms ease` : 'none',
                '--total-cards': totalCards,
              } as React.CSSProperties}
            >
              {allCards.map((quote, i) => (
                <div key={`d-${i}`} className={styles.desktopSlideWrapper}>
                  <QuoteCard quote={quote} className={styles.desktopSlide} />
                </div>
              ))}
            </div>
          </div>

          <button
            className={styles.navBtn}
            onClick={deskNext}
            aria-label="Наступний відгук"
          >
            <ArrowIcon direction="right" />
          </button>
        </div>

        {/* Mobile: single-card carousel */}
        <div
          className={styles.carouselWrapper}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            className={styles.navBtn}
            onClick={mobPrev}
            aria-label="Попередній відгук"
          >
            <ArrowIcon direction="left" />
          </button>

          <div className={styles.trackClip}>
            <div
              className={styles.track}
              style={{ transform: `translateX(-${mobIdx * 100}%)` }}
            >
              {socialProofQuotes.map((quote) => (
                <QuoteCard key={quote.id} quote={quote} className={styles.slide} />
              ))}
            </div>
          </div>

          <button
            className={styles.navBtn}
            onClick={mobNext}
            aria-label="Наступний відгук"
          >
            <ArrowIcon direction="right" />
          </button>
        </div>

        {/* Dots — mobile only */}
        <div className={styles.dots}>
          {socialProofQuotes.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === mobIdx ? styles.dotActive : ''}`}
              onClick={() => setMobIdx(i)}
              aria-label={`Відгук ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
