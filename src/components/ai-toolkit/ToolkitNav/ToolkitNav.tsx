import { useState, useEffect, useCallback, useRef } from 'react';
import type { Block } from '../../../data/ai-toolkit';
import styles from './ToolkitNav.module.css';

const COLLAPSED_KEY = 'toolkit_sidebar_collapsed';

interface ToolkitNavProps {
  blocks: Block[];
  onCollapseChange?: (collapsed: boolean) => void;
}

export default function ToolkitNav({ blocks, onCollapseChange }: ToolkitNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return localStorage.getItem(COLLAPSED_KEY) === '1';
  });
  const [activeId, setActiveId] = useState<string>('');
  const navRef = useRef<HTMLElement>(null);

  const toggleCollapse = useCallback(() => {
    setIsCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem(COLLAPSED_KEY, next ? '1' : '0');
      onCollapseChange?.(next);
      return next;
    });
  }, [onCollapseChange]);

  // Notify parent of initial collapse state
  useEffect(() => {
    onCollapseChange?.(isCollapsed);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Keyboard shortcut: [ to toggle sidebar
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === '[' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || (e.target as HTMLElement)?.isContentEditable) return;
        toggleCollapse();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [toggleCollapse]);

  // Scrollspy: observe setup, block and solution headings
  useEffect(() => {
    const ids: string[] = ['setup'];
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

  const sidebarContent = (collapsed: boolean) => (
    <>
      {/* Setup + Blocks */}
      <ul className={styles.list} role="list">
        <li className={styles.blockGroup}>
          <button
            type="button"
            className={`${styles.blockTitle} ${styles.setupTitle} ${activeId === 'setup' ? styles.active : ''}`}
            onClick={() => handleClick('setup')}
            data-label="Налаштування ChatGPT"
          >
            <span className={styles.setupIcon} aria-hidden="true">⚙</span>
            <span className={styles.blockLabel}>Налаштування ChatGPT</span>
          </button>
        </li>
        {blocks.map((block) => (
          <li key={block.id} className={styles.blockGroup}>
            <button
              type="button"
              className={`${styles.blockTitle} ${activeId === `block-${block.id}` ? styles.active : ''}`}
              onClick={() => handleClick(`block-${block.id}`)}
              data-label={block.navTitle ?? block.title}
            >
              <span className={styles.blockDot} style={{ backgroundColor: block.color }} />
              <span className={styles.blockLabel}>{block.navTitle ?? block.title}</span>
            </button>
            {!collapsed && (
              <ul className={styles.solutionList} role="list">
                {block.solutions.map((solution) => (
                  <li key={solution.id}>
                    <button
                      type="button"
                      className={`${styles.solutionItem} ${activeId === `solution-${solution.id}` ? styles.active : ''}`}
                      onClick={() => handleClick(`solution-${solution.id}`)}
                    >
                      {solution.navTitle ?? solution.title}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <>
      {/* Mobile: sticky top bar */}
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
          <h3 className={styles.mobilePanelTitle}>Навігація</h3>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={() => setIsOpen(false)}
            aria-label="Закрити навігацію"
          >
            ✕
          </button>
        </div>
        {sidebarContent(false)}
      </div>

      {/* Desktop: fixed dark sidebar — collapsible */}
      <nav
        ref={navRef}
        className={`${styles.sidebar} ${isCollapsed ? styles.sidebarCollapsed : ''}`}
        aria-label="Навігація по розділах"
      >
        {sidebarContent(isCollapsed)}
        <button
          type="button"
          className={styles.collapseToggle}
          onClick={toggleCollapse}
          aria-label={isCollapsed ? 'Розгорнути навігацію' : 'Згорнути навігацію'}
          title={isCollapsed ? 'Розгорнути ([ )' : 'Згорнути ([ )'}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d={isCollapsed ? 'M6 3L11 8L6 13' : 'M10 3L5 8L10 13'}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </nav>
    </>
  );
}
