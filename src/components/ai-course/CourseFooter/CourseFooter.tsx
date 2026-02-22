import styles from './CourseFooter.module.css';
import { courseFooterContent } from '../../../data/ai-course';

export default function CourseFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.links}>
          <a href={`mailto:${courseFooterContent.email}`} className={styles.link}>
            {courseFooterContent.email}
          </a>
          <span className={styles.separator} aria-hidden="true">|</span>
          <a
            href={courseFooterContent.telegramUrl}
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Telegram: {courseFooterContent.telegram}
          </a>
        </div>
        <p className={styles.copyright}>{courseFooterContent.copyright}</p>
      </div>
    </footer>
  );
}
