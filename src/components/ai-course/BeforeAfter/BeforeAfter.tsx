import { useState } from 'react';
import styles from './BeforeAfter.module.css';
import { beforeAfterExample } from '../../../data/ai-course';

function PromptLine({ line }: { line: string }) {
  // Bold the label before first ":" or "—"
  const colonIdx = line.indexOf(':');
  const dashIdx = line.indexOf('—');
  let splitIdx = -1;
  if (colonIdx >= 0 && dashIdx >= 0) splitIdx = Math.min(colonIdx, dashIdx);
  else if (colonIdx >= 0) splitIdx = colonIdx;
  else if (dashIdx >= 0) splitIdx = dashIdx;

  if (splitIdx >= 0 && splitIdx < 30) {
    const sep = line[splitIdx];
    return (
      <p className={styles.promptLine}>
        <strong>{line.slice(0, splitIdx + (sep === ':' ? 1 : 0))}</strong>
        {sep === '—' ? ' — ' : ' '}
        {line.slice(splitIdx + (sep === ':' ? 1 : 1)).trimStart()}
      </p>
    );
  }
  return <p className={styles.promptLine}>{line}</p>;
}

export default function BeforeAfter() {
  const [promptOpen, setPromptOpen] = useState(false);
  const promptLines = beforeAfterExample.after.prompt.split('\n').filter(Boolean);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>{beforeAfterExample.heading}</h2>
        <p className={styles.scenario}>{beforeAfterExample.scenario}</p>

        <div className={styles.columns}>
          {/* Before */}
          <div className={`${styles.column} ${styles.beforeCol}`}>
            <div className={styles.label}>
              <span className={styles.labelIcon} aria-hidden="true">✗</span>
              {beforeAfterExample.before.label}
            </div>
            <p className={styles.beforeText}>{beforeAfterExample.before.text}</p>
          </div>

          {/* After */}
          <div className={`${styles.column} ${styles.afterCol}`}>
            <div className={styles.label}>
              <span className={styles.labelIcon} aria-hidden="true">✓</span>
              {beforeAfterExample.after.label}
            </div>

            <div className={styles.promptBlock}>
              <button
                className={styles.promptToggle}
                onClick={() => setPromptOpen(!promptOpen)}
                aria-expanded={promptOpen}
              >
                <span className={styles.promptToggleText}>Запит із довідника (скорочено)</span>
                <span className={`${styles.promptChevron} ${promptOpen ? styles.promptChevronOpen : ''}`}>
                  ▾
                </span>
              </button>

              {/* Preview line when collapsed */}
              {!promptOpen && (
                <p className={styles.promptPreview}>
                  Ти — сімейний лікар. Підбери антибіотикотерапію…
                </p>
              )}

              {/* Full prompt when expanded */}
              {promptOpen && (
                <div className={styles.prompt}>
                  {promptLines.map((line, i) => (
                    <PromptLine key={i} line={line} />
                  ))}
                </div>
              )}
            </div>

            <p className={styles.promptNote}>
              * Це спрощений приклад. У довіднику — готові промти, які ви копіюєте та вставляєте.
            </p>

            <p className={styles.afterResult}>{beforeAfterExample.after.result}</p>
          </div>
        </div>

        <p className={styles.footer}>{beforeAfterExample.footer}</p>
      </div>
    </section>
  );
}
