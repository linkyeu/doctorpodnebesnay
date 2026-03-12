import { useState, useEffect, useCallback } from 'react';
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
  // Try each part of "DeepL + ChatGPT" until we find a known URL
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

interface SolutionCardProps {
  solution: Solution;
  blockColor: string;
}

export default function SolutionCard({ solution, blockColor }: SolutionCardProps) {
  const revealRef = useScrollReveal<HTMLDivElement>();
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const cardType = solution.cardType ?? 'prompt';

  useEffect(() => {
    if (window.location.hash === `#solution-${solution.id}`) {
      setExpanded(true);
    }
  }, [solution.id]);

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

  return (
    <div
      id={`solution-${solution.id}`}
      ref={revealRef}
      className={`${styles.card} reveal`}
      style={{ '--block-color': blockColor } as React.CSSProperties}
    >
      <div className={styles.topBar} />

      <div className={styles.body}>
        {/* Clickable header */}
        <button
          type="button"
          className={styles.headerClickable}
          onClick={toggle}
          aria-expanded={expanded}
          aria-controls={`details-${solution.id}`}
        >
          <div className={styles.headerContent}>
            <div className={styles.header}>
              <h3 className={styles.title}>
                <span className={styles.solutionId}>{solution.id}</span>
                {solution.title}
              </h3>
              <ToolBadge tool={solution.tool} />
            </div>
          </div>

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
        </button>

        {/* Copy shortcut in collapsed state — only for prompt cards */}
        {!expanded && cardType === 'prompt' && (
          <button
            type="button"
            className={styles.copyShortcut}
            onClick={handleCopyShortcut}
            aria-label="Скопіювати промпт"
          >
            {copied ? '✓ Скопійовано' : '📋 Копіювати промпт'}
          </button>
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
            {/* Tool intro — for workflow/hybrid cards */}
            {solution.toolIntro && <ToolIntro intro={solution.toolIntro} />}

            {/* Instruction line for prompt cards without a promptNote */}
            {cardType === 'prompt' && !solution.promptNote && (
              <p className={styles.toolInstruction}>
                → Скопіюйте промпт нижче і вставте в новий чат{' '}
                <a href={getToolUrl(solution.tool)} target="_blank" rel="noopener noreferrer">
                  {getToolDisplayName(solution.tool)}
                </a>
              </p>
            )}

            {/* Content depends on card type */}
            {cardType === 'prompt' ? (
              <PromptBox prompt={solution.prompt} note={solution.promptNote} />
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

            <div className={styles.example}>
              <h4 className={styles.exampleHeading}>
                {cardType === 'prompt' ? 'Приклад запиту' : 'Приклад результату'}
              </h4>
              <div className={styles.exampleCard}>
                <p className={styles.exampleText}>{solution.example.input}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
