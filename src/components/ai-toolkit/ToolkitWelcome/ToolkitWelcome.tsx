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
        <p className={styles.title}>16 рішень. 2 інструменти.</p>
        <div className={styles.tools}>
          <p className={styles.tool}>
            <strong>ChatGPT</strong> — загальні питання, документи, готові запити
          </p>
          <p className={styles.tool}>
            <strong>NotebookLM</strong> — коли є конкретне джерело (протокол, стаття, книга, відео, сайт)
          </p>
        </div>
        <p className={styles.body}>
          Знайдіть задачу → дотримуйтесь простої інструкції з декількох кроків.
        </p>
      </div>
      <button type="button" className={styles.dismiss} onClick={dismiss}>
        Зрозуміло
      </button>
    </div>
  );
}
