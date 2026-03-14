import { showcaseVideos } from '../../../data/ai-toolkit';
import DemoVideo from '../DemoVideo/DemoVideo';
import styles from './NotebookLMShowcase.module.css';

export default function NotebookLMShowcase() {
  if (showcaseVideos.length === 0) return null;

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <svg className={styles.icon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
        <h3 className={styles.heading}>Суперсила NotebookLM</h3>
      </div>
      <p className={styles.intro}>
        Подивiться, як NotebookLM працює з реальними протоколами — вiдповiдi з цитатами та номерами сторiнок за секунди.
      </p>
      <div className={styles.list}>
        {showcaseVideos.map((v) => (
          <DemoVideo key={v.id} {...v} />
        ))}
      </div>
    </div>
  );
}
