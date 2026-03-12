import styles from './WorkflowSteps.module.css';

interface WorkflowStepsProps {
  steps: string[];
  note?: string;
}

export default function WorkflowSteps({ steps, note }: WorkflowStepsProps) {
  return (
    <div className={styles.wrapper}>
      <h4 className={styles.heading}>Як зробити:</h4>
      <ol className={styles.list}>
        {steps.map((step, i) => (
          <li key={i} className={styles.step}>{step}</li>
        ))}
      </ol>
      {note && <p className={styles.note}>{note}</p>}
    </div>
  );
}
