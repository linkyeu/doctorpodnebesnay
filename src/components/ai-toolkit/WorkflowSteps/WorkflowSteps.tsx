import type { SolutionStep } from '../../../data/ai-toolkit';
import styles from './WorkflowSteps.module.css';

/**
 * Parse step text with inline markup:
 *   **bold**  → <strong>
 *   [text](url) → <a>
 */
function parseStepText(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  // Combined regex: match **bold** or [text](url)
  const re = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(text)) !== null) {
    // Push preceding plain text
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[1] !== undefined) {
      // **bold**
      parts.push(<strong key={match.index}>{match[1]}</strong>);
    } else if (match[2] !== undefined && match[3] !== undefined) {
      // [text](url) — strip ** from link text for bold links like [**NotebookLM**](url)
      const linkText = match[2].replace(/^\*\*(.+)\*\*$/, '$1');
      const isBold = linkText !== match[2];
      parts.push(
        <a key={match.index} href={match[3]} target="_blank" rel="noopener noreferrer" className={styles.stepLink} style={isBold ? { fontWeight: 'var(--weight-bold)' } : undefined}>
          {linkText}
        </a>
      );
    }
    lastIndex = match.index + match[0].length;
  }

  // Push trailing plain text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

interface WorkflowStepsProps {
  steps: SolutionStep[];
  note?: string;
}

export default function WorkflowSteps({ steps, note }: WorkflowStepsProps) {
  // Collect all screenshots/videos from steps to render after the list
  const media = steps
    .map((step, i) => step.screenshot ? { screenshot: step.screenshot, index: i } : null)
    .filter(Boolean) as { screenshot: NonNullable<SolutionStep['screenshot']>; index: number }[];

  return (
    <div className={styles.wrapper}>
      <h4 className={styles.heading}>Інструкція</h4>
      <ol className={styles.list}>
        {steps.map((step, i) => (
          <li key={i} className={styles.step}>
            <span className={styles.stepText}>
              <span className={styles.stepNumber}>{i + 1}</span>
              {parseStepText(step.text)}
            </span>
          </li>
        ))}
      </ol>
      {note && <p className={styles.note}>{parseStepText(note)}</p>}

      {/* Media section — screenshots and videos rendered after all steps */}
      {media.length > 0 && (
        <div className={styles.mediaSection}>
          {media.map(({ screenshot, index }) => (
            <figure key={index} className={styles.screenshotFigure}>
              <div className={styles.screenshotWrapper}>
                {screenshot.placeholder ? (
                  <div className={styles.placeholder}>
                    <span className={styles.placeholderText}>{screenshot.placeholder}</span>
                  </div>
                ) : screenshot.video ? (
                  <>
                    <video
                      className={styles.screenshotVideo}
                      autoPlay muted loop playsInline preload="none"
                      poster={screenshot.src}
                    >
                      <source src={screenshot.video.webm} type="video/webm" />
                      <source src={screenshot.video.mp4} type="video/mp4" />
                    </video>
                    <img className={styles.screenshotImgFallback} src={screenshot.src} alt={screenshot.alt} loading="lazy" />
                  </>
                ) : (
                  <img className={styles.screenshotImg} src={screenshot.src} alt={screenshot.alt} loading="lazy" />
                )}
              </div>
              {screenshot.caption && <figcaption className={styles.screenshotCaption}>{screenshot.caption}</figcaption>}
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
