import { useRef, useEffect } from 'react';
import styles from './ToolkitSearch.module.css';

interface ToolkitSearchProps {
  value: string;
  onChange: (value: string) => void;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function ToolkitSearch({ value, onChange, isOpen, onOpenChange }: ToolkitSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when overlay opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onOpenChange?.(false);
        onChange('');
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onOpenChange, onChange]);

  return (
    <div className={styles.wrapper}>
      <svg
        className={styles.icon}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <input
        ref={inputRef}
        type="text"
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Пошук рішень…"
        aria-label="Пошук рішень"
        autoComplete="off"
      />
      {value && (
        <button
          type="button"
          className={styles.clear}
          onClick={() => {
            onChange('');
            inputRef.current?.focus();
          }}
          aria-label="Очистити пошук"
        >
          ✕
        </button>
      )}
    </div>
  );
}
