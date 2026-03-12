import styles from './ProTip.module.css';

interface ProTipProps {
  text: string;
}

export default function ProTip({ text }: ProTipProps) {
  return (
    <div className={styles.wrapper}>
      <span aria-hidden="true">{'\u{1F4A1}'} </span>
      <span className={styles.label}>Порада: </span>
      {text}
    </div>
  );
}
