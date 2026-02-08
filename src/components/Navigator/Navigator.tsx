import { useState } from 'react';
import { ageGroups } from '../../data/situations';
import SituationCard from '../SituationCard/SituationCard';
import styles from './Navigator.module.css';

export default function Navigator() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeGroup = ageGroups[activeIndex];

  return (
    <section className={styles.navigator} id="navigator">
      <div className={styles.container}>
        <h2 className={styles.heading}>
          Навігатор для батьків
        </h2>
        <p className={styles.subtitle}>
          Оберіть вікову групу — розвінчаємо найпопулярніші міфи
        </p>

        {/* Tabs */}
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
              onClick={() => setActiveIndex(index)}
              onKeyDown={(e) => {
                let next = activeIndex;
                if (e.key === 'ArrowRight') next = (activeIndex + 1) % ageGroups.length;
                if (e.key === 'ArrowLeft') next = (activeIndex - 1 + ageGroups.length) % ageGroups.length;
                if (next !== activeIndex) {
                  e.preventDefault();
                  setActiveIndex(next);
                  document.getElementById(`tab-${ageGroups[next].id}`)?.focus();
                }
              }}
            >
              <span className={styles.tabAge}>{group.ageRange}</span>
              <span className={styles.tabLabel}>{group.label}</span>
            </button>
          ))}
        </div>

        {/* Tab panel */}
        <div
          role="tabpanel"
          id={`panel-${activeGroup.id}`}
          aria-labelledby={`tab-${activeGroup.id}`}
          className={styles.panel}
        >
          <div className={styles.grid}>
            {activeGroup.situations.map((situation) => (
              <SituationCard key={situation.id} situation={situation} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
