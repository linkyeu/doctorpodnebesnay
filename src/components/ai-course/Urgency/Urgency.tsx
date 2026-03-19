import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { TELEGRAM_PURCHASE_LINK } from '../../../data/ai-course';
import styles from './Urgency.module.css';

export default function Urgency() {
  const sectionRef = useScrollReveal<HTMLElement>(0.15);

  return (
    <section ref={sectionRef} className={`${styles.section} reveal`}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Медицина вже змінилась. Питання — де ви.</h2>
        <p className={styles.line}>Ваші пацієнти вже приходять із відповідями від ChatGPT.</p>
        <p className={styles.line}>Ваші колеги вже пишуть виписки за хвилини.</p>
        <p className={styles.line}>Міжнародні настанови оновлюються швидше, ніж ви встигаєте їх читати.</p>
        <p className={styles.punchline}>
          Це не прогноз. <em>Це вівторок.</em>
        </p>
        <a
          href={TELEGRAM_PURCHASE_LINK}
          className={styles.cta}
          target="_blank"
          rel="noopener noreferrer"
        >
          Отримати довідник — 999 ₴
        </a>
      </div>
    </section>
  );
}
