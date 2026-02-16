import { useState, useCallback } from 'react';
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

  const switchTab = useCallback((index: number) => {
    if (index === activeIndex || transitioning) return;
    setTransitioning(true);

    setTimeout(() => {
      setActiveIndex(index);
      setTransitioning(false);
    }, 200);
  }, [activeIndex, transitioning]);

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
          <div className={styles.grid}>
            {activeTab.tiles.map((tile, i) => (
              <NavigatorTile
                key={tile.id}
                tile={tile}
                index={i}
                onOpen={setModalTile}
              />
            ))}
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
