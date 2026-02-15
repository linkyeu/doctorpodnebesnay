import { useRef, useCallback, useEffect, useLayoutEffect } from 'react';
import { blogArticles } from '../../data/blog';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './BlogTeaser.module.css';

export default function BlogTeaser() {
  const sectionRef = useScrollReveal<HTMLElement>();
  const gridRef = useRef<HTMLDivElement>(null);
  const isTeleportingRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const getCardMetrics = useCallback(() => {
    const el = gridRef.current;
    if (!el) return null;
    const card = el.querySelector<HTMLElement>(`.${styles.cardWrapper}`);
    if (!card) return null;
    const gap = parseFloat(getComputedStyle(el).gap) || 0;
    const cardWidth = card.offsetWidth + gap;
    const setWidth = cardWidth * blogArticles.length;
    return { cardWidth, setWidth };
  }, []);

  const teleportToRealSet = useCallback(() => {
    const el = gridRef.current;
    if (!el || isTeleportingRef.current) return;
    const metrics = getCardMetrics();
    if (!metrics) return;
    const { setWidth } = metrics;

    // set0 occupies [0, setWidth), set1 [setWidth, 2*setWidth), set2 [2*setWidth, 3*setWidth)
    const pos = el.scrollLeft;
    const set1Start = setWidth;
    const set1End = setWidth * 2;

    if (pos >= set1Start && pos < set1End) return; // already in real set

    isTeleportingRef.current = true;
    // Disable snap so the teleport is instant
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

  const scrollCarousel = useCallback((direction: 'left' | 'right') => {
    const el = gridRef.current;
    if (!el) return;
    const metrics = getCardMetrics();
    if (!metrics) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({
      left: direction === 'left' ? -metrics.cardWidth : metrics.cardWidth,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }, [getCardMetrics]);

  // Position scroll at middle set before first paint
  useLayoutEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const metrics = getCardMetrics();
    if (metrics) {
      el.scrollLeft = metrics.setWidth;
    }
  }, [getCardMetrics]);

  // Scroll-end detection + resize re-centering
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const handleScrollEnd = () => {
      teleportToRealSet();
    };

    // Debounced fallback for browsers without scrollend
    const handleScroll = () => {
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(handleScrollEnd, 150);
    };

    el.addEventListener('scrollend', handleScrollEnd);
    el.addEventListener('scroll', handleScroll, { passive: true });

    const observer = new ResizeObserver(() => {
      // Skip re-centering in desktop grid mode (no overflow)
      if (el.scrollWidth <= el.clientWidth) return;
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
    <section className={`${styles.section} reveal`} ref={sectionRef} id="blog">
      <div className={styles.container}>
        <h2 className={styles.heading}>Корисні статті</h2>
        <p className={styles.subtitle}>
          Доказова медицина простою мовою — скоро на сайті
        </p>

        <div className={styles.carouselWrapper}>
          <button
            className={`${styles.scrollArrow} ${styles.scrollArrowLeft}`}
            onClick={() => scrollCarousel('left')}
            aria-label="Попередня стаття"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12.5 15L7.5 10L12.5 5" />
            </svg>
          </button>
          <div ref={gridRef} className={styles.grid}>
            {[0, 1, 2].map((setIndex) =>
              blogArticles.map((article, i) => {
                const isClone = setIndex !== 1;
                return (
                  <div
                    key={`${setIndex}-${article.id}`}
                    className={`${styles.cardWrapper}${isClone ? ` ${styles.clone}` : ''}`}
                    {...(isClone ? { 'aria-hidden': true as const } : {})}
                  >
                    <a
                      href="/blog"
                      className={styles.card}
                      style={{ transitionDelay: `${i * 80}ms` }}
                      {...(isClone ? { tabIndex: -1 } : {})}
                    >
                      <div className={styles.cardTop}>
                        <span className={styles.category}>{article.category}</span>
                        <span className={styles.badge}>Скоро</span>
                      </div>
                      <span className={styles.emoji} aria-hidden="true">
                        {article.emoji}
                      </span>
                      <h3 className={styles.cardTitle}>{article.title}</h3>
                      <p className={styles.excerpt}>{article.excerpt}</p>
                      <span className={styles.readTime}>{article.readTime} хв читання</span>
                    </a>
                  </div>
                );
              })
            )}
          </div>
          <button
            className={`${styles.scrollArrow} ${styles.scrollArrowRight}`}
            onClick={() => scrollCarousel('right')}
            aria-label="Наступна стаття"
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
