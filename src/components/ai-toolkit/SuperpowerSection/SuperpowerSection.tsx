import { useState } from 'react';
import { superpowerData } from '../../../data/ai-toolkit';
import styles from './SuperpowerSection.module.css';

export default function SuperpowerSection() {
  const { trustPoints, readyNotebooks } = superpowerData;
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <div className={styles.section}>
      {/* 1: Video demo — placeholder until recorded */}
      <div id="video-demo" className={styles.videoDemo}>
        <div className={styles.videoDemoPlaceholder}>
          <span className={styles.videoDemoIcon} aria-hidden="true">🎬</span>
          <p className={styles.videoDemoTitle}>Демо-відео (30 сек)</p>
          <p className={styles.videoDemoDescription}>
            Відкриваємо готовий блокнот з протоколом МОЗ → задаємо питання природною мовою → отримуємо відповідь з цитатою та номером сторінки
          </p>
          <span className={styles.videoDemoTag}>Відео буде тут</span>
        </div>
        <p className={styles.sourcesLine}>
          Працює з будь-яким джерелом: протоколи МОЗ · підручники · статті · відео · лекції
        </p>
      </div>

      {/* 2: Ready Notebooks */}
      <div id="ready-notebooks" className={styles.bonusWrapper}>
        <h3 className={styles.bonusTitle}>Готові блокноти — просто відкрийте</h3>
        <p className={styles.bonusDescription}>
          Ми вже завантажили протоколи МОЗ та міжнародні гайдлайни. Клікніть → одразу задавайте питання. Не потрібно нічого завантажувати.
        </p>
        {readyNotebooks.length > 0 ? (
          <div className={styles.notebookList}>
            {readyNotebooks.map((nb) => (
              <div key={nb.id} className={styles.notebookCard}>
                <div className={styles.notebookHeader}>
                  <span className={styles.notebookEmoji} aria-hidden="true">{nb.emoji}</span>
                  <div>
                    <span className={styles.notebookTitle}>{nb.title}</span>
                    <span className={styles.notebookSources}>{nb.sources}</span>
                  </div>
                </div>
                <span className={styles.notebookDesc}>{nb.description}</span>
                {nb.exampleQueries.length > 0 && (
                  <div className={styles.queryList}>
                    {nb.exampleQueries.map((q, i) => (
                      <span key={i} className={styles.queryChip}>«{q}»</span>
                    ))}
                  </div>
                )}
                <a
                  href={nb.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.notebookLink}
                >
                  Відкрити блокнот →
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.bonusEmpty}>
            Блокноти готуються — скоро тут з'являться готові протоколи МОЗ,
            міжнародні гайдлайни та інші корисні матеріали.
          </p>
        )}
        <p className={styles.bonusAudioNote}>
          🎧 Кожен блокнот має Audio Overview — послухайте протокол як подкаст
        </p>
      </div>

      {/* 3: Collapsed "Як це працює" */}
      <div id="how-it-works" className={styles.detailsWrapper}>
        <button
          type="button"
          className={styles.detailsToggle}
          onClick={() => setDetailsOpen((prev) => !prev)}
          aria-expanded={detailsOpen}
          aria-controls="details-content"
        >
          <span>ℹ️ Як це працює</span>
          <span className={`${styles.detailsChevron} ${detailsOpen ? styles.detailsChevronOpen : ''}`} aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </button>

        <div
          id="details-content"
          className={`${styles.detailsContent} ${detailsOpen ? styles.detailsContentOpen : ''}`}
        >
          <div className={styles.detailsInner}>
            <p className={styles.detailsText}>
              <strong>NotebookLM</strong> — безкоштовний інструмент від Google. Він працює ТІЛЬКИ з вашими документами: завантажуєте протокол, статтю або підручник → задаєте питання → отримуєте відповідь з точною цитатою і номером сторінки. Жодних вигаданих фактів.
            </p>

            <div className={styles.trustCard}>
              <h4 className={styles.trustTitle}>Чому можна довіряти</h4>
              <ul className={styles.trustList}>
                {trustPoints.map((point, i) => (
                  <li key={i} className={styles.trustItem}>
                    <span className={styles.trustCheckmark} aria-hidden="true">✓</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
