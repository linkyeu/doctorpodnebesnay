import type { ToolIntro as ToolIntroData } from '../../../data/ai-toolkit';
import styles from './ToolIntro.module.css';

interface ToolIntroProps {
  intro: ToolIntroData;
}

export default function ToolIntro({ intro }: ToolIntroProps) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>{intro.text}</p>
      <a
        href={intro.url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        {intro.urlLabel} <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}
