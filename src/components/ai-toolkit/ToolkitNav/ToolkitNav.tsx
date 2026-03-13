import { useState, useEffect, useCallback, useRef } from 'react';
import type { Block } from '../../../data/ai-toolkit';
import styles from './ToolkitNav.module.css';

interface ToolkitNavProps {
  blocks: Block[];
}

export default function ToolkitNav({ blocks }: ToolkitNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('');
  const navRef = useRef<HTMLElement>(null);

  const topSections = [
    { id: 'step-setup', label: 'Крок 1: Налаштування' },
    { id: 'step-safety', label: 'Крок 2: Захист' },
  ];

  const bottomSections = [
    { id: 'appendix-glossary', label: 'Глосарій' },
  ];

  const staticIds = [
    ...topSections.map((s) => s.id),
    ...bottomSections.map((s) => s.id),
  ];

  // Scrollspy: observe block and solution headings
  useEffect(() => {
    const ids: string[] = [...staticIds];
    for (const block of blocks) {
      ids.push(`block-${block.id}`);
      for (const solution of block.solutions) {
        ids.push(`solution-${solution.id}`);
      }
    }

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost visible entry
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0,
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [blocks]);

  const handleClick = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (el) {
        // Manual offset calculation — more reliable than scrollIntoView
        // when sticky headers are present
        const y = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      }
      setIsOpen(false);
    },
    [],
  );

  // Close panel on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKey);
      return () => document.removeEventListener('keydown', handleKey);
    }
  }, [isOpen]);

  // Prevent body scroll when mobile panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  const tocContent = (
    <ul className={styles.list} role="list">
      {topSections.map((section) => (
        <li key={section.id}>
          <button
            type="button"
            className={`${styles.staticItem} ${activeId === section.id ? styles.active : ''}`}
            onClick={() => handleClick(section.id)}
          >
            {section.label}
          </button>
        </li>
      ))}
      {blocks.map((block) => (
        <li key={block.id} className={styles.blockGroup}>
          <button
            type="button"
            className={`${styles.blockTitle} ${activeId === `block-${block.id}` ? styles.active : ''}`}
            style={{ '--nav-color': block.color } as React.CSSProperties}
            onClick={() => handleClick(`block-${block.id}`)}
          >
            <span
              className={styles.blockDot}
              style={{ backgroundColor: block.color }}
            />
            {block.title}
          </button>
          <ul className={styles.solutionList} role="list">
            {block.solutions.map((solution) => (
              <li key={solution.id}>
                <button
                  type="button"
                  className={`${styles.solutionItem} ${activeId === `solution-${solution.id}` ? styles.active : ''}`}
                  style={{ '--nav-color': block.color } as React.CSSProperties}
                  onClick={() => handleClick(`solution-${solution.id}`)}
                >
                  <span className={styles.solutionId}>{solution.id}</span>
                  {solution.title}
                </button>
              </li>
            ))}
          </ul>
        </li>
      ))}
      {bottomSections.map((section) => (
        <li key={section.id}>
          <button
            type="button"
            className={`${styles.staticItem} ${activeId === section.id ? styles.active : ''}`}
            onClick={() => handleClick(section.id)}
          >
            {section.label}
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Mobile: sticky top bar + hamburger */}
      <div className={styles.mobileBar}>
        <button
          type="button"
          className={styles.hamburger}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Закрити навігацію' : 'Відкрити навігацію'}
        >
          <span className={styles.hamburgerIcon} aria-hidden="true">
            {isOpen ? '✕' : '☰'}
          </span>
          <span className={styles.hamburgerLabel}>Зміст</span>
        </button>
      </div>

      {/* Mobile: slide-out overlay */}
      {isOpen && (
        <div
          className={styles.overlay}
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
      <div className={`${styles.mobilePanel} ${isOpen ? styles.panelOpen : ''}`}>
        <div className={styles.mobilePanelHeader}>
          <h3 className={styles.mobilePanelTitle}>Зміст</h3>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={() => setIsOpen(false)}
            aria-label="Закрити навігацію"
          >
            ✕
          </button>
        </div>
        {tocContent}
      </div>

      {/* Desktop: fixed sidebar */}
      <nav ref={navRef} className={styles.sidebar} aria-label="Навігація по розділах">
        <h3 className={styles.sidebarTitle}>Зміст</h3>
        {tocContent}
      </nav>
    </>
  );
}
