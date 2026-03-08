import { useState, useEffect, useCallback } from 'react';
import type { Solution } from '../../../data/ai-toolkit';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import ToolBadge from '../ToolBadge/ToolBadge';
import PromptBox from '../PromptBox/PromptBox';
import ProTip from '../ProTip/ProTip';
import styles from './SolutionCard.module.css';

interface SolutionCardProps {
  solution: Solution;
  blockColor: string;
}

export default function SolutionCard({ solution, blockColor }: SolutionCardProps) {
  const revealRef = useScrollReveal<HTMLDivElement>();
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

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

        {/* Copy shortcut in collapsed state */}
        {!expanded && (
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
            <PromptBox prompt={solution.prompt} note={solution.promptNote} />

            <div className={styles.example}>
              <h4 className={styles.exampleHeading}>Приклад запиту</h4>
              <div className={styles.exampleCard}>
                <p className={styles.exampleText}>{solution.example.input}</p>
              </div>
            </div>

            {solution.proTip && <ProTip text={solution.proTip} />}
          </div>
        </div>
      </div>
    </div>
  );
}
