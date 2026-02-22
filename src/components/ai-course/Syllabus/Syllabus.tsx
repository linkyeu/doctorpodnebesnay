// Component unused after digital product pivot — kept for potential re-enabling
import { useState } from 'react';
import styles from './Syllabus.module.css';

interface SyllabusModule {
  id: string;
  number: number;
  title: string;
  description: string;
}

const syllabusModules: SyllabusModule[] = [
  { id: 'mod-1', number: 1, title: 'Як працює ШІ — без зайвої теорії', description: 'Що насправді вміє ChatGPT, Claude, Gemini — і де їхні межі.' },
  { id: 'mod-2', number: 2, title: 'Промпт-інженерія для лікарів', description: 'Як правильно формулювати запити, щоб отримувати точні та корисні відповіді.' },
  { id: 'mod-3', number: 3, title: 'Документація за хвилини', description: 'Виписки, щоденники, направлення, листи пацієнтам — готові шаблони для copy-paste.' },
  { id: 'mod-4', number: 4, title: 'ШІ як друга думка', description: 'Диференціальна діагностика, перевірка гіпотез, аналіз симптомів з розумінням обмежень.' },
  { id: 'mod-5', number: 5, title: 'Пошук доказової бази та літератури', description: 'Як знаходити відповіді на клінічні питання за секунди.' },
  { id: 'mod-6', number: 6, title: 'Безпека та етика', description: 'Що можна вводити в ШІ, що — ні. Приватність пацієнтів, захист персональних даних, закон.' },
  { id: 'mod-7', number: 7, title: 'ШІ-інструменти для лікаря', description: 'Повний огляд з прикладами — від безкоштовних до платних.' },
  { id: 'mod-8', number: 8, title: 'Автоматизація рутини', description: 'Як зекономити 1-2 години щодня на адміністративних задачах.' },
  { id: 'mod-9', number: 9, title: 'Практикум', description: 'Реальні медичні кейси від Др. Піднебесної — робимо разом.' },
];

export default function Syllabus() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Програма курсу</h2>
        <div className={styles.list}>
          {syllabusModules.map((mod) => {
            const isOpen = openId === mod.id;
            return (
              <div key={mod.id} className={styles.item}>
                <button
                  className={styles.trigger}
                  onClick={() => toggle(mod.id)}
                  aria-expanded={isOpen}
                  aria-controls={`syllabus-panel-${mod.id}`}
                >
                  <span className={styles.moduleNumber}>{mod.number}</span>
                  <span className={styles.moduleTitle}>{mod.title}</span>
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
                  id={`syllabus-panel-${mod.id}`}
                  role="region"
                  className={`${styles.panel} ${isOpen ? styles.panelOpen : ''}`}
                >
                  <div className={styles.panelInner}>
                    <p className={styles.description}>{mod.description}</p>
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
