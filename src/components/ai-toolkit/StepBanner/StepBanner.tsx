import styles from './StepBanner.module.css';

interface StepBannerProps {
  toolUrl: string;
  toolName: string;
}

export default function StepBanner({ toolUrl, toolName }: StepBannerProps) {
  return (
    <div className={styles.banner}>
      <div className={styles.step}>
        <span className={styles.number}>1</span>
        <span className={styles.label}>Скопіюйте запит</span>
      </div>
      <span className={styles.arrow} aria-hidden="true">→</span>
      <div className={styles.step}>
        <span className={styles.number}>2</span>
        <span className={styles.label}>
          Вставте в{' '}
          <a href={toolUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
            {toolName}
          </a>
        </span>
      </div>
      <span className={styles.arrow} aria-hidden="true">→</span>
      <div className={styles.step}>
        <span className={styles.number}>3</span>
        <span className={styles.label}>
          Замініть <span className={styles.highlight}>[виділене]</span>
        </span>
      </div>
    </div>
  );
}
