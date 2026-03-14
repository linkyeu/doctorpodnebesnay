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
  return (
    <div className={styles.wrapper}>
      <h4 className={styles.heading}>Як зробити:</h4>
      <ol className={styles.list}>
        {steps.map((step, i) => (
          <li key={i} className={styles.step}>
            <span className={styles.stepText}>
              <span className={styles.stepNumber}>{i + 1}</span>
              {parseStepText(step.text)}
            </span>
            {step.screenshot && (
              <figure className={styles.screenshotFigure}>
                <div className={styles.screenshotWrapper}>
                  {step.screenshot.placeholder ? (
                    <div className={styles.placeholder}>
                      <span className={styles.placeholderText}>{step.screenshot.placeholder}</span>
                    </div>
                  ) : step.screenshot.video ? (
                    <>
                      <video
                        className={styles.screenshotVideo}
                        autoPlay muted loop playsInline preload="none"
                        poster={step.screenshot.src}
                      >
                        <source src={step.screenshot.video.webm} type="video/webm" />
                        <source src={step.screenshot.video.mp4} type="video/mp4" />
                      </video>
                      <img className={styles.screenshotImgFallback} src={step.screenshot.src} alt={step.screenshot.alt} loading="lazy" />
                    </>
                  ) : (
                    <img className={styles.screenshotImg} src={step.screenshot.src} alt={step.screenshot.alt} loading="lazy" />
                  )}
                </div>
                {step.screenshot.caption && <figcaption className={styles.screenshotCaption}>{step.screenshot.caption}</figcaption>}
              </figure>
            )}
          </li>
        ))}
      </ol>
      {note && <p className={styles.note}>{parseStepText(note)}</p>}
    </div>
  );
}
