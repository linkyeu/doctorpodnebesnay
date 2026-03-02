import styles from './Baggage.module.css';
import { baggageContent } from '../../../data/ai-course';

export default function Baggage() {
  // Split text at the metaphor to highlight it
  const metaphor = 'як рецепт без кухні';
  const parts = baggageContent.text.split(metaphor);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.block}>
          <h2 className={styles.heading}>{baggageContent.heading}</h2>
          <p className={styles.text}>
            {parts[0]}
            <span className={styles.highlight}>{metaphor}</span>
            {parts[1]}
          </p>
        </div>
      </div>
    </section>
  );
}
