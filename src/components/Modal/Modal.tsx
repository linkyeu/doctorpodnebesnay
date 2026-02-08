import { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ isOpen, onClose }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Focus trap
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      previousFocus.current = document.activeElement as HTMLElement;
      document.body.classList.add('modal-open');
      document.addEventListener('keydown', handleKeyDown);
      // Focus the close button after portal renders
      requestAnimationFrame(() => closeButtonRef.current?.focus());
    } else {
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', handleKeyDown);
      previousFocus.current?.focus();
    }

    return () => {
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-label="Запис на консультацію"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          className={styles.close}
          onClick={onClose}
          aria-label="Закрити"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className={styles.body}>
          <h2 className={styles.title}>Запис на консультацію</h2>
          <p className={styles.description}>
            Оберіть зручний час для онлайн-консультації. Перша зустріч — це
            знайомство, збір анамнезу та формування індивідуального плану.
          </p>

          {/* Calendly placeholder */}
          <div className={styles.placeholder}>
            <div className={styles.placeholderIcon}>📅</div>
            <p className={styles.placeholderText}>
              Тут буде віджет Calendly
            </p>
            <p className={styles.placeholderSubtext}>
              Calendly widget will be embedded here
            </p>
          </div>

          <div className={styles.contact}>
            <p>
              Або напишіть напряму:{' '}
              <a href="https://t.me/" target="_blank" rel="noopener noreferrer">
                Telegram
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
