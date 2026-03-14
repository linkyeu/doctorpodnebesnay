import type { ShowcaseVideo } from '../../../data/ai-toolkit';
import styles from './DemoVideo.module.css';

export default function DemoVideo({ title, description, poster, video }: ShowcaseVideo) {
  return (
    <div className={styles.item}>
      <h4 className={styles.title}>{title}</h4>
      <div className={styles.videoWrapper}>
        <video
          className={styles.video}
          controls
          playsInline
          preload="none"
          poster={poster}
        >
          <source src={video.webm} type="video/webm" />
          <source src={video.mp4} type="video/mp4" />
        </video>
        {/* Reduced motion: show static poster instead of video */}
        <img className={styles.posterFallback} src={poster} alt={title} loading="lazy" />
      </div>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
