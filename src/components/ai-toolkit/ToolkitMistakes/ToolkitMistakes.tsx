import { mistakes } from '../../../data/ai-toolkit';
import styles from './ToolkitMistakes.module.css';

export default function ToolkitMistakes() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>
          Типові помилки при роботі з ШІ
        </h2>
        <p className={styles.subtitle}>
          Ми перевірили кожен запит на реальних задачах — ось що знайшли
        </p>
        <div className={styles.grid}>
          {mistakes.map((m) => (
            <div key={m.id} className={styles.card}>
              <div className={styles.cardEmoji}>{m.emoji}</div>
              <h3 className={styles.cardTitle}>{m.title}</h3>
              <p className={styles.cardStat}>{m.stat}</p>
              <p className={styles.cardSource}>{m.statSource}</p>
              <p className={styles.cardFix}>{m.fix}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
