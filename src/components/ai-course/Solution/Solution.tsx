import { useState } from 'react';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import {
  howItWorksSteps,
  howItWorksFooter,
  // workflowExamples,
  // workflowExamplesFooter,
} from '../../../data/ai-course';
// import type { WorkflowExample } from '../../../data/ai-course';
import styles from './Solution.module.css';

// WorkflowCard temporarily hidden — re-enable with workflow examples
// function WorkflowCard({ wf, index }: { wf: WorkflowExample; index: number }) {
//   const timeParts = wf.timeLabel.split('→');
//   const timeBefore = timeParts[0].trim();
//   const timeAfter = timeParts[1].trim();
//
//   return (
//     <div
//       className={styles.workflowCard}
//       style={{ '--card-index': index } as React.CSSProperties}
//     >
//       {/* Big multiplier hero */}
//       <div className={styles.wfHero}>
//         <span className={styles.multiplierBig}>{wf.multiplier}</span>
//         {wf.multiplierLabel && (
//           <span className={styles.multiplierSub}>{wf.multiplierLabel}</span>
//         )}
//       </div>
//
//       {/* Title */}
//       <h4 className={styles.workflowTitle}>{wf.title}</h4>
//
//       {/* "Crossed-out price" time comparison */}
//       <div className={styles.timeCompare}>
//         <span className={styles.timeOld}>{timeBefore}</span>
//         <span className={styles.timeArrow}>→</span>
//         <span className={styles.timeNew}>{timeAfter}</span>
//       </div>
//     </div>
//   );
// }

export default function Solution() {
  const sectionRef = useScrollReveal<HTMLElement>(0.1);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const handleImgError = (id: string) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section ref={sectionRef} className={`${styles.section} reveal`}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Ось як це працює</h2>
        <p className={styles.subheading}>
          Три кроки — від задачі до результату. Без IT-навичок.
        </p>

        {/* 3 Steps */}
        <div className={styles.timeline}>
          {howItWorksSteps.map((step, i) => (
            <div
              key={step.id}
              className={styles.step}
              style={{ '--card-index': i } as React.CSSProperties}
            >
              <div className={styles.illustrationWrapper}>
                {!imgErrors[step.id] ? (
                  <img
                    src={step.image}
                    alt=""
                    aria-hidden="true"
                    className={styles.illustration}
                    loading="lazy"
                    onError={() => handleImgError(step.id)}
                  />
                ) : (
                  <span className={styles.emojiFallback} aria-hidden="true">
                    {step.emoji}
                  </span>
                )}
              </div>

              <div className={styles.stepContent}>
                <div className={styles.stepNum}>{step.num}</div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepText}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <p className={styles.footer}>{howItWorksFooter}</p>

        {/* Workflow examples — temporarily hidden for marketing testing
        <div className={styles.workflows}>
          <h3 className={styles.workflowHeading}>Результати на практиці</h3>
          <div className={styles.workflowGrid}>
            {workflowExamples.map((wf, i) => (
              <WorkflowCard key={wf.id} wf={wf} index={i} />
            ))}
          </div>
          <p className={styles.workflowTagline}>
            Прийдеш додому на 2 години раніше.
          </p>
          <p className={styles.workflowFooter}>{workflowExamplesFooter}</p>
        </div>
        */}
      </div>
    </section>
  );
}
