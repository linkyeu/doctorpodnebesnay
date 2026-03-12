import {
  safetyRules,
} from '../../../data/ai-toolkit';
import styles from './ToolkitIntro.module.css';

export function SafetyRules() {
  return (
    <div className={styles.safetyGrid}>
      {safetyRules.map((rule) => (
        <div key={rule.id} className={styles.safetyCard}>
          {rule.image && (
            <div className={styles.safetyImageWrapper}>
              <img
                src={rule.image}
                alt=""
                aria-hidden="true"
                className={styles.safetyImage}
                loading="lazy"
              />
            </div>
          )}
          <div className={styles.safetyCardBody}>
            <span className={styles.safetyNumber}>{rule.id}</span>
            <div className={styles.safetyContent}>
              <h4 className={styles.safetyTitle}>{rule.title}</h4>
              <p className={styles.safetyDescription}>{rule.description}</p>
              {rule.example && (
                <div className={styles.safetyExample}>
                  <div className={styles.exampleBad}>
                    <span className={styles.exampleLabel}>
                      &#x274C; Погано:
                    </span>{' '}
                    {rule.example.bad}
                  </div>
                  <div className={styles.exampleGood}>
                    <span className={styles.exampleLabel}>
                      &#x2705; Добре:
                    </span>{' '}
                    {rule.example.good}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ToolkitIntro() {
  return <SafetyRules />;
}
