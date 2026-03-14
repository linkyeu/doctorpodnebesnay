import { useState, useCallback } from 'react';
import type { Solution } from '../../../data/ai-toolkit';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import ToolBadge from '../ToolBadge/ToolBadge';
import PromptBox from '../PromptBox/PromptBox';
import ToolIntro from '../ToolIntro/ToolIntro';
import WorkflowSteps from '../WorkflowSteps/WorkflowSteps';
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
  if (solution.promptNote) return solution.promptNote;
  const text = solution.prompt;
  if (!text) return '';
  // Take first 120 chars, cut at last space
  const cut = text.slice(0, 120);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 60 ? cut.slice(0, lastSpace) : cut) + '…';
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
  const cardType = solution.cardType ?? 'prompt';

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
            <span className={styles.solutionId}>{solution.id}</span>
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
              <h3 className={styles.title}>{solution.title}</h3>
            </div>
          ) : (
            <h3 className={styles.title}>{solution.title}</h3>
          )}
        </div>

        {/* White content area */}
        <div className={styles.body}>
          {!expanded && preview && (
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
          <div style={{ padding: '0 1rem 1rem' }}>
            {/* Tool intro — for workflow/hybrid cards */}
            {solution.toolIntro && <ToolIntro intro={solution.toolIntro} />}

            {/* Instruction line for prompt cards */}
            {cardType === 'prompt' && (
              <p className={styles.toolInstruction}>
                → Скопіюйте запит, замініть <span className={styles.placeholderHint}>[виділене]</span> на ваші дані і вставте в{' '}
                <a href={getToolUrl(solution.tool)} target="_blank" rel="noopener noreferrer">
                  {getToolDisplayName(solution.tool)}
                </a>
              </p>
            )}

            {/* Content depends on card type */}
            {cardType === 'prompt' ? (
              <PromptBox prompt={solution.prompt} note={solution.promptNote} />
            ) : cardType === 'hybrid' && solution.prompt ? (
              <>
                <PromptBox prompt={solution.prompt} note={solution.promptNote} />
                {solution.steps && (
                  <WorkflowSteps steps={solution.steps} note="Перевiрка через NotebookLM:" />
                )}
                {solution.copyablePrompts && (
                  <CopyablePrompts groups={solution.copyablePrompts} />
                )}
              </>
            ) : (
              <>
                {solution.steps && (
                  <WorkflowSteps steps={solution.steps} note={solution.promptNote} />
                )}
                {solution.copyablePrompts && (
                  <CopyablePrompts groups={solution.copyablePrompts} />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
