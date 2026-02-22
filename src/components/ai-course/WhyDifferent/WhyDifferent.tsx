// Component unused after digital product pivot — kept for potential re-enabling
import styles from './WhyDifferent.module.css';

interface Differentiator {
  id: string;
  text: string;
  bold: string;
}

const whyDifferentHeading = 'Це не ще один вебінар про нейронні мережі';

const differentiators: Differentiator[] = [
  { id: 'diff-1', bold: 'Нуль теорії заради теорії.', text: 'Тільки те, що ви будете юзати завтра вранці.' },
  { id: 'diff-2', bold: 'Готові промпти — копіюєте і вставляєте.', text: 'Не "подумайте самі", а конкретні рішення для виписок, діагностики, пошуку літератури.' },
  { id: 'diff-3', bold: 'Реальні медичні кейси.', text: 'Не "напишіть есе про кота", а реальні пацієнти, реальні симптоми.' },
  { id: 'diff-4', bold: 'Скрінкасти в прямому ефірі.', text: 'Дивитесь, як ШІ-інженер працює з інструментами — і повторюєте.' },
  { id: 'diff-5', bold: 'ChatGPT, Claude, NotebookLM, Perplexity та інші —', text: 'показуємо, який інструмент для якої задачі.' },
];

export default function WhyDifferent() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>
          {whyDifferentHeading}
        </h2>
        <ul className={styles.list}>
          {differentiators.map((d) => (
            <li key={d.id} className={styles.item}>
              <span className={styles.checkmark} aria-hidden="true">&#10003;</span>
              <span>
                <strong>{d.bold}</strong> {d.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
