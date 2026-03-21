import styles from './ProductPeek.module.css';

export default function ProductPeek() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.frame}>
        <div className={styles.browserBar}>
          <div className={styles.dots}>
            <span className={styles.dot} style={{ background: '#FF5F57' }} />
            <span className={styles.dot} style={{ background: '#FFBD2E' }} />
            <span className={styles.dot} style={{ background: '#28C840' }} />
          </div>
          <span className={styles.url}>doctorpidnebesna.com/toolkit</span>
        </div>
        <img
          src="/images/ai-course/product-toolkit-cards.png"
          alt="Інтерфейс ШІ-помічника: 4 блоки рішень для щоденної практики"
          className={styles.image}
          loading="eager"
          width="1200"
          height="900"
        />
      </div>
    </div>
  );
}
