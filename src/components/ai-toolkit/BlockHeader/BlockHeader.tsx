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
}

export default function BlockHeader({ block }: BlockHeaderProps) {
  return (
    <div
      id={`block-${block.id}`}
      className={styles.header}
      style={{ '--block-color': block.color } as React.CSSProperties}
    >
      <div className={styles.topBar} />
      <div className={styles.content}>
        <div className={styles.badge}>
          <span className={styles.letter}>{block.id}</span>
        </div>
        <div className={styles.text}>
          <h2 className={styles.title}>{block.title}</h2>
          <p className={styles.subtitle}>{block.subtitle}</p>
          <span className={styles.count}>
            {block.solutions.length}{' '}
            {pluralize(block.solutions.length)}
          </span>
        </div>
      </div>
    </div>
  );
}
