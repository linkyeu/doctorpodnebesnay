import { useState, useCallback, type ReactNode } from 'react';
import type { CopyablePromptGroup } from '../../../data/ai-toolkit';
import styles from './CopyablePrompts.module.css';

interface CopyablePromptsProps {
  groups: CopyablePromptGroup[];
  heading?: string;
}

function highlightPlaceholders(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const regex = /\[([^\]]+)\]/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <span key={match.index} className={styles.placeholder}>
        [{match[1]}]
      </span>,
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

function CopyablePrompt({ prompt }: { prompt: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [prompt]);

  return (
    <div className={styles.promptRow}>
      <pre className={styles.promptText}>{highlightPlaceholders(prompt)}</pre>
      {copied ? (
        <span className={styles.toast}>✓</span>
      ) : (
        <button
          type="button"
          className={styles.copyBtn}
          onClick={handleCopy}
          aria-label="Скопіювати запит"
        >
          📋
        </button>
      )}
    </div>
  );
}

export default function CopyablePrompts({ groups, heading }: CopyablePromptsProps) {
  return (
    <div className={styles.wrapper}>
      {heading && <h4 className={styles.heading}>{heading}</h4>}
      {groups.map((group, gi) => (
        <div key={gi} className={styles.group}>
          <h4 className={styles.groupLabel}>{group.label}</h4>
          <div className={styles.promptList}>
            {group.prompts.map((prompt, pi) => (
              <CopyablePrompt key={pi} prompt={prompt} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
