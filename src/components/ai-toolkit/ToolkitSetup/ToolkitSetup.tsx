import { setupSections } from '../../../data/ai-toolkit';
import PromptBox from '../PromptBox/PromptBox';
import styles from './ToolkitSetup.module.css';


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
      {/* Full setup walkthrough video */}
      <div className={styles.setupVideoWrapper}>
        <video
          className={styles.setupVideo}
          controls
          preload="metadata"
          poster="/images/toolkit/setup/settings-full.webp"
        >
          <source src="/images/toolkit/setup/settings-full.webm" type="video/webm" />
          <source src="/images/toolkit/setup/settings-full.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Direct link to ChatGPT */}
      <a
        href="https://chatgpt.com"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.setupToolLink}
      >
        Відкрити ChatGPT ↗
      </a>

      {/* Copyable custom instructions — same PromptBox as solution cards */}
      {b1.codeBlocks?.[0] && (
        <PromptBox
          prompt={b1.codeBlocks[0].code}
          note="Скопіюйте та вставте в «Спеціальні інструкції», замінивши виділені поля на свої дані"
        />
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
