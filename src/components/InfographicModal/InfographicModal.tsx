import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import type { NavigatorTileData } from '../../types';
import styles from './InfographicModal.module.css';

interface InfographicModalProps {
  tile: NavigatorTileData;
  onClose: () => void;
}

export default function InfographicModal({ tile, onClose }: InfographicModalProps) {
  const [closing, setClosing] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(onClose, 250);
  }, [onClose]);

  const dialogRef = useFocusTrap(true, handleClose);

  // Body scroll lock
  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      window.scrollTo(0, scrollY);
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const titleId = `modal-title-${tile.id}`;

  return createPortal(
    <div
      className={`${styles.backdrop} ${closing ? styles.backdropClosing : ''}`}
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`${styles.dialog} ${closing ? styles.dialogClosing : ''}`}
      >
        <button
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Закрити"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M5 5L15 15M15 5L5 15" />
          </svg>
        </button>

        <div className={styles.content}>
          <div className={styles.imageWrapper}>
            {!imgLoaded && (
              <div className={styles.imagePlaceholder}>
                <span className={styles.placeholderEmoji}>{tile.emoji}</span>
              </div>
            )}
            <img
              src={tile.infographic}
              alt={tile.title}
              className={`${styles.infographic} ${imgLoaded ? styles.infographicLoaded : ''}`}
              onLoad={() => setImgLoaded(true)}
            />
          </div>

          <div className={styles.meta}>
            <h2 id={titleId} className={styles.title}>{tile.title}</h2>
            <p className={styles.source}>{tile.source}</p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
