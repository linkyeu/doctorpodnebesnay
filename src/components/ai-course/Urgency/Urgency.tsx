import styles from './Urgency.module.css';

export default function Urgency() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.line}>Колега робить виписку за 5 хвилин. Ви — за 40.</p>
        <p className={styles.line}>Пацієнт приходить з роздруківкою від ChatGPT — і чекає пояснень.</p>
        <p className={styles.line}>Нові протоколи виходять швидше, ніж ви встигаєте читати.</p>
        <p className={styles.punchline}>
          Питання не в тому, чи використовувати ШІ.
          <br />
          Питання — чи будете ви використовувати його <em>краще за інших</em>
        </p>
      </div>
    </section>
  );
}
