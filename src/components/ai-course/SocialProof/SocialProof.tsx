import styles from './SocialProof.module.css';
import { socialProofCards, socialProofQuote } from '../../../data/ai-course';

export default function SocialProof() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>ШІ вже змінює медицину</h2>
        <div className={styles.grid}>
          {socialProofCards.map((card) => (
            <div key={card.id} className={styles.card}>
              <span className={styles.stat}>{card.stat}</span>
              <p className={styles.description}>{card.description}</p>
              <p className={styles.detail}>{card.detail}</p>
              <cite className={styles.source}>{card.source}</cite>
            </div>
          ))}
        </div>
        <blockquote className={styles.quote}>
          <p className={styles.quoteText}>{socialProofQuote}</p>
        </blockquote>
      </div>
    </section>
  );
}
