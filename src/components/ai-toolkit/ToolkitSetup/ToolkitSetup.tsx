import { useState } from 'react';
import { essentialSetupSections } from '../../../data/ai-toolkit';
import type { SetupSection } from '../../../data/ai-toolkit';
import styles from './ToolkitSetup.module.css';

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button className={styles.copyButton} onClick={handleCopy} type="button">
      {copied ? '✓ Скопiйовано' : 'Копiювати'}
    </button>
  );
}

function SetupCardContent({ section }: { section: SetupSection }) {
  return (
    <>
      {section.intro && (
        <p className={styles.setupIntro}>{section.intro}</p>
      )}

      {section.steps && (
        <ol className={styles.setupSteps}>
          {section.steps.map((step) => (
            <li key={step} className={styles.setupStep}>{step}</li>
          ))}
        </ol>
      )}

      {section.screenshots?.map((shot) => (
        <figure key={shot.src} className={styles.screenshotFigure}>
          <div className={styles.screenshotWrapper}>
            <img
              className={styles.screenshotImg}
              src={shot.src}
              alt={shot.alt}
              loading="lazy"
            />
          </div>
          {shot.caption && (
            <figcaption className={styles.screenshotCaption}>{shot.caption}</figcaption>
          )}
        </figure>
      ))}

      {section.codeBlocks?.map((block) => (
        <div key={block.label} className={styles.codeBlock}>
          <div className={styles.codeHeader}>
            <span className={styles.codeLabel}>{block.label}</span>
            <CopyButton text={block.code} />
          </div>
          <pre className={styles.codeContent}>{block.code}</pre>
        </div>
      ))}

      {section.table && (
        <div className={styles.tableWrapper}>
          <table className={styles.setupTable}>
            <thead>
              <tr>
                {section.table.headers.map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, rowIndex) => (
                <tr
                  key={row[0]}
                  className={
                    section.id === 'B3'
                      ? rowIndex === 0 ? styles.highlightRow : styles.mutedRow
                      : undefined
                  }
                >
                  {row.map((cell, i) => (
                    <td key={i} className={i === 0 ? styles.termCell : undefined}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {section.examples && (
        <div className={styles.examplesList}>
          <p className={styles.examplesLabel}>Напишiть цi фрази у будь-якому чатi з ChatGPT:</p>
          <ul className={styles.examplesUl}>
            {section.examples.map((ex) => (
              <li key={ex} className={styles.exampleItem}>{ex}</li>
            ))}
          </ul>
        </div>
      )}

      {section.note && (
        <p className={styles.setupNote}>{section.note}</p>
      )}
    </>
  );
}

export function ToolkitSetupContent() {
  return (
    <div className={styles.setupList}>
      {essentialSetupSections.map((section, index) => (
        <div key={section.id} className={styles.setupCard}>
          <div className={styles.cardHeader}>
            <span className={styles.stepNumber}>{index + 1}</span>
            <h3 className={styles.setupTitle}>{section.title}</h3>
          </div>
          <SetupCardContent section={section} />
        </div>
      ))}
    </div>
  );
}

export default function ToolkitSetup() {
  return (
    <section className={styles.section}>
      <div className={styles.container} id="setup">
        <h2 className={styles.heading}>
          Налаштування iнструментiв
        </h2>

        <div className={styles.setupList}>
          {essentialSetupSections.map((section, index) => (
            <div key={section.id} className={styles.setupCard}>
              <div className={styles.cardHeader}>
                <span className={styles.stepNumber}>{index + 1}</span>
                <h3 className={styles.setupTitle}>{section.title}</h3>
              </div>
              <SetupCardContent section={section} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
