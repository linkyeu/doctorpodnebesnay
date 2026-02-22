import styles from './CommonDoubts.module.css';
import { commonDoubts } from '../../../data/ai-course';

export default function CommonDoubts() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Часті сумніви</h2>
        <div className={styles.list}>
          {commonDoubts.map((item) => (
            <div key={item.id} className={styles.row}>
              <blockquote className={styles.objection}>{item.objection}</blockquote>
              <p className={styles.answer}>{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
