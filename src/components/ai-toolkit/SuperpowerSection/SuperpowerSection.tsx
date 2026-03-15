import { superpowerData } from '../../../data/ai-toolkit';
import styles from './SuperpowerSection.module.css';

export default function SuperpowerSection() {
  const { readyNotebooks } = superpowerData;

  return (
    <div className={styles.section}>
      {/* 1: Video demo — placeholder until recorded */}
      <div id="video-demo" className={styles.videoDemo}>
        <div className={styles.videoDemoPlaceholder}>
          <span className={styles.videoDemoIcon} aria-hidden="true">🎬</span>
          <p className={styles.videoDemoTitle}>Демо-відео (40 сек)</p>
          <p className={styles.videoDemoDescription}>
            Завантажуємо Nelson, протокол МОЗ і WHO IMCI в один блокнот → одне питання → відповідь з цитатами з кожного джерела окремо
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

    </div>
  );
}
