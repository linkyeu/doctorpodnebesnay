import styles from './PainPoints.module.css';
import { painPoints, painAccent } from '../../../data/ai-course';
import type { PainPoint } from '../../../data/ai-course';

const painIconMap: Record<PainPoint['icon'], string> = {
  brain: '/images/ai-course/pain-icons/pain-guidelines.png',
  alert: '/images/ai-course/pain-icons/pain-complex-case.png',
  users: '/images/ai-course/pain-icons/pain-patient-chatgpt.png',
  clock: '/images/ai-course/pain-icons/pain-guidelines.png',
  books: '/images/ai-course/pain-icons/pain-guidelines.png',
  search: '/images/ai-course/pain-icons/pain-complex-case.png',
};

export default function PainPoints() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {painPoints.map((point) => (
            <div key={point.id} className={styles.card}>
              <div className={styles.iconWrapper}>
                <img
                  src={painIconMap[point.icon]}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  width="64"
                  height="64"
                />
              </div>
              <h3 className={styles.headline}>{point.headline}</h3>
              <p className={styles.text}>{point.text}</p>
              {point.source && <cite className={styles.source}>{point.source}</cite>}
            </div>
          ))}
        </div>
        <blockquote className={styles.accent}>
          <p className={styles.accentText}>{painAccent.text}</p>
          {painAccent.stat && <p className={styles.accentStat}>{painAccent.stat}</p>}
          <p className={styles.audienceLine}>
            Для лікарів на будь-якому етапі — від інтернатури до 20 років практики
          </p>
        </blockquote>
      </div>
    </section>
  );
}
