import { useState } from 'react';
import type { NavigatorTileData } from '../../types';
import styles from './NavigatorTile.module.css';

interface NavigatorTileProps {
  tile: NavigatorTileData;
  index: number;
  onOpen: (tile: NavigatorTileData) => void;
}

export default function NavigatorTile({ tile, index, onOpen }: NavigatorTileProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <button
      className={styles.tile}
      style={{ animationDelay: `${index * 120}ms` }}
      onClick={() => onOpen(tile)}
      aria-haspopup="dialog"
    >
      <div className={styles.thumbnailWrapper}>
        {tile.thumbnail && !imgError ? (
          <img
            src={tile.thumbnail}
            alt=""
            aria-hidden="true"
            className={styles.thumbnail}
            loading="lazy"
            width={100}
            height={100}
            onError={() => setImgError(true)}
          />
        ) : (
          <span className={styles.emoji} aria-hidden="true">{tile.emoji}</span>
        )}
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{tile.title}</h3>
        <p className={styles.subtitle}>{tile.subtitle}</p>
      </div>
      <svg
        className={styles.chevron}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 4L10 8L6 12" />
      </svg>
    </button>
  );
}
