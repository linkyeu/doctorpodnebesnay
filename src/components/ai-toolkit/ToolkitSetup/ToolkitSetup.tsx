import { useState } from 'react';
import { essentialSetupSections, advancedSetupSections } from '../../../data/ai-toolkit';
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

export default function ToolkitSetup() {
  const [advancedOpen, setAdvancedOpen] = useState(false);

  return (
    <section className={styles.section}>
      <div className={styles.container} id="setup">
        <h2 className={styles.heading}>
          Налаштування iнструментiв
        </h2>

        <div className={styles.freeBanner}>
          Все налаштування нижче працюють на безкоштовному планi ChatGPT та Perplexity
        </div>

        <div className={styles.setupList}>
          {essentialSetupSections.map((section, index) => (
            <div key={section.id} className={styles.setupCard}>
              <div className={styles.cardHeader}>
                <span className={styles.stepNumber}>{index + 1}</span>
                <h3 className={styles.setupTitle}>{section.title}</h3>
                <span className={styles.freeBadge}>Безкоштовно</span>
              </div>
              <SetupCardContent section={section} />
            </div>
          ))}
        </div>

        <button
          type="button"
          className={styles.advancedToggle}
          onClick={() => setAdvancedOpen(!advancedOpen)}
          aria-expanded={advancedOpen}
        >
          <span className={`${styles.chevron} ${advancedOpen ? styles.chevronOpen : ''}`}>
            &#9656;
          </span>
          <span>Коли освоїтесь — додатковi налаштування ({advancedSetupSections.length})</span>
        </button>

        <div className={`${styles.advancedContent} ${advancedOpen ? styles.advancedContentOpen : ''}`}>
          <div className={styles.setupList}>
            {advancedSetupSections.map((section) => (
              <div key={section.id} className={styles.setupCard}>
                <h3 className={styles.setupTitle} style={{ marginBottom: 'var(--space-3)' }}>
                  {section.title}
                </h3>
                <SetupCardContent section={section} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
