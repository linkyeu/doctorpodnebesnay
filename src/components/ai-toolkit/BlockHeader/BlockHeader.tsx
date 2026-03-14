import type { Block } from '../../../data/ai-toolkit';
import styles from './BlockHeader.module.css';

function pluralize(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return 'рішення';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'рішення';
  return 'рішень';
}

interface BlockHeaderProps {
  block: Block;
  expanded?: boolean;
  onToggle?: () => void;
}

export default function BlockHeader({ block, expanded, onToggle }: BlockHeaderProps) {
  const isCollapsible = expanded !== undefined && onToggle !== undefined;
  const contentId = `block-${block.id}-content`;

  const inner = (
    <div className={styles.content}>
      <div className={styles.accentLine} />
      <div className={styles.row}>
        <span className={styles.letterPill}>
          {block.id}
        </span>
        <div className={styles.text}>
          <h2 className={styles.title}>{block.title}</h2>
          <p className={styles.subtitle}>{block.subtitle}</p>
        </div>
        <span className={styles.count}>
          {block.solutions.length} {pluralize(block.solutions.length)}
        </span>
        {isCollapsible && (
          <span className={`${styles.chevron} ${expanded ? styles.chevronOpen : ''}`} aria-hidden="true" />
        )}
      </div>
    </div>
  );

  if (isCollapsible) {
    return (
      <button
        type="button"
        id={`block-${block.id}`}
        className={`${styles.header} ${styles.headerButton}`}
        style={{ '--block-color': block.color } as React.CSSProperties}
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={contentId}
      >
        {inner}
      </button>
    );
  }

  return (
    <div
      id={`block-${block.id}`}
      className={styles.header}
      style={{ '--block-color': block.color } as React.CSSProperties}
    >
      {inner}
    </div>
  );
}
