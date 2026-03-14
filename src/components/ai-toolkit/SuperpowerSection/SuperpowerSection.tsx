import { superpowerData, setupSections } from '../../../data/ai-toolkit';
import { InstructionStep, PurposeCallout } from '../ToolkitSetup/ToolkitSetup';
import styles from './SuperpowerSection.module.css';

export default function SuperpowerSection() {
  const { explainer, trustPoints, readyNotebooks, audioDemo } =
    superpowerData;

  const b6 = setupSections.find(s => s.id === 'B6')!;

  return (
    <div className={styles.section}>
      {/* 2a: Audio Overview Demo (WOW-first) */}
      <div className={styles.audioDemoHero}>
        <div className={styles.audioDemoOverline}>Послухайте</div>
        <h3 className={styles.audioDemoTitle}>🎧 Протокол МОЗ як подкаст</h3>
        {audioDemo ? (
          <>
            <p className={styles.audioDemoLabel}>
              AI перетворив протокол на 15-хвилинне обговорення. Два AI-ведучі розбирають ключові моменти. Послухайте 60 секунд:
            </p>
            {audioDemo.type === 'audio' ? (
              <audio
                className={styles.audioDemoPlayer}
                controls
                preload="metadata"
                src={audioDemo.src}
              >
                Ваш браузер не підтримує аудіо.
              </audio>
            ) : (
              <video
                className={styles.audioDemoVideo}
                controls
                preload="metadata"
                poster={audioDemo.poster}
                src={audioDemo.src}
              >
                Ваш браузер не підтримує відео.
              </video>
            )}
            <p className={styles.audioDemoCaption}>
              {audioDemo.title} · {audioDemo.duration}
            </p>
          </>
        ) : (
          <p className={styles.audioDemoLabel}>
            NotebookLM перетворює будь-який протокол на подкаст-обговорення двох AI-ведучих. 200 сторінок → 15 хвилин аудіо. Слухайте по дорозі на роботу.
          </p>
        )}
        <p className={styles.audioDemoSubtitle}>
          Це Audio Overview — фіча NotebookLM від Google
        </p>
      </div>

      {/* 2b: Brief Explainer (condensed) — light grey card */}
      <div className={styles.explainerCard}>
        <h3 className={styles.explainerTitle}>📖 {explainer.title}</h3>
        <p className={styles.explainerText}>{explainer.content}</p>

        {/* Compact ChatGPT vs NotebookLM comparison */}
        <div className={styles.comparisonGrid}>
          <div className={styles.comparisonCol} data-type="chatgpt">
            <strong className={styles.comparisonLabel}>⚠️ ChatGPT:</strong> може вигадувати факти
          </div>
          <div className={styles.comparisonCol} data-type="notebooklm">
            <strong className={styles.comparisonLabel}>✅ NotebookLM:</strong> тільки з ваших джерел
          </div>
        </div>
      </div>

      {/* 2c: Trust Points — light grey card */}
      <div className={styles.trustCard}>
        <h3 className={styles.trustTitle}>✅ Чому можна довiряти</h3>
        <ul className={styles.trustList}>
          {trustPoints.map((point, i) => (
            <li key={i} className={styles.trustItem}>
              <span className={styles.trustCheckmark} aria-hidden="true">✓</span>
              {point}
            </li>
          ))}
        </ul>
      </div>

      {/* 2d: Setup Guide — light blue card */}
      <div className={styles.setupCard}>
        <h3 className={styles.setupTitle}>🔧 Як створити свій ноутбук</h3>

        <div className={styles.setupGuide}>
          {b6.intro && <PurposeCallout text={b6.intro} />}

          <InstructionStep
            number={1}
            variant="notebooklm"
            text={<>Вiдкрийте <strong>notebooklm.google.com</strong> → увiйдiть через Google-акаунт → натиснiть <strong>&quot;New notebook&quot;</strong></>}
            screenshot={b6.screenshots?.[0] ? {
              src: b6.screenshots[0].src,
              alt: b6.screenshots[0].alt,
              caption: undefined,
              video: b6.screenshots[0].video,
            } : undefined}
          />

          <InstructionStep
            number={2}
            variant="notebooklm"
            text={<>Натиснiть <strong>&quot;Додати джерела&quot;</strong> → додайте матерiал у будь-якому форматi</>}
            screenshot={b6.screenshots?.[1] ? {
              src: b6.screenshots[1].src,
              alt: b6.screenshots[1].alt,
              caption: undefined,
              video: b6.screenshots[1].video,
            } : undefined}
          />

          <InstructionStep
            number={3}
            variant="notebooklm"
            text={<>Задайте питання в чатi — наприклад: <strong>&laquo;Якi показання до призначення антибiотикiв?&raquo;</strong> — i отримайте вiдповiдь <strong>з цитатами та номерами сторiнок</strong></>}
            screenshot={b6.screenshots?.[2] ? {
              src: b6.screenshots[2].src,
              alt: b6.screenshots[2].alt,
              caption: undefined,
              video: b6.screenshots[2].video,
            } : undefined}
          />
        </div>
      </div>

      {/* 2e: SUPER BONUS — Ready Notebooks — bold orange gradient */}
      <div className={styles.bonusWrapper}>
        <div className={styles.bonusOverline}>🎁 SUPER BONUS</div>
        <h3 className={styles.bonusTitle}>Готовi ноутбуки — просто вiдкрийте</h3>
        <p className={styles.bonusDescription}>
          Ми вже завантажили протоколи МОЗ та мiжнароднi гайдлайни. Клiкнiть → одразу задавайте питання. Не потрiбно нiчого завантажувати.
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
                  Вiдкрити ноутбук →
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.bonusEmpty}>
            Ноутбуки готуються — скоро тут з'являться готовi протоколи МОЗ,
            мiжнароднi гайдлайни та iншi корисни матерiали.
          </p>
        )}
        <p className={styles.bonusAudioNote}>
          🎧 Кожен ноутбук має Audio Overview — послухайте протокол як подкаст
        </p>
      </div>
    </div>
  );
}
