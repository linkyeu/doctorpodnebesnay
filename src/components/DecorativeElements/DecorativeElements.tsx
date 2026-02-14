import styles from './DecorativeElements.module.css';

interface DecorativeElementsProps {
  variant: 'hero' | 'section';
}

export default function DecorativeElements({ variant }: DecorativeElementsProps) {
  return (
    <div className={`${styles.wrapper} ${styles[variant]}`} aria-hidden="true">
      <img
        src="/images/blob-1.png"
        alt=""
        className={`${styles.blob} ${styles.blob1}`}
      />
      <img
        src="/images/blob-2.png"
        alt=""
        className={`${styles.blob} ${styles.blob2}`}
      />
      <img
        src="/images/blob-3.png"
        alt=""
        className={`${styles.blob} ${styles.blob3}`}
      />
    </div>
  );
}
