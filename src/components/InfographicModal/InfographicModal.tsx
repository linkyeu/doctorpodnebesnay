import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { TELEGRAM_DM } from '../../data/links';
import type { NavigatorTileData, TileCategory } from '../../types';
import styles from './InfographicModal.module.css';

interface InfographicModalProps {
  tile: NavigatorTileData;
  onClose: () => void;
}

const CATEGORY_LABELS: Record<TileCategory, string> = {
  guide: 'Гід',
  safety: 'Безпека',
  'first-aid': 'Перша допомога',
  behavior: 'Поведінка',
  nutrition: 'Харчування',
  vaccination: 'Вакцинація',
  development: 'Розвиток',
};

export default function InfographicModal({ tile, onClose }: InfographicModalProps) {
  const [closing, setClosing] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(onClose, 250);
  }, [onClose]);

  const dialogRef = useFocusTrap(true, handleClose);

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
      window.scrollTo({ top: scrollY, left: 0, behavior: 'instant' });
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const titleId = `modal-title-${tile.id}`;
  const { content } = tile;

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
          {/* Hero image */}
          <div className={styles.heroWrapper}>
            {!imgLoaded && (
              <div className={styles.heroPlaceholder}>
                <span className={styles.placeholderEmoji}>{tile.emoji}</span>
              </div>
            )}
            <img
              src={tile.infographic}
              alt=""
              aria-hidden="true"
              className={`${styles.heroImage} ${imgLoaded ? styles.heroImageLoaded : ''}`}
              onLoad={() => setImgLoaded(true)}
            />
            <div className={styles.heroGradient} />
          </div>

          {/* Category badge + Title & source */}
          <div className={styles.header}>
            <span className={`${styles.badge} ${styles[`badge_${tile.category.replace('-', '_')}`]}`}>
              {CATEGORY_LABELS[tile.category]}
            </span>
            <h2 id={titleId} className={styles.title}>{tile.title}</h2>
            <p className={styles.source}>{tile.source}</p>
          </div>

          <hr className={styles.divider} />

          {/* Key points */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <span aria-hidden="true">📌</span> Ключове
            </h3>
            <ul className={styles.keyPointsList}>
              {content.keyPoints.map((kp, i) => (
                <li key={i} className={styles.keyPoint}>
                  <span className={styles.keyPointIcon} aria-hidden="true">{kp.icon}</span>
                  <span>{kp.text}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Myth vs Science */}
          {content.mythScience && (
            <>
              <hr className={styles.divider} />
              <section className={styles.mythScienceBlock}>
                <div className={styles.mythCard}>
                  <div className={styles.mythScienceHeader}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" fill="var(--color-myth-bg)" />
                      <path d="M7 7L13 13M13 7L7 13" stroke="var(--color-myth-accent)" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <span className={styles.mythLabel}>Міф</span>
                  </div>
                  <p className={styles.mythQuote}>{content.mythScience.myth}</p>
                  {content.mythScience.mythSource && (
                    <p className={styles.mythSourceText}>{content.mythScience.mythSource}</p>
                  )}
                </div>
                <div className={styles.scienceCard}>
                  <div className={styles.mythScienceHeader}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" fill="var(--color-science-bg)" />
                      <path d="M6 10L9 13L14 7" stroke="var(--color-science-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className={styles.scienceLabel}>Наука</span>
                  </div>
                  <p className={styles.scienceText}>{content.mythScience.science}</p>
                  <p className={styles.scienceSourceText}>{content.mythScience.scienceSource}</p>
                </div>
              </section>
            </>
          )}

          {/* Variant: ageChart */}
          {content.ageChart && (
            <>
              <hr className={styles.divider} />
              <section className={styles.section}>
                <h3 className={styles.sectionTitle}>
                  <span aria-hidden="true">📅</span> Розвиток по віку
                </h3>
                <div className={styles.ageChart}>
                  {content.ageChart.map((item, i) => (
                    <div key={i} className={styles.ageChartRow}>
                      <span className={styles.ageChartAge}>{item.age}</span>
                      <span className={styles.ageChartText}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {/* Variant: dosDonts */}
          {content.dosDonts && (
            <>
              <hr className={styles.divider} />
              <section className={styles.section}>
                <h3 className={styles.sectionTitle}>
                  <span aria-hidden="true">📋</span> Правила
                </h3>
                <div className={styles.dosDonts}>
                  <div className={styles.dosColumn}>
                    <h4 className={styles.dosHeader}>Так</h4>
                    <ul className={styles.dosList}>
                      {content.dosDonts.dos.map((item, i) => (
                        <li key={i} className={styles.dosItem}>
                          <span className={styles.dosIcon} aria-hidden="true">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.dontsColumn}>
                    <h4 className={styles.dontsHeader}>Ні</h4>
                    <ul className={styles.dontsList}>
                      {content.dosDonts.donts.map((item, i) => (
                        <li key={i} className={styles.dontsItem}>
                          <span className={styles.dontsIcon} aria-hidden="true">✗</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* Variant: steps */}
          {content.steps && (
            <>
              <hr className={styles.divider} />
              <section className={styles.section}>
                <h3 className={styles.sectionTitle}>
                  <span aria-hidden="true">🔢</span> Покрокова схема
                </h3>
                <div className={styles.stepsList}>
                  {content.steps.map((s) => (
                    <div key={s.step} className={styles.stepCard}>
                      <span className={styles.stepNumber}>{s.step}</span>
                      <div className={styles.stepContent}>
                        <strong className={styles.stepTitle}>{s.title}</strong>
                        <p className={styles.stepText}>{s.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          <hr className={styles.divider} />

          {/* Warning card */}
          <section className={styles.warningCard}>
            <h3 className={styles.warningTitle}>
              <span aria-hidden="true">⚠️</span> {content.warningTitle || 'Коли звернутись до лікаря'}
            </h3>
            <ul className={styles.warningList}>
              {content.warningSigns.map((sign, i) => (
                <li key={i}>{sign}</li>
              ))}
            </ul>
          </section>

          <hr className={styles.divider} />

          {/* Doctor's tip */}
          <section className={styles.tipCard}>
            <div className={styles.tipIcon} aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.8 2.3A.3.3 0 105 2H4a2 2 0 00-2 2v5a6 6 0 006 6v0a6 6 0 006-6V4a2 2 0 00-2-2h-1a.2.2 0 10.3.3" />
                <path d="M8 15v1a6 6 0 006 6v0a6 6 0 006-6v-4" />
                <circle cx="20" cy="10" r="2" />
              </svg>
            </div>
            <div>
              <h3 className={styles.tipTitle}>Порада лікаря</h3>
              <p className={styles.tipText}>{content.doctorTip}</p>
            </div>
          </section>

          {/* Telegram CTA */}
          <a
            href={TELEGRAM_DM}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaButton}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
            Запитати лікаря в Telegram
            <span className="sr-only"> (відкриється у новому вікні)</span>
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}
