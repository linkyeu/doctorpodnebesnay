import { useState, useRef, useCallback, useEffect, useLayoutEffect } from 'react';
import { ageGroups } from '../../data/situations';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import SituationCard from '../SituationCard/SituationCard';
import styles from './Navigator.module.css';

export default function Navigator() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const activeGroup = ageGroups[activeIndex];
  const ref = useScrollReveal<HTMLDivElement>();
  const pendingIndex = useRef<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isTeleportingRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const switchTab = useCallback((index: number) => {
    if (index === activeIndex || transitioning) return;
    pendingIndex.current = index;
    setTransitioning(true);

    setTimeout(() => {
      setActiveIndex(index);
      setTransitioning(false);
      pendingIndex.current = null;
    }, 200);
  }, [activeIndex, transitioning]);

  const getCardMetrics = useCallback(() => {
    const el = gridRef.current;
    if (!el) return null;
    const card = el.querySelector<HTMLElement>(`.${styles.cardWrapper}`);
    if (!card) return null;
    const gap = parseFloat(getComputedStyle(el).gap) || 0;
    const cardWidth = card.offsetWidth + gap;
    const setWidth = cardWidth * activeGroup.situations.length;
    return { cardWidth, setWidth };
  }, [activeGroup.situations.length]);

  const teleportToRealSet = useCallback(() => {
    const el = gridRef.current;
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

  // Position scroll at middle set before first paint (also on tab switch)
  useLayoutEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const metrics = getCardMetrics();
    if (metrics) {
      el.scrollLeft = metrics.setWidth;
    }
  }, [activeGroup.id, getCardMetrics]);

  // Scroll-end detection + resize re-centering
  useEffect(() => {
    const el = gridRef.current;
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
  }, [activeGroup.id, teleportToRealSet, getCardMetrics]);

  return (
    <section className={styles.navigator} id="navigator">
      <div className={`${styles.container} reveal`} ref={ref}>
        <h2 className={styles.heading}>
          Навігатор для батьків
        </h2>
        <p className={styles.subtitle}>
          Оберіть вікову групу — розвінчаємо найпопулярніші міфи
        </p>

        {/* Tabs */}
        <div className={styles.tabBar}>
          <div className={styles.tabs} role="tablist" aria-label="Вікові групи">
            {ageGroups.map((group, index) => (
              <button
                key={group.id}
                role="tab"
                id={`tab-${group.id}`}
                aria-selected={index === activeIndex}
                aria-controls={`panel-${group.id}`}
                tabIndex={index === activeIndex ? 0 : -1}
                className={`${styles.tab} ${index === activeIndex ? styles.tabActive : ''}`}
                onClick={() => switchTab(index)}
                onKeyDown={(e) => {
                  let next = activeIndex;
                  if (e.key === 'ArrowRight') next = (activeIndex + 1) % ageGroups.length;
                  if (e.key === 'ArrowLeft') next = (activeIndex - 1 + ageGroups.length) % ageGroups.length;
                  if (next !== activeIndex) {
                    e.preventDefault();
                    switchTab(next);
                    document.getElementById(`tab-${ageGroups[next].id}`)?.focus();
                  }
                }}
              >
                <span className={styles.tabAge}>{group.ageRange}</span>
                <span className={styles.tabLabel}>{group.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab panel */}
        <div
          role="tabpanel"
          id={`panel-${activeGroup.id}`}
          aria-labelledby={`tab-${activeGroup.id}`}
          className={`${styles.panel} ${transitioning ? styles.panelExiting : styles.panelEntering}`}
          key={activeGroup.id}
        >
          <div className={styles.carouselWrapper}>
            <button
              className={`${styles.scrollArrow} ${styles.scrollArrowLeft}`}
              onClick={() => scrollCarousel('left')}
              aria-label="Попередня картка"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12.5 15L7.5 10L12.5 5" />
              </svg>
            </button>
            <div
              ref={gridRef}
              className={styles.grid}
              role="region"
              aria-label="Картки з розвінчаними міфами"
              tabIndex={0}
            >
              {[0, 1, 2].map((setIndex) =>
                activeGroup.situations.map((situation, i) => {
                  const isClone = setIndex !== 1;
                  return (
                    <div
                      key={`${setIndex}-${situation.id}`}
                      className={styles.cardWrapper}
                      style={{ animationDelay: `${i * 100}ms` }}
                      {...(isClone ? { 'aria-hidden': true as const } : {})}
                    >
                      <SituationCard situation={situation} />
                    </div>
                  );
                })
              )}
            </div>
            <button
              className={`${styles.scrollArrow} ${styles.scrollArrowRight}`}
              onClick={() => scrollCarousel('right')}
              aria-label="Наступна картка"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7.5 5L12.5 10L7.5 15" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
