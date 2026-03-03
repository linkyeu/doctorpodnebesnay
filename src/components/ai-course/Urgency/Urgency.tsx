import styles from './Urgency.module.css';

export default function Urgency() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.line}>Пацієнти стають вимогливішими.</p>
        <p className={styles.line}>Темп медицини зростає.</p>
        <p className={styles.line}>Конкуренція — теж.</p>
        <p className={styles.punchline}>
          Питання не в тому, чи використовувати ШІ.
          <br />
          Питання — чи будете ви використовувати його <em>краще за інших</em>.
        </p>
      </div>
    </section>
  );
}
