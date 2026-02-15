import styles from './GradientMesh.module.css';

export default function GradientMesh() {
  return (
    <div className={styles.mesh} aria-hidden="true">
      {/* Ribbons / stripes */}
      <div className={styles.ribbon1} />
      <div className={styles.ribbon2} />
      <div className={styles.ribbon3} />
      <div className={styles.ribbon4} />

      {/* Bubbles */}
      <div className={styles.bubble1} />
      <div className={styles.bubble2} />
      <div className={styles.bubble3} />
      <div className={styles.bubble4} />
      <div className={styles.bubble5} />
      <div className={styles.bubble6} />
    </div>
  );
}
