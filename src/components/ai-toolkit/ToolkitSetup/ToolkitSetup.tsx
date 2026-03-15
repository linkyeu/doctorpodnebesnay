import { useState } from 'react';
import { setupSections } from '../../../data/ai-toolkit';
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
      {copied ? '✓ Скопійовано' : 'Копіювати'}
    </button>
  );
}

/** Full-width screenshot with caption — supports optional video overlay */
export function Screenshot({
  src,
  alt,
  caption,
  video,
}: {
  src: string;
  alt: string;
  caption?: string;
  video?: { mp4: string; webm: string };
}) {
  return (
    <figure className={styles.screenshotFigure}>
      <div className={styles.screenshotWrapper}>
        {video ? (
          <>
            <video
              className={styles.screenshotVideo}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              poster={src}
            >
              <source src={video.webm} type="video/webm" />
              <source src={video.mp4} type="video/mp4" />
            </video>
            {/* Static fallback for reduced motion */}
            <img className={styles.screenshotImgFallback} src={src} alt={alt} loading="lazy" />
          </>
        ) : (
          <img className={styles.screenshotImg} src={src} alt={alt} loading="lazy" />
        )}
      </div>
      {caption && <figcaption className={styles.screenshotCaption}>{caption}</figcaption>}
    </figure>
  );
}

/** Purpose callout — explains WHY this setting matters */
export function PurposeCallout({ text }: { text: string }) {
  return (
    <div className={styles.purposeCallout}>
      <span className={styles.purposeIcon} aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
      </span>
      <p className={styles.purposeText}>{text}</p>
    </div>
  );
}

/** Instruction step block — number + text + optional screenshot below */
export function InstructionStep({
  number,
  text,
  screenshot,
  variant,
}: {
  number: number;
  text: React.ReactNode;
  screenshot?: { src: string; alt: string; caption?: string; video?: { mp4: string; webm: string } };
  variant?: 'chatgpt' | 'notebooklm';
}) {
  const numClass = [
    styles.instructionStepNum,
    variant === 'chatgpt' && styles.instructionStepNum_chatgpt,
    variant === 'notebooklm' && styles.instructionStepNum_notebooklm,
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.instructionStep}>
      <div className={styles.instructionStepRow}>
        <span className={numClass}>{number}</span>
        <p className={styles.instructionStepText}>{text}</p>
      </div>
      {screenshot && (
        <Screenshot src={screenshot.src} alt={screenshot.alt} caption={screenshot.caption} video={screenshot.video} />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ChatGPT Subsection
   ═══════════════════════════════════════════════════════════════ */

export function ChatGPTSetup() {
  const b1 = setupSections.find(s => s.id === 'B1')!;

  return (
    <div className={styles.setupCard}>
      {/* Single video — full setup walkthrough */}
      <div className={styles.setupVideoWrapper}>
        <div className={styles.setupVideoPlaceholder}>
          <span className={styles.setupVideoIcon} aria-hidden="true">🎬</span>
          <p className={styles.setupVideoTitle}>Відео: повне налаштування ChatGPT (90 сек)</p>
          <p className={styles.setupVideoDescription}>
            Відкриваємо Персоналізацію → вставляємо інструкції → обираємо стиль → вимикаємо навчання на даних → готово
          </p>
          <span className={styles.setupVideoTag}>Відео буде тут</span>
        </div>
      </div>

      {/* Copyable custom instructions — the only thing doctor needs to paste */}
      {b1.codeBlocks?.[0] && (
        <div className={styles.singleCodeBlock}>
          <div className={styles.singleCodeHeader}>
            <span className={styles.singleCodeLabel}>Скопіюйте та вставте в «Спеціальні інструкції», замінивши [СПЕЦІАЛЬНІСТЬ] та [ДОРОСЛИМИ / ДІТЬМИ / ВСІМА]:</span>
            <CopyButton text={b1.codeBlocks[0].code} />
          </div>
          <pre className={styles.codeContent}>{b1.codeBlocks[0].code}</pre>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Exports
   ═══════════════════════════════════════════════════════════════ */

export function ToolkitSetupContent() {
  return (
    <div className={styles.setupList}>
      <div className={styles.setupMotivation}>
        <span className={styles.setupMotivationIcon} aria-hidden="true">⚡</span>
        <p className={styles.setupMotivationText}>
          <strong>Навіщо налаштовувати?</strong> Всі запити з довідника працюють і без цього. Але з налаштуваннями ChatGPT запам'ятає вашу спеціальність і мову — відповіді будуть точнішими. 2 хвилини один раз.
        </p>
      </div>
      <img
        className={styles.setupHero}
        src="/images/toolkit/illustrations/setup-hero.png"
        alt=""
        aria-hidden="true"
        loading="lazy"
      />
      <ChatGPTSetup />
    </div>
  );
}

export default function ToolkitSetup() {
  return (
    <section className={styles.section}>
      <div className={styles.container} id="setup">
        <h2 className={styles.heading}>Налаштування iнструментiв</h2>
        <ToolkitSetupContent />
      </div>
    </section>
  );
}
