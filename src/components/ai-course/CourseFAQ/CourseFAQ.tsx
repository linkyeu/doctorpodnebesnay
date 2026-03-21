import { useState } from 'react';
import { courseFaqItems } from '../../../data/ai-course-faq';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import styles from './CourseFAQ.module.css';

export default function CourseFAQ() {
  const [openId, setOpenId] = useState<string | null>(courseFaqItems[0]?.id ?? null);
  const ref = useScrollReveal<HTMLDivElement>();

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className={styles.section} id="faq">
      <div className={`${styles.container} reveal`} ref={ref}>
        <h2 className={styles.heading}>Часті запитання</h2>

        <div className={styles.list}>
          {courseFaqItems.map((item, index) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}
              >
                <button
                  className={styles.trigger}
                  onClick={() => toggle(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`course-faq-panel-${item.id}`}
                  id={`course-faq-trigger-${item.id}`}
                >
                  <span className={styles.num} aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className={styles.question}>{item.question}</span>
                  <span
                    className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`}
                    aria-hidden="true"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
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
                  id={`course-faq-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`course-faq-trigger-${item.id}`}
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
