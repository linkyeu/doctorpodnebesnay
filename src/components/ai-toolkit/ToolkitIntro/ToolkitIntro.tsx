import { aiPitfalls } from '../../../data/ai-toolkit';
import styles from './ToolkitIntro.module.css';

export function AiPitfalls() {
  return (
    <>
      <div className={styles.pitfallList}>
        {aiPitfalls.map((pitfall) => (
          <div key={pitfall.id} className={styles.pitfallCard}>
            <img
              src={pitfall.image}
              alt=""
              aria-hidden="true"
              className={styles.pitfallImage}
              loading="lazy"
            />
            <div className={styles.pitfallText}>
              <h4 className={styles.pitfallTitle}>{pitfall.title}</h4>
              <p className={styles.pitfallDescription}>{pitfall.description}</p>
              <p className={styles.pitfallSolution}>&#x2705; {pitfall.solution}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default function ToolkitIntro() {
  return <AiPitfalls />;
}
