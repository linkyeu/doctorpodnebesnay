import { useState, useCallback, type ReactNode } from 'react';
import type { Solution } from '../../../data/ai-toolkit';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import ToolBadge from '../ToolBadge/ToolBadge';
import PromptBox from '../PromptBox/PromptBox';
import StepBanner from '../StepBanner/StepBanner';
import ToolIntro from '../ToolIntro/ToolIntro';
import WorkflowSteps, { WorkflowMedia } from '../WorkflowSteps/WorkflowSteps';
import CopyablePrompts from '../CopyablePrompts/CopyablePrompts';
import styles from './SolutionCard.module.css';

function getToolUrl(tool: string): string {
  const urls: Record<string, string> = {
    'ChatGPT': 'https://chatgpt.com',
    'NotebookLM': 'https://notebooklm.google.com',
    'Perplexity': 'https://perplexity.ai',
  };
  const parts = tool.split(/\s*[+або]\s*/);
  for (const part of parts) {
    const trimmed = part.trim();
    if (urls[trimmed]) return urls[trimmed];
  }
  return '#';
}

function getToolDisplayName(tool: string): string {
  const primary = tool.split(/\s*[+або]\s*/)[0].trim();
  return primary === 'DeepL' ? 'ChatGPT' : primary;
}

/** Extract a short preview from the prompt text */
function getPreview(solution: Solution): string {
  if (solution.subtitle) return solution.subtitle;
  if (solution.promptNote) return solution.promptNote;
  const text = solution.prompt;
  if (!text) return '';
  const cut = text.slice(0, 120);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 60 ? cut.slice(0, lastSpace) : cut) + '…';
}

/**
 * Build a filled version of the prompt by replacing [PLACEHOLDER] with filled values.
 * Returns the full prompt text with filled values wrapped in {curly braces}.
 */
function buildFilledPrompt(prompt: string, values: Record<string, string>): string {
  let filled = prompt;
  for (const [key, value] of Object.entries(values)) {
    filled = filled.replace(`[${key}]`, `{${value}}`);
  }
  return filled;
}

/**
 * Highlights filled values {VALUE} in purple and remaining [PLACEHOLDER] in green.
 */
