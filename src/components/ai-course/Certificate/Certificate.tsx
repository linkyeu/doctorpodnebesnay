// Component unused after digital product pivot — kept for potential re-enabling
import styles from './Certificate.module.css';

const certificateContent = {
  heading: 'Сертифікат',
  text: 'Кожен учасник отримує іменний сертифікат проходження курсу з QR-кодом для верифікації.',
};

export default function Certificate() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>{certificateContent.heading}</h2>
        <p className={styles.text}>{certificateContent.text}</p>
        <div className={styles.imageWrapper}>
          <img
            src="/images/ai-course/certificate-mockup.webp"
            alt="Приклад сертифікату курсу"
            className={styles.image}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
