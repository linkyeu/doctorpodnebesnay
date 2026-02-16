import { useState, useCallback, useRef } from 'react';
import { navigatorTabs } from '../../data/navigator-tiles';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import NavigatorTile from '../NavigatorTile/NavigatorTile';
import InfographicModal from '../InfographicModal/InfographicModal';
import type { NavigatorTileData } from '../../types';
import styles from './Navigator.module.css';

export default function Navigator() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [modalTile, setModalTile] = useState<NavigatorTileData | null>(null);
  const activeTab = navigatorTabs[activeIndex];
  const ref = useScrollReveal<HTMLDivElement>();
  const gridRef = useRef<HTMLDivElement>(null);

  const switchTab = useCallback((index: number) => {
    if (index === activeIndex || transitioning) return;
    setTransitioning(true);

    setTimeout(() => {
      setActiveIndex(index);
      if (gridRef.current) {
        gridRef.current.scrollLeft = 0;
      }
      setTransitioning(false);
    }, 200);
  }, [activeIndex, transitioning]);

  const scrollCarousel = useCallback((direction: 'left' | 'right') => {
    const grid = gridRef.current;
    if (!grid) return;
    const firstChild = grid.firstElementChild as HTMLElement | null;
    if (!firstChild) return;
    const cardWidth = firstChild.offsetWidth;
    const gap = parseFloat(getComputedStyle(grid).gap) || 0;
    const scrollAmount = cardWidth + gap;
    grid.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  }, []);

  return (
    <section className={styles.navigator} id="navigator">
      <div className={`${styles.container} reveal`} ref={ref}>
        <h2 className={styles.heading}>
          Навігатор для батьків
        </h2>
        <p className={styles.subtitle}>
          Оберіть вікову групу — отримайте практичні поради
        </p>

        {/* Tabs */}
        <div className={styles.tabBar}>
          <div className={styles.tabs} role="tablist" aria-label="Вікові групи">
            {navigatorTabs.map((tab, index) => (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={index === activeIndex}
                aria-controls={`panel-${tab.id}`}
                tabIndex={index === activeIndex ? 0 : -1}
                className={`${styles.tab} ${index === activeIndex ? styles.tabActive : ''}`}
                onClick={() => switchTab(index)}
                onKeyDown={(e) => {
                  let next = activeIndex;
                  if (e.key === 'ArrowRight') next = (activeIndex + 1) % navigatorTabs.length;
                  if (e.key === 'ArrowLeft') next = (activeIndex - 1 + navigatorTabs.length) % navigatorTabs.length;
                  if (next !== activeIndex) {
                    e.preventDefault();
                    switchTab(next);
                    document.getElementById(`tab-${navigatorTabs[next].id}`)?.focus();
                  }
                }}
              >
                <span className={styles.tabAge}>{tab.ageRange}</span>
                <span className={styles.tabLabel}>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab panel */}
        <div
          role="tabpanel"
          id={`panel-${activeTab.id}`}
          aria-labelledby={`tab-${activeTab.id}`}
          className={`${styles.panel} ${transitioning ? styles.panelExiting : styles.panelEntering}`}
          key={activeTab.id}
        >
          <div className={styles.carouselWrapper}>
            <button
              className={`${styles.scrollArrow} ${styles.scrollArrowLeft}`}
              onClick={() => scrollCarousel('left')}
              aria-label="Попередня картка"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 4L6 10L12 16" />
              </svg>
            </button>

            <div className={styles.grid} ref={gridRef}>
              {activeTab.tiles.map((tile, i) => (
                <div className={styles.tileWrapper} key={tile.id}>
                  <NavigatorTile
                    tile={tile}
                    index={i}
                    onOpen={setModalTile}
                  />
                </div>
              ))}
            </div>

            <button
              className={`${styles.scrollArrow} ${styles.scrollArrowRight}`}
              onClick={() => scrollCarousel('right')}
              aria-label="Наступна картка"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M8 4L14 10L8 16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {modalTile && (
        <InfographicModal
          tile={modalTile}
          onClose={() => setModalTile(null)}
        />
      )}
    </section>
  );
}
