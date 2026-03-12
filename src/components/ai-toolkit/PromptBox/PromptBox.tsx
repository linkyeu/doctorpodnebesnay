import { useState, useCallback, type ReactNode } from 'react';
import styles from './PromptBox.module.css';

interface PromptBoxProps {
  prompt: string;
  note?: string;
}

/**
 * Highlights [PLACEHOLDER] tokens inside a prompt string.
 * Returns an array of ReactNode fragments.
 */
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

export default function PromptBox({ prompt, note }: PromptBoxProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [prompt]);

  return (
    <div className={styles.wrapper}>
      {copied ? (
        <span className={styles.toast}>Скопійовано!</span>
      ) : (
        <button
          type="button"
          className={styles.copyBtn}
          onClick={handleCopy}
          aria-label="Скопіювати промпт"
        >
          📋 Скопіювати
        </button>
      )}

      {note && <p className={styles.note}>{note}</p>}

      <pre className={styles.prompt}>{highlightPlaceholders(prompt)}</pre>
    </div>
  );
}