function highlightFilledPrompt(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  // Match {filled} or [placeholder]
  const regex = /\{([^}]+)\}|\[([^\]]+)\]/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[1] !== undefined) {
      // {filled value} — purple
      parts.push(
        <span key={match.index} className={styles.filledValue}>
          {match[1]}
        </span>,
      );
    } else if (match[2] !== undefined) {
      // [placeholder] — green (unfilled)
      parts.push(
        <span key={match.index} className={styles.unfilled}>
          [{match[2]}]
        </span>,
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

interface SolutionCardProps {
  solution: Solution;
  blockColor: string;
}

export default function SolutionCard({ solution, blockColor }: SolutionCardProps) {
  const revealRef = useScrollReveal<HTMLDivElement>();
  const [expanded, setExpanded] = useState(() => {
    return window.location.hash === `#solution-${solution.id}`;
  });
  const [copied, setCopied] = useState(false);
  const [exampleOpen, setExampleOpen] = useState(false);
  const cardType = solution.cardType ?? 'prompt';
  const hasPrompt = solution.prompt.length > 0;

  const toggle = useCallback(() => {
    setExpanded(prev => !prev);
  }, []);

  const handleCopyShortcut = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(solution.prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [solution.prompt]);

  const preview = getPreview(solution);

  // Only show example for cards with actual prompts (not pure NotebookLM workflow)
  const showExample = solution.example && hasPrompt;
  const hasValues = solution.example?.values && Object.keys(solution.example.values).length > 0;

  return (
    <div
      id={`solution-${solution.id}`}
      ref={revealRef}
      className={`${styles.card} reveal`}
      style={{ '--block-color': blockColor } as React.CSSProperties}
    >
      {/* Gradient header area */}
      <button
        type="button"
        className={styles.headerClickable}
        onClick={toggle}
        aria-expanded={expanded}
        aria-controls={`details-${solution.id}`}
      >
        <div className={styles.gradientHeader}>
          <div className={styles.headerTop}>
            <span className={styles.solutionId} aria-hidden="true"></span>
            <div className={styles.badges}>
              <ToolBadge tool={solution.tool} />
            </div>
          </div>
          {solution.illustration ? (
            <div className={styles.titleRow}>
              <img
                src={solution.illustration}
                alt=""
                aria-hidden="true"
                className={styles.titleIllustration}
                width="64"
                height="64"
                loading="lazy"
              />
              <div>
                <h3 className={styles.title}>{solution.title}</h3>
                {solution.subtitle && (
                  <p className={styles.subtitle}>{solution.subtitle}</p>
                )}
              </div>
            </div>
          ) : (
            <>
              <h3 className={styles.title}>{solution.title}</h3>
              {solution.subtitle && (
                <p className={styles.subtitle}>{solution.subtitle}</p>
              )}
            </>
          )}
        </div>

        {/* White content area */}
        <div className={styles.body}>
          {!expanded && !solution.subtitle && preview && (
            <p className={styles.preview}>{preview}</p>
          )}
          <svg
            className={`${styles.chevron} ${expanded ? styles.chevronExpanded : ''}`}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>

      {/* Copy shortcut in collapsed state — only for prompt cards */}
      {!expanded && cardType === 'prompt' && (
        <div style={{ padding: '0 1rem 0.75rem' }}>
          <button
            type="button"
            className={styles.copyShortcut}
            onClick={handleCopyShortcut}
            aria-label="Скопіювати запит"
          >
            {copied ? '✓ Скопійовано' : '📋 Копіювати запит'}
          </button>
        </div>
      )}

      {/* Collapsible details */}
      <div
        id={`details-${solution.id}`}
        className={styles.details}
        data-expanded={expanded}
        role="region"
        aria-labelledby={`title-${solution.id}`}
      >
        <div className={styles.detailsInner}>
          <div className={styles.expandedContent}>
            {/* Tool intro — for workflow/hybrid cards */}
            {solution.toolIntro && <ToolIntro intro={solution.toolIntro} />}

            {/* Step banner for prompt cards */}
            {cardType === 'prompt' && (
              <StepBanner
                toolUrl={getToolUrl(solution.tool)}
                toolName={getToolDisplayName(solution.tool)}
              />
            )}

            {/* Content depends on card type */}
            {cardType === 'prompt' ? (
              <PromptBox prompt={solution.prompt} note={solution.promptNote} />
            ) : cardType === 'hybrid' && solution.prompt ? (
              <>
                {solution.steps && (
                  <WorkflowSteps steps={solution.steps} hideMedia />
                )}
                <PromptBox prompt={solution.prompt} note={solution.promptNote} />
                {solution.steps && (
                  <WorkflowMedia steps={solution.steps} />
                )}
                {solution.copyablePrompts && (
                  <CopyablePrompts groups={solution.copyablePrompts} heading={solution.copyablePrompts.length > 1 ? 'Приклади запитів' : undefined} />
                )}
              </>
            ) : (
              <>
                {solution.steps && (
                  <WorkflowSteps steps={solution.steps} note={solution.promptNote} />
                )}
                {solution.copyablePrompts && (
                  <CopyablePrompts groups={solution.copyablePrompts} heading={solution.copyablePrompts.length > 1 ? 'Приклади запитів' : undefined} />
                )}
              </>
            )}

            {/* Example accordion — only for cards with actual prompts */}
            {showExample && (
              <div className={styles.exampleAccordion}>
                <button
                  type="button"
                  className={styles.exampleToggle}
                  onClick={() => setExampleOpen(prev => !prev)}
                  aria-expanded={exampleOpen}
                >
                  <span>💡 Приклад заповнення</span>
                  <svg
                    className={`${styles.exampleChevron} ${exampleOpen ? styles.exampleChevronOpen : ''}`}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div
                  className={styles.exampleContent}
                  data-open={exampleOpen}
                >
                  <div className={styles.exampleInner}>
                    {hasValues ? (
                      <div className={styles.examplePromptArea}>
                        <pre className={styles.filledPrompt}>
                          {highlightFilledPrompt(
                            buildFilledPrompt(solution.prompt, solution.example!.values!)
                          )}
                        </pre>
                      </div>
                    ) : (
                      <div className={styles.examplePromptArea}>
                        <pre className={styles.exampleText}>{solution.example!.input}</pre>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Ready notebooks bonus */}
            {solution.readyNotebooks && solution.readyNotebooks.length > 0 && (
              <div className={styles.readyNotebook}>
                <span className={styles.readyNotebookBadge}>✨ Бонус</span>
                <div>
                  <div className={styles.readyNotebookTitle}>Ми підготували чати з деякими протоколами для вас</div>
                  <div className={styles.readyNotebookSubtitle}>Оберіть тему та просто задавайте питання ШІ</div>
                  <div className={styles.readyNotebookLinks}>
                    {solution.readyNotebooks.map((nb) => (
                      <a
                        key={nb.id}
                        href={nb.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.readyNotebookLink}
                      >
                        {nb.title} →
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
