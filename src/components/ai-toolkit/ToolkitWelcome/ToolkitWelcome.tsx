import { useState } from 'react';
import styles from './ToolkitWelcome.module.css';

const STORAGE_KEY = 'toolkit_orientation_seen';

interface ToolkitWelcomeProps {
  onTabChange: (tab: string) => void;
  onScrollToSolution: (id: string) => void;
}

export default function ToolkitWelcome({ onTabChange, onScrollToSolution }: ToolkitWelcomeProps) {
  const [expanded, setExpanded] = useState(() => {
    return !localStorage.getItem(STORAGE_KEY);
  });

  const collapse = () => {
    localStorage.setItem(STORAGE_KEY, '1');
    setExpanded(false);
  };

  const toggle = () => {
    if (!expanded) {
      setExpanded(true);
    } else {
      collapse();
    }
  };

  return (
    <div className={styles.welcome} role="region" aria-label="Як працює довідник">
      {/* Collapsible header — always visible */}
      <button
        type="button"
        className={styles.header}
        onClick={toggle}
        aria-expanded={expanded}
        aria-controls="welcome-content"
      >
        <div className={styles.headerLeft}>
          <span className={styles.headerIcon} aria-hidden="true">💡</span>
          <span className={styles.headerText}>Як працює довідник</span>
        </div>
        <span className={`${styles.chevron} ${expanded ? styles.chevronOpen : ''}`} aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      {/* Expandable content */}
      <div
        id="welcome-content"
        className={`${styles.content} ${expanded ? styles.contentOpen : ''}`}
      >
        <div className={styles.contentInner}>
          {/* Intro — one line */}
          <p className={styles.intro}>
            Це не курс. Це довідник — відкривайте, коли потрібно.
          </p>

          {/* Tool cards — logo + name only */}
          <p className={styles.toolsLabel}>Ви працюєте з двома інструментами:</p>
          <div className={styles.toolCards}>
            <div className={styles.toolCard}>
              <div className={styles.toolLogo}>
                <img src="/images/toolkit/chatgpt.svg" alt="" aria-hidden="true" width="28" height="28" />
              </div>
              <span className={styles.toolName}>ChatGPT</span>
            </div>
            <div className={styles.toolCard}>
              <div className={styles.toolLogo}>
                <img src="/images/toolkit/notebooklm.svg" alt="" aria-hidden="true" width="28" height="28" />
              </div>
              <span className={styles.toolName}>NotebookLM</span>
            </div>
          </div>

          {/* Why only two */}
          <div className={styles.whyTwo}>
            <strong>Чому лише два?</strong>{' '}
            Існують десятки ШІ-інструментів. Ми протестували їх і залишили два, які покривають усі задачі лікаря — від документації до перевірки за протоколами. Без зайвого, без плутанини. Інші курси дають 10+ інструментів, які лякають і ніколи не використовуються. Тут — тільки те, що реально працює.
          </div>

          {/* Steps — vertical timeline */}
          <div className={styles.steps}>
            <h3 className={styles.stepsHeading}>Три розділи зліва — три задачі</h3>
            <ol className={styles.stepsList}>
              <li className={styles.step}>
                <div className={styles.stepTrack}>
                  <span className={styles.stepNum}>1</span>
                  <span className={styles.stepLine} aria-hidden="true" />
                </div>
                <div className={styles.stepBody}>
                  <button
                    type="button"
                    className={styles.stepLink}
                    onClick={() => { onScrollToSolution('A1'); collapse(); }}
                  >
                    Рішення
                  </button>
                  <span className={styles.stepMeta}> — готові запити для щоденної практики. Оберіть задачу, скопіюйте запит, замініть дані пацієнта, вставте в ChatGPT — готово.</span>
                </div>
              </li>
              <li className={styles.step}>
                <div className={styles.stepTrack}>
                  <span className={styles.stepNum}>2</span>
                  <span className={styles.stepLine} aria-hidden="true" />
                </div>
                <div className={styles.stepBody}>
                  <button
                    type="button"
                    className={styles.stepLink}
                    onClick={() => { onTabChange('notebooks'); collapse(); }}
                  >
                    Запитай протокол
                  </button>
                  <span className={styles.stepMeta}> — коли потрібно перевірити за протоколом. На відміну від ChatGPT, не вигадує — відповідає ТІЛЬКИ на основі завантажених протоколів МОЗ та інших доказових джерел: кожна відповідь з цитатою і номером сторінки. Якщо відповіді немає — скаже прямо, а не вигадає.</span>
                </div>
              </li>
              <li className={styles.step}>
                <div className={styles.stepTrack}>
                  <span className={styles.stepNum}>3</span>
                </div>
                <div className={styles.stepBody}>
                  <button
                    type="button"
                    className={styles.stepLink}
                    onClick={() => { onTabChange('setup'); collapse(); }}
                  >
                    Налаштування
                  </button>
                  <span className={styles.stepMeta}> — необов'язково. Одноразове налаштування (2 хв), щоб ChatGPT запам'ятав вашу спеціальність, мову та стиль відповідей. Запити працюють і без цього.</span>
                </div>
              </li>
            </ol>
          </div>

          <button type="button" className={styles.dismissBtn} onClick={collapse}>
            Зрозуміло, почати
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
