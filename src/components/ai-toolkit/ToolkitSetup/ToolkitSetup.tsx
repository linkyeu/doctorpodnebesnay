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
      {copied ? '✓ Скопiйовано' : 'Копiювати'}
    </button>
  );
}

/** Full-width screenshot with caption — supports optional video overlay */
function Screenshot({
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
function PurposeCallout({ text }: { text: string }) {
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
function InstructionStep({
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

function ChatGPTSetup() {
  const b1 = setupSections.find(s => s.id === 'B1')!;
  const b4 = setupSections.find(s => s.id === 'B4')!;

  return (
    <div className={styles.subsection}>

      {/* ── Card 1: Custom Instructions ── */}
      <div className={styles.setupCard}>
        <div className={styles.cardHeader}>
          <h4 className={styles.setupTitle}>{b1.title}</h4>
        </div>

        <PurposeCallout text="Навiщо: без цього налаштування ChatGPT кожного разу починає з нуля — не знає вашу спецiальнiсть, мову, стиль вiдповiдей. Налаштовуєте один раз — працює в кожнiй розмовi автоматично." />

        <InstructionStep
          number={1}
          variant="chatgpt"
          text={<>Натиснiть на аватар (внизу злiва) → <strong>Персоналiзацiя</strong></>}
          screenshot={b1.screenshots?.[0] ? {
            src: b1.screenshots[0].src,
            alt: b1.screenshots[0].alt,
            caption: undefined,
            video: b1.screenshots[0].video,
          } : undefined}
        />

        <InstructionStep
          number={2}
          variant="chatgpt"
          text={<>У <strong>«Базовий стиль i тон»</strong> оберiть <strong>«Професiйний»</strong></>}
          screenshot={b1.screenshots?.[2] ? {
            src: b1.screenshots[2].src,
            alt: b1.screenshots[2].alt,
            caption: undefined,
            video: b1.screenshots[2].video,
          } : undefined}
        />

        <InstructionStep
          number={3}
          variant="chatgpt"
          text={<>Прокрутiть до <strong>«Спецiальнi iнструкцiї»</strong> — скопiюйте та вставте текст нижче, замiнивши <strong>[СПЕЦIАЛЬНIСТЬ]</strong> та <strong>[ДОРОСЛИМИ / ДIТЬМИ / ВСIМА]</strong> на свої данi:</>}
          screenshot={b1.screenshots?.[3] ? {
            src: b1.screenshots[3].src,
            alt: b1.screenshots[3].alt,
            caption: undefined,
            video: b1.screenshots[3].video,
          } : undefined}
        />

        {b1.codeBlocks?.[0] && (
          <div className={styles.singleCodeBlock}>
            <div className={styles.singleCodeHeader}>
              <span className={styles.singleCodeLabel}>{b1.codeBlocks[0].label}</span>
              <CopyButton text={b1.codeBlocks[0].code} />
            </div>
            <pre className={styles.codeContent}>{b1.codeBlocks[0].code}</pre>
          </div>
        )}

        <InstructionStep
          number={4}
          variant="chatgpt"
          text={<>Заповнiть <strong>«Псевдонiм»</strong> (ваше iм'я) та <strong>«Професiя»</strong> (наприклад: сiмейний лiкар, педiатр)</>}
          screenshot={b1.screenshots?.[1] ? {
            src: b1.screenshots[1].src,
            alt: b1.screenshots[1].alt,
            caption: undefined,
            video: b1.screenshots[1].video,
          } : undefined}
        />

        {b4.screenshots?.[0] && (
          <InstructionStep
            number={5}
            variant="chatgpt"
            text={<>Налаштування → <strong>«Керування даними»</strong> → <strong>«Полiпшити модель для всiх»</strong> → ВИМКНIТЬ</>}
            screenshot={{
              src: b4.screenshots[0].src,
              alt: b4.screenshots[0].alt,
              caption: undefined,
              video: b4.screenshots[0].video,
            }}
          />
        )}

      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   NotebookLM Subsection
   ═══════════════════════════════════════════════════════════════ */

function NotebookLMSetup() {
  const b6 = setupSections.find(s => s.id === 'B6')!;

  return (
    <div className={styles.subsection}>
      <div className={`${styles.subsectionHeader} ${styles.subsectionHeader_notebooklm}`}>
        <svg className={styles.subsectionIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
        <h3 className={styles.subsectionTitle}>Налаштуйте NotebookLM</h3>
      </div>

      <div className={styles.setupCard}>
        <div className={styles.cardHeader}>
          <h4 className={styles.setupTitle}>{b6.title}</h4>
        </div>

        {b6.intro && <PurposeCallout text={b6.intro} />}

        <InstructionStep
          number={1}
          variant="notebooklm"
          text={<>Вiдкрийте <strong>notebooklm.google.com</strong> → увiйдiть через Google-акаунт → натиснiть <strong>"New notebook"</strong></>}
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
          text={<>Натиснiть <strong>"Add source"</strong> → оберiть <strong>"PDF"</strong> → завантажте один протокол або настанову</>}
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
          text={<>Задайте питання в чатi — наприклад: <strong>«Якi показання до призначення антибiотикiв?»</strong> — i отримайте вiдповiдь <strong>з цитатами та номерами сторiнок</strong></>}
          screenshot={b6.screenshots?.[2] ? {
            src: b6.screenshots[2].src,
            alt: b6.screenshots[2].alt,
            caption: undefined,
            video: b6.screenshots[2].video,
          } : undefined}
        />

        {b6.demoNotebookUrl && (
          <div className={styles.demoNotebookCallout}>
            <p className={styles.demoNotebookText}>
              Або почнiть з готового: ми пiдготували ноутбук з основними протоколами для сiмейного лiкаря
            </p>
            <a
              className={styles.demoNotebookLink}
              href={b6.demoNotebookUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Вiдкрити готовий ноутбук
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        )}

        {b6.note && <p className={styles.setupNote}>{b6.note}</p>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Exports
   ═══════════════════════════════════════════════════════════════ */

export function ToolkitSetupContent() {
  return (
    <div className={styles.setupList}>
      <ChatGPTSetup />
      <NotebookLMSetup />
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
