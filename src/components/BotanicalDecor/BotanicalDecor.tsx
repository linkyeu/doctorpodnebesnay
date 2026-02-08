import type { ReactNode } from 'react';
import styles from './BotanicalDecor.module.css';

type Variant = 'leaf-1' | 'leaf-2' | 'branch' | 'stem';

interface BotanicalDecorProps {
  variant?: Variant;
  className?: string;
  style?: React.CSSProperties;
}

const svgPaths: Record<Variant, ReactNode> = {
  'leaf-1': (
    <svg viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M30 78C30 78 8 55 8 35C8 15 30 2 30 2C30 2 52 15 52 35C52 55 30 78 30 78Z"
        fill="currentColor"
        opacity="0.15"
      />
      <path
        d="M30 72V8"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.3"
      />
      <path
        d="M30 20C22 24 16 28 14 34"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.2"
      />
      <path
        d="M30 35C38 38 44 42 46 48"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.2"
      />
      <path
        d="M30 50C24 52 18 56 16 60"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.2"
      />
    </svg>
  ),
  'leaf-2': (
    <svg viewBox="0 0 50 70" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M25 68C25 68 5 48 5 30C5 12 25 2 25 2C25 2 45 12 45 30C45 48 25 68 25 68Z"
        fill="currentColor"
        opacity="0.12"
      />
      <path
        d="M25 62V6"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.25"
      />
      <path
        d="M25 18C19 22 13 26 11 30"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.18"
      />
      <path
        d="M25 38C31 40 37 44 39 48"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.18"
      />
    </svg>
  ),
  branch: (
    <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M4 20C20 20 40 14 60 14C80 14 100 20 116 20"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.2"
      />
      <circle cx="30" cy="16" r="6" fill="currentColor" opacity="0.08" />
      <circle cx="55" cy="12" r="5" fill="currentColor" opacity="0.06" />
      <circle cx="80" cy="14" r="7" fill="currentColor" opacity="0.07" />
      <circle cx="100" cy="18" r="4" fill="currentColor" opacity="0.06" />
      <path d="M30 16L28 8" stroke="currentColor" strokeWidth="0.8" opacity="0.15" />
      <path d="M80 14L82 6" stroke="currentColor" strokeWidth="0.8" opacity="0.15" />
    </svg>
  ),
  stem: (
    <svg viewBox="0 0 20 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M10 4C10 4 8 30 10 60C12 90 10 116 10 116"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.2"
      />
      <path d="M10 30C6 26 3 22 2 18" stroke="currentColor" strokeWidth="1" opacity="0.15" />
      <path d="M10 55C14 51 17 47 18 43" stroke="currentColor" strokeWidth="1" opacity="0.15" />
      <path d="M10 80C6 76 3 72 2 68" stroke="currentColor" strokeWidth="1" opacity="0.15" />
      <circle cx="2" cy="18" r="4" fill="currentColor" opacity="0.06" />
      <circle cx="18" cy="43" r="5" fill="currentColor" opacity="0.06" />
      <circle cx="2" cy="68" r="4" fill="currentColor" opacity="0.06" />
    </svg>
  ),
};

export default function BotanicalDecor({
  variant = 'leaf-1',
  className = '',
  style,
}: BotanicalDecorProps) {
  return (
    <div
      className={`${styles.decor} ${styles[variant] ?? ''} ${className}`}
      style={style}
    >
      {svgPaths[variant]}
    </div>
  );
}
