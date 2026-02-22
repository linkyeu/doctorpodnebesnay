import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './CourseHero.module.css';
import { heroContent, TELEGRAM_PURCHASE_LINK } from '../../../data/ai-course';

export default function CourseHero() {
  const [sliderPos, setSliderPos] = useState(90);
  const [phase, setPhase] = useState<'intro' | 'loop'>('intro');
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef(0);

  // Phase 1: intro sweep 90 → 50
  useEffect(() => {
    const t = setTimeout(() => setSliderPos(50), 600);
    const t2 = setTimeout(() => setPhase('loop'), 2400);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, []);

  // Phase 2: infinite smooth oscillation via rAF
  const animate = useCallback((timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = timestamp - startTimeRef.current;
    const period = 8000;
    const sine = Math.sin((elapsed / period) * Math.PI * 2);
    setSliderPos(50 + sine * 12);
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (phase !== 'loop') return;
    startTimeRef.current = 0;
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [phase, animate]);

  return (
    <section className={styles.hero}>
      <div className={styles.splitContainer}>
        {/* BEFORE — tired doctor, dark mood */}
        <div className={styles.splitBefore}>
          <img
            src="/images/ai-course/hero-before.jpg"
            alt=""
            className={styles.splitImage}
            draggable={false}
          />
          <div className={styles.beforeOverlay} />
        </div>

        {/* AFTER — happy doctor with AI, bright mood */}
        <div
          className={styles.splitAfter}
          style={{
            clipPath: `inset(0 0 0 ${sliderPos}%)`,
            transition: phase === 'intro'
              ? 'clip-path 1.6s cubic-bezier(0.22, 1, 0.36, 1)'
              : 'none',
          }}
        >
          <img
            src="/images/ai-course/hero-after.jpg"
            alt=""
            className={styles.splitImage}
            draggable={false}
          />
          <div className={styles.afterOverlay} />
        </div>

        {/* Animated divider line */}
        <div
          className={styles.sliderLine}
          style={{
            left: `${sliderPos}%`,
            transition: phase === 'intro'
              ? 'left 1.6s cubic-bezier(0.22, 1, 0.36, 1)'
              : 'none',
          }}
        />

        <div className={styles.bottomGradient} />
      </div>

      {/* Text content */}
      <div className={styles.content}>
        <h1 className={styles.title}>{heroContent.title}</h1>
        <p className={styles.subtitle}>{heroContent.subtitle}</p>
        <div className={styles.ctaWrapper}>
          <a
            href={TELEGRAM_PURCHASE_LINK}
            className={styles.cta}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className={styles.ctaIcon}
            >
              <path d="M21 3L1 11l7 2m13-10l-7 14-4-6m11-8l-13 10" />
            </svg>
            {heroContent.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
