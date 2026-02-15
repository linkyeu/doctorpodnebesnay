import { blogArticles } from '../../data/blog';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './BlogTeaser.module.css';

export default function BlogTeaser() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section className={`${styles.section} reveal`} ref={sectionRef} id="blog">
      <div className={styles.container}>
        <h2 className={styles.heading}>Корисні статті</h2>
        <p className={styles.subtitle}>
          Доказова медицина простою мовою — скоро на сайті
        </p>

        <div className={styles.grid}>
          {blogArticles.map((article, i) => (
            <a
              key={article.id}
              href="/blog"
              className={styles.card}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className={styles.cardTop}>
                <span className={styles.category}>{article.category}</span>
                <span className={styles.badge}>Скоро</span>
              </div>
              <span className={styles.emoji} aria-hidden="true">
                {article.emoji}
              </span>
              <h3 className={styles.cardTitle}>{article.title}</h3>
              <p className={styles.excerpt}>{article.excerpt}</p>
              <span className={styles.readTime}>{article.readTime} хв читання</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
