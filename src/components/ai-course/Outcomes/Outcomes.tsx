import { useState, useRef, useCallback, useEffect, useLayoutEffect } from 'react';
import styles from './Outcomes.module.css';
import { outcomes } from '../../../data/ai-course';

function OutcomeIcon({ icon, emoji }: { icon?: string; emoji: string }) {
  const [failed, setFailed] = useState(false);

  if (!icon || failed) {
    return (
      <span className={styles.emoji} aria-hidden="true">{emoji}</span>
    );
  }

  return (
    <img
      src={icon}
      alt=""
      aria-hidden="true"
      className={styles.icon}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

export default function Outcomes() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const isTeleportingRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const getCardMetrics = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return null;
    const card = el.querySelector<HTMLElement>(`.${styles.cardSlide}`);
    if (!card) return null;
    const gap = parseFloat(getComputedStyle(el).gap) || 0;
    const cardWidth = card.offsetWidth + gap;
    const setWidth = cardWidth * outcomes.length;
    return { cardWidth, setWidth };
  }, []);

  const teleportToRealSet = useCallback(() => {
    const el = carouselRef.current;
    if (!el || isTeleportingRef.current) return;
    const metrics = getCardMetrics();
    if (!metrics) return;
    const { setWidth } = metrics;

    const pos = el.scrollLeft;
    const set1Start = setWidth;
    const set1End = setWidth * 2;

    if (pos >= set1Start && pos < set1End) return;

    isTeleportingRef.current = true;
    el.style.scrollSnapType = 'none';

    if (pos < set1Start) {
      el.scrollLeft = pos + setWidth;
    } else {
      el.scrollLeft = pos - setWidth;
    }

    requestAnimationFrame(() => {
      el.style.scrollSnapType = '';
      isTeleportingRef.current = false;
    });
  }, [getCardMetrics]);

  const scroll = useCallback((direction: 'left' | 'right') => {
    const el = carouselRef.current;
    if (!el) return;
    const metrics = getCardMetrics();
    if (!metrics) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({
      left: direction === 'left' ? -metrics.cardWidth : metrics.cardWidth,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }, [getCardMetrics]);

  useLayoutEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const metrics = getCardMetrics();
    if (metrics) {
      el.scrollLeft = metrics.setWidth;
    }
  }, [getCardMetrics]);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const handleScrollEnd = () => {
      teleportToRealSet();
    };

    const handleScroll = () => {
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(handleScrollEnd, 150);
    };

    el.addEventListener('scrollend', handleScrollEnd);
    el.addEventListener('scroll', handleScroll, { passive: true });

    const observer = new ResizeObserver(() => {
      const metrics = getCardMetrics();
      if (metrics) {
        el.style.scrollSnapType = 'none';
        el.scrollLeft = metrics.setWidth;
        requestAnimationFrame(() => {
          el.style.scrollSnapType = '';
        });
      }
    });
    observer.observe(el);

    return () => {
      clearTimeout(scrollTimeoutRef.current);
      el.removeEventListener('scrollend', handleScrollEnd);
      el.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [teleportToRealSet, getCardMetrics]);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Як зміниться ваша практика:</h2>
        <div className={styles.carouselWrapper}>
          <button
            className={`${styles.arrowBtn} ${styles.arrowLeft}`}
            onClick={() => scroll('left')}
            aria-label="Попередня картка"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12.5 15L7.5 10L12.5 5" />
            </svg>
          </button>
          <div ref={carouselRef} className={styles.carousel}>
            {[0, 1, 2].map((setIndex) =>
              outcomes.map((item) => {
                const isClone = setIndex !== 1;
                return (
                  <div
                    key={`${setIndex}-${item.id}`}
                    className={styles.cardSlide}
                    {...(isClone ? { 'aria-hidden': true as const } : {})}
                  >
                    <div className={styles.card} {...(isClone ? { tabIndex: -1 } : {})}>
                      {item.badge && (
                        <span className={styles.badge}>{item.badge}</span>
                      )}
                      <OutcomeIcon icon={item.icon} emoji={item.emoji} />
                      <h3 className={styles.cardTitle}>{item.title}</h3>
                      <p className={styles.cardText}>{item.description}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <button
            className={`${styles.arrowBtn} ${styles.arrowRight}`}
            onClick={() => scroll('right')}
            aria-label="Наступна картка"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7.5 5L12.5 10L7.5 15" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
