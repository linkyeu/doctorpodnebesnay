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
        <span className={styles.headerText}>💡 Як працює довідник</span>
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
          {/* Block 1 — What is this */}
          <div className={styles.intro}>
            <p className={styles.body}>
              Це не курс. Це довідник — відкривайте, коли потрібно. Всередині — <strong>16 готових рішень</strong> для щоденної практики (виписки, діагностика, аналізи, протоколи) + <strong>6 блокнотів з протоколами МОЗ</strong>, де відповідь — з цитатою.
            </p>
            <p className={styles.body}>
              Ви працюєте з двома інструментами — обидва безкоштовні:
            </p>
          </div>

          {/* Block 2 — Tool cards */}
          <div className={styles.toolCards}>
            <div className={`${styles.toolCard} ${styles.toolCardGreen}`}>
              <div className={styles.toolCardHeader}>
                <img src="/images/toolkit/chatgpt.svg" alt="" aria-hidden="true" className={styles.toolIcon} width="28" height="28" />
                <span className={styles.toolName}>ChatGPT</span>
              </div>
              <div className={styles.workflowBox}>
                <p className={styles.workflowText}>
                  Скопіюйте запит з довідника → замініть дані пацієнта → вставте в ChatGPT → готово
                </p>
              </div>
              <p className={styles.taskList}>Виписки · діагностика · аналізи · план лікування · спілкування з пацієнтами</p>
              <span className={styles.freeTag}>✓ Безкоштовний</span>
            </div>

            <div className={`${styles.toolCard} ${styles.toolCardYellow}`}>
              <div className={styles.toolCardHeader}>
                <img src="/images/toolkit/notebooklm.svg" alt="" aria-hidden="true" className={styles.toolIcon} width="28" height="28" />
                <span className={styles.toolName}>NotebookLM</span>
              </div>
              <div className={styles.workflowBox}>
                <p className={styles.workflowText}>
                  Завантажте документ (протокол, статтю) → задайте питання → отримайте відповідь з цитатами
                </p>
              </div>
              <p className={styles.taskList}>Протоколи МОЗ · інструкції препаратів · статті · лекції · підручники</p>
              <span className={styles.freeTag}>✓ Безкоштовний (Google)</span>
            </div>
          </div>

          <div className={styles.whyTwo}>
            <strong>Чому два?</strong>{' '}
            ChatGPT може вигадати джерело. NotebookLM відповідає ТІЛЬКИ з ваших документів і показує цитату. Тому для перевірки по протоколу — завжди NotebookLM.
          </div>

          {/* Block 3 — How to start */}
          <div className={styles.steps}>
            <h3 className={styles.stepsHeading}>Як почати</h3>
            <ol className={styles.stepsList}>
              <li className={styles.step}>
                <span className={styles.stepNum}>1</span>
                <div className={styles.stepContent}>
                  <button
                    type="button"
                    className={styles.stepLink}
                    onClick={() => { onScrollToSolution('A1'); collapse(); }}
                  >
                    Оберіть задачу з Рішень нижче
                  </button>
                  <span className={styles.stepMeta}> — скопіюйте запит, замініть дані пацієнта, вставте в ChatGPT.</span>
                </div>
              </li>
              <li className={styles.step}>
                <span className={styles.stepNum}>2</span>
                <div className={styles.stepContent}>
                  <button
                    type="button"
                    className={styles.stepLink}
                    onClick={() => { onTabChange('notebooks'); collapse(); }}
                  >
                    Запитай протокол
                  </button>
                  <span className={styles.stepMeta}> — готові блокноти з протоколами МОЗ. Задайте питання — відповідь з цитатою і номером сторінки.</span>
                </div>
              </li>
              <li className={styles.step}>
                <span className={styles.stepNum}>3</span>
                <div className={styles.stepContent}>
                  <button
                    type="button"
                    className={styles.stepLink}
                    onClick={() => { onTabChange('setup'); collapse(); }}
                  >
                    Налаштуйте ChatGPT під себе
                  </button>
                  <span className={styles.stepMeta}> — 2 хв, один раз. ChatGPT запам'ятає вашу спеціальність, мову та стиль відповідей.</span>
                </div>
              </li>
            </ol>
          </div>

          <button type="button" className={styles.dismissBtn} onClick={collapse}>
            Зрозуміло, почати →
          </button>
        </div>
      </div>
    </div>
  );
}
