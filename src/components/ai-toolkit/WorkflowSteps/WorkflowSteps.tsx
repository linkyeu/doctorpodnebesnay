import type { SolutionStep } from '../../../data/ai-toolkit';
import styles from './WorkflowSteps.module.css';

interface WorkflowStepsProps {
  steps: SolutionStep[];
  note?: string;
}

export default function WorkflowSteps({ steps, note }: WorkflowStepsProps) {
  return (
    <div className={styles.wrapper}>
      <h4 className={styles.heading}>Як зробити:</h4>
      <ol className={styles.list}>
        {steps.map((step, i) => (
          <li key={i} className={styles.step}>
            <span className={styles.stepText}>{step.text}</span>
            {step.screenshot && (
              <figure className={styles.screenshotFigure}>
                <div className={styles.screenshotWrapper}>
                  {step.screenshot.placeholder ? (
                    <div className={styles.placeholder}>
                      <span className={styles.placeholderText}>{step.screenshot.placeholder}</span>
                    </div>
                  ) : step.screenshot.video ? (
                    <>
                      <video
                        className={styles.screenshotVideo}
                        autoPlay muted loop playsInline preload="none"
                        poster={step.screenshot.src}
                      >
                        <source src={step.screenshot.video.webm} type="video/webm" />
                        <source src={step.screenshot.video.mp4} type="video/mp4" />
                      </video>
                      <img className={styles.screenshotImgFallback} src={step.screenshot.src} alt={step.screenshot.alt} loading="lazy" />
                    </>
                  ) : (
                    <img className={styles.screenshotImg} src={step.screenshot.src} alt={step.screenshot.alt} loading="lazy" />
                  )}
                </div>
                {step.screenshot.caption && <figcaption className={styles.screenshotCaption}>{step.screenshot.caption}</figcaption>}
              </figure>
            )}
          </li>
        ))}
      </ol>
      {note && <p className={styles.note}>{note}</p>}
    </div>
  );
}
