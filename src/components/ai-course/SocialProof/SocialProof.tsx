import styles from './SocialProof.module.css';
import { socialProofHeading, socialProofQuotes } from '../../../data/ai-course';

export default function SocialProof() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>{socialProofHeading}</h2>
        <div className={styles.grid}>
          {socialProofQuotes.map((quote) => (
            <blockquote key={quote.id} className={styles.card}>
              <p className={styles.quoteText}>{quote.text}</p>
              <footer className={styles.footer}>
                <div className={styles.avatar}>
                  {quote.author.charAt(0)}
                </div>
                <div className={styles.meta}>
                  <cite className={styles.author}>{quote.author}</cite>
                  <span className={styles.role}>{quote.role}</span>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>

      </div>
    </section>
  );
}
