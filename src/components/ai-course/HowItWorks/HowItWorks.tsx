import styles from './HowItWorks.module.css';

const steps = [
  {
    num: '01',
    title: 'Купуєте доступ',
    text: 'Одноразова оплата — і довідник ваш назавжди.',
  },
  {
    num: '02',
    title: 'Відкриваєте потрібний розділ',
    text: 'Діагностика, документація, протоколи — обираєте задачу.',
  },
  {
    num: '03',
    title: 'Копіюєте рішення і працюєте',
    text: 'Готовий запит + інструкція. Результат — за хвилини.',
  },
];

export default function HowItWorks() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Як це працює</h2>
        <div className={styles.steps}>
          {steps.map((step, i) => (
            <div key={step.num} className={styles.step}>
              <span className={styles.num}>{step.num}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepText}>{step.text}</p>
              {i < steps.length - 1 && (
                <div className={styles.connector} aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
