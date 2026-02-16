import { Link } from 'react-router-dom';
import styles from './BlogHeader.module.css';

export default function BlogHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/blog" className={styles.back}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12.5 15L7.5 10L12.5 5" />
          </svg>
          Блог
        </Link>

        <Link to="/" className={styles.logo}>
          Др. Люба
          <span className={styles.logoSurname}>Піднебесна</span>
        </Link>
      </div>
    </header>
  );
}
