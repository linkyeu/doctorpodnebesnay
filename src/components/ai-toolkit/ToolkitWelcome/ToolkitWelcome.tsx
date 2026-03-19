import { useState } from 'react';
import styles from './ToolkitWelcome.module.css';

const STORAGE_KEY = 'toolkit_orientation_seen';

interface ToolkitWelcomeProps {
  onScrollToSolution: (id: string) => void;
  onCollapse?: () => void;
}

export default function ToolkitWelcome({ onScrollToSolution, onCollapse }: ToolkitWelcomeProps) {
  const [expanded, setExpanded] = useState(() => {
    return !localStorage.getItem(STORAGE_KEY);
  });

  const isDone = !!localStorage.getItem(STORAGE_KEY);

  const collapse = () => {
    localStorage.setItem(STORAGE_KEY, '1');
    setExpanded(false);
    onCollapse?.();
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
          {isDone ? (
            <span className={styles.headerIconDone} aria-hidden="true">✓</span>
          ) : (
            <span className={styles.headerIcon} aria-hidden="true">👋</span>
          )}
          <div>
            <span className={styles.headerText}>Як працює довідник</span>
            <span className={styles.headerSubtext}>
              {isDone ? 'Ознайомлено' : 'Коротке введення'}
            </span>
          </div>
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
          {/* Intro */}
          <p className={styles.intro}>
            Готові запити для ChatGPT та бази протоколів у NotebookLM. Відкривайте, коли потрібно.
          </p>

          {/* Tool cards with role descriptions */}
          <div className={styles.toolCards}>
            <div className={styles.toolCard}>
              <div className={styles.toolCardHeader}>
                <div className={styles.toolLogo}>
                  <img src="/images/toolkit/chatgpt.svg" alt="" aria-hidden="true" width="28" height="28" />
                </div>
                <span className={styles.toolName}>ChatGPT</span>
              </div>
              <p className={styles.toolDesc}>
                Пишете виписки, аналізуєте результати, генеруєте диференціальний діагноз — щодня
              </p>
            </div>
            <div className={styles.toolCard}>
              <div className={styles.toolCardHeader}>
                <div className={styles.toolLogo}>
                  <img src="/images/toolkit/notebooklm.svg" alt="" aria-hidden="true" width="28" height="28" />
                </div>
                <span className={styles.toolName}>NotebookLM</span>
              </div>
              <p className={styles.toolDesc}>
                Протоколи, підручники, настанови. Відповідає тільки за джерелами і показує звідки. Сам створює подкаст, флешкартки та тест з цих матеріалів
                <span className={styles.toolHint}>Безкоштовний інструмент Google. Працює в браузері, потрібен Google-акаунт</span>
              </p>
            </div>
          </div>

          {/* Steps — vertical timeline */}
          <div className={styles.steps}>
            <h3 className={styles.stepsHeading}>Два кроки</h3>
            <ol className={styles.stepsList}>
              <li className={styles.step}>
                <div className={styles.stepTrack}>
                  <span className={styles.stepNum}>1</span>
                  <span className={styles.stepLine} aria-hidden="true" />
                </div>
                <div className={styles.stepBody}>
                  <strong
                    className={styles.stepAction}
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      document.getElementById('setup')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      collapse();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        document.getElementById('setup')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        collapse();
                      }
                    }}
                  >
                    Налаштуйте ChatGPT
                  </strong>
                  <span className={styles.stepMeta}> — один раз, 2 хвилини</span>
                </div>
              </li>
              <li className={styles.step}>
                <div className={styles.stepTrack}>
                  <span className={styles.stepNum}>2</span>
                </div>
                <div className={styles.stepBody}>
                  <strong
                    className={styles.stepAction}
                    role="button"
                    tabIndex={0}
                    onClick={() => { onScrollToSolution('A1'); collapse(); }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onScrollToSolution('A1');
                        collapse();
                      }
                    }}
                  >
                    Відкрийте потрібне рішення
                  </strong>
                  <span className={styles.stepMeta}> — скопіюйте запит, вставте в ChatGPT або NotebookLM, замініть дані пацієнта</span>
                </div>
              </li>
            </ol>
          </div>

          <button type="button" className={styles.dismissBtn} onClick={collapse}>
            Почати
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
