import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import type { Components } from 'react-markdown';
import { blogArticles } from '../data/blog';
import BlogHeader from '../components/BlogHeader/BlogHeader';
import Footer from '../components/Footer/Footer';
import styles from './BlogArticlePage.module.css';

export default function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(true);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const article = useMemo(
    () => blogArticles.find((a) => a.slug === slug),
    [slug]
  );

  useEffect(() => {
    if (!article) return;

    let cancelled = false;
    fetch(article.markdownFile)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.text();
      })
      .then((text) => {
        if (!cancelled) {
          setMarkdown(text);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
      setMarkdown('');
      setLoading(true);
    };
  }, [article]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (!lightboxSrc) return;
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxSrc(null);
    };
    document.addEventListener('keydown', handleKey);

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      window.scrollTo({ top: scrollY, left: 0, behavior: 'instant' });
    };
  }, [lightboxSrc]);

  const handleImageClick = useCallback((src: string) => {
    setLightboxSrc(src);
  }, []);

  const components: Components = useMemo(
    () => ({
      img: ({ src, alt, ...props }) => {
        const resolvedAlt = alt || '';
        const resolvedSrc = src || '';
        const isClickable =
          resolvedSrc.includes('/infographics/') ||
          resolvedSrc.includes('/blog/');
        return (
          <span className={styles.imageWrapper}>
            <img
              src={resolvedSrc}
              alt={resolvedAlt}
              loading="lazy"
              className={`${styles.image} ${isClickable ? styles.clickableImage : ''}`}
              onClick={
                isClickable
                  ? () => handleImageClick(resolvedSrc)
                  : undefined
              }
              role={isClickable ? 'button' : undefined}
              tabIndex={isClickable ? 0 : undefined}
              onKeyDown={
                isClickable
                  ? (e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleImageClick(resolvedSrc);
                      }
                    }
                  : undefined
              }
              {...props}
            />
          </span>
        );
      },
      blockquote: ({ children, ...props }) => (
        <blockquote className={styles.callout} {...props}>
          {children}
        </blockquote>
      ),
      table: ({ children, ...props }) => (
        <div className={styles.tableWrapper}>
          <table {...props}>{children}</table>
        </div>
      ),
      a: ({ href, children, ...props }) => {
        const isExternal = href?.startsWith('http');
        if (isExternal) {
          return (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            >
              {children}
            </a>
          );
        }
        if (href?.startsWith('/')) {
          return (
            <Link to={href} {...props}>
              {children}
            </Link>
          );
        }
        return (
          <a href={href} {...props}>
            {children}
          </a>
        );
      },
      h2: ({ children, ...props }) => (
        <h2 className={styles.h2} {...props}>
          {children}
        </h2>
      ),
      h3: ({ children, ...props }) => (
        <h3 className={styles.h3} {...props}>
          {children}
        </h3>
      ),
    }),
    [handleImageClick]
  );

  if (!article) {
    return (
      <div className={styles.page}>
        <BlogHeader />
        <main className={styles.notFound}>
          <h1>Сторінку не знайдено</h1>
          <p>Ця стаття не існує або була видалена.</p>
          <button className={styles.backButton} onClick={() => navigate('/blog')}>
            Повернутися до блогу
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  const formattedDate = new Date(article.publishedDate).toLocaleDateString(
    'uk-UA',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Article', 'MedicalWebPage'],
    headline: article.metaTitle,
    description: article.metaDescription,
    author: {
      '@type': 'Person',
      name: 'Др. Люба Піднебесна',
      jobTitle: 'Сімейний лікар',
      url: 'https://doctorpidnebesna.com',
    },
    datePublished: article.publishedDate,
    inLanguage: 'uk',
    url: `https://doctorpidnebesna.com/blog/${article.slug}`,
    image: `https://doctorpidnebesna.com${article.ogImage}`,
    publisher: {
      '@type': 'Organization',
      name: 'Др. Люба Піднебесна',
      url: 'https://doctorpidnebesna.com',
    },
  };

  return (
    <div className={styles.page}>
      <title>{article.metaTitle}</title>
      <meta name="description" content={article.metaDescription} />
      <link
        rel="canonical"
        href={`https://doctorpidnebesna.com/blog/${article.slug}`}
      />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={article.metaTitle} />
      <meta property="og:description" content={article.metaDescription} />
      <meta
        property="og:image"
        content={`https://doctorpidnebesna.com${article.ogImage}`}
      />
      <meta
        property="og:url"
        content={`https://doctorpidnebesna.com/blog/${article.slug}`}
      />
      <meta property="og:locale" content="uk_UA" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <BlogHeader />

      <main className={styles.main}>
        <article className={styles.article}>
          <div className={styles.byline}>
            <span className={styles.category}>{article.category}</span>
            <span className={styles.dot}>·</span>
            <time dateTime={article.publishedDate}>{formattedDate}</time>
            <span className={styles.dot}>·</span>
            <span>{article.readTime} хв читання</span>
          </div>

          {loading ? (
            <div className={styles.loading}>
              <div className={styles.spinner} />
            </div>
          ) : (
            <div className={styles.content}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeSlug]}
                components={components}
              >
                {markdown}
              </ReactMarkdown>
            </div>
          )}
        </article>
      </main>

      {lightboxSrc && (
        <div
          className={styles.lightbox}
          onClick={() => setLightboxSrc(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Збільшене зображення"
        >
          <button
            className={styles.lightboxClose}
            onClick={() => setLightboxSrc(null)}
            aria-label="Закрити"
          >
            <svg width="24" height="24" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M5 5L15 15M15 5L5 15" />
            </svg>
          </button>
          <img
            src={lightboxSrc}
            alt=""
            className={styles.lightboxImage}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <Footer />
    </div>
  );
}
