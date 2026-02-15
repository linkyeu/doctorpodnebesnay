import { useState, useRef, useCallback } from 'react';
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
          <div className={styles.grid}>
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
        </div>
      </div>
    </section>
  );
}
