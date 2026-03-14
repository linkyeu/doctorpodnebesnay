import { useState } from 'react';
import styles from './ToolkitWelcome.module.css';

const STORAGE_KEY = 'toolkit_welcome_dismissed';

export default function ToolkitWelcome() {
  const [visible, setVisible] = useState(() => {
    return !localStorage.getItem(STORAGE_KEY);
  });

  if (!visible) return null;

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, '1');
    setVisible(false);
  };

  return (
    <div className={styles.banner} role="status">
      <div className={styles.content}>
        <p className={styles.title}>16 готових рішень для щоденної практики</p>
        <div className={styles.tools}>
          <p className={styles.tool}>
            Знайдіть свою задачу → скопіюйте запит → вставте в <strong>ChatGPT</strong> або <strong>NotebookLM</strong>
          </p>
        </div>
        <p className={styles.body}>
          Кожне рішення — покрокова інструкція з готовим запитом. Працює з безкоштовними інструментами.
        </p>
      </div>
      <button type="button" className={styles.dismiss} onClick={dismiss}>
        Закрити
      </button>
    </div>
  );
}
