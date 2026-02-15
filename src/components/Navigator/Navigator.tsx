import { useState, useRef, useCallback, useEffect } from 'react';
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
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

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

  const updateScrollButtons = useCallback(() => {
    const el = gridRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 1);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  const scrollCarousel = useCallback((direction: 'left' | 'right') => {
    const el = gridRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(`.${styles.cardWrapper}`);
    if (!card) return;
    const gap = parseFloat(getComputedStyle(el).gap) || 0;
    const distance = card.offsetWidth + gap;
    el.scrollBy({ left: direction === 'left' ? -distance : distance, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const timeout = setTimeout(updateScrollButtons, 50);
    el.addEventListener('scroll', updateScrollButtons, { passive: true });
    const observer = new ResizeObserver(updateScrollButtons);
    observer.observe(el);

    return () => {
      clearTimeout(timeout);
      el.removeEventListener('scroll', updateScrollButtons);
      observer.disconnect();
    };
  }, [activeGroup.id, updateScrollButtons]);

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
              className={`${styles.scrollArrow} ${styles.scrollArrowLeft} ${canScrollLeft ? styles.scrollArrowVisible : ''}`}
              onClick={() => scrollCarousel('left')}
              aria-label="Попередня картка"
              tabIndex={canScrollLeft ? 0 : -1}
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
              {activeGroup.situations.map((situation, i) => (
                <div
                  key={situation.id}
                  className={styles.cardWrapper}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <SituationCard situation={situation} />
                </div>
              ))}
            </div>
            <button
              className={`${styles.scrollArrow} ${styles.scrollArrowRight} ${canScrollRight ? styles.scrollArrowVisible : ''}`}
              onClick={() => scrollCarousel('right')}
              aria-label="Наступна картка"
              tabIndex={canScrollRight ? 0 : -1}
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
