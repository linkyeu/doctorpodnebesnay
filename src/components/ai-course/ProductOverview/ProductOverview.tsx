import styles from './ProductOverview.module.css';
import { productOverviewContent } from '../../../data/ai-course';

export default function ProductOverview() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>{productOverviewContent.heading}</h2>
        <p className={styles.subtitle}>{productOverviewContent.subtitle}</p>

        <div className={styles.grid}>
          {productOverviewContent.features.map((f) => (
            <div key={f.id} className={styles.card}>
              <span className={styles.emoji} aria-hidden="true">
                {f.emoji}
              </span>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardText}>{f.text}</p>
            </div>
          ))}
        </div>

        <p className={styles.footer}>{productOverviewContent.footer}</p>
      </div>
    </section>
  );
}
