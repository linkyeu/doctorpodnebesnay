import { Link } from 'react-router-dom';
import { blogArticles } from '../data/blog';
import BlogHeader from '../components/BlogHeader/BlogHeader';
import Footer from '../components/Footer/Footer';
import styles from './BlogListingPage.module.css';

export default function BlogListingPage() {
  const published = blogArticles.filter((a) => a.isPublished);

  return (
    <div className={styles.page}>
      <title>Блог | Др. Піднебесна — Доказове батьківство</title>
      <meta
        name="description"
        content="Доказові статті про здоров'я дітей від сімейного лікаря. Прикорм, вакцинація, сон, температура, істерики, екранний час."
      />
      <link rel="canonical" href="https://doctorpidnebesna.com/blog" />
      <meta property="og:title" content="Блог | Др. Піднебесна" />
      <meta
        property="og:description"
        content="Доказові статті про здоров'я дітей від сімейного лікаря."
      />
      <meta property="og:url" content="https://doctorpidnebesna.com/blog" />
      <meta property="og:locale" content="uk_UA" />

      <BlogHeader />

      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.heading}>Блог</h1>
          <p className={styles.subtitle}>
            Доказова медицина простою мовою
          </p>

          <div className={styles.grid}>
            {published.map((article) => {
              const formattedDate = new Date(
                article.publishedDate
              ).toLocaleDateString('uk-UA', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });

              return (
                <Link
                  key={article.id}
                  to={`/blog/${article.slug}`}
                  className={styles.card}
                >
                  <div className={styles.cardTop}>
                    <span className={styles.category}>{article.category}</span>
                  </div>
                  <span className={styles.emoji} aria-hidden="true">
                    {article.emoji}
                  </span>
                  <h2 className={styles.cardTitle}>{article.title}</h2>
                  <p className={styles.excerpt}>{article.excerpt}</p>
                  <div className={styles.cardMeta}>
                    <span>{article.readTime} хв читання</span>
                    <span className={styles.metaDot}>·</span>
                    <time dateTime={article.publishedDate}>{formattedDate}</time>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
