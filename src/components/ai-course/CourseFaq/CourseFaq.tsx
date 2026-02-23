import { useState } from 'react';
import styles from './CourseFaq.module.css';
import { courseFaqItems } from '../../../data/ai-course';

export default function CourseFaq() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Часті запитання</h2>
        <div className={styles.list}>
          {courseFaqItems.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className={styles.item}>
                <button
                  className={styles.trigger}
                  onClick={() => toggle(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${item.id}`}
                >
                  <span className={styles.question}>{item.question}</span>
                  <span
                    className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`}
                    aria-hidden="true"
                  >
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M10 4v12M4 10h12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </button>
                <div
                  id={`faq-panel-${item.id}`}
                  role="region"
                  className={`${styles.panel} ${isOpen ? styles.panelOpen : ''}`}
                >
                  <div className={styles.panelInner}>
                    <p className={styles.answer}>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
