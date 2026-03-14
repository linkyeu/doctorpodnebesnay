import { useState, useEffect, useCallback, useRef } from 'react';
import type { Block } from '../../../data/ai-toolkit';
import styles from './ToolkitNav.module.css';

export type TabId = 'solutions' | 'notebooks' | 'setup';

interface ToolkitNavProps {
  blocks: Block[];
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'solutions', label: 'Рішення', icon: '◆' },
  { id: 'notebooks', label: 'Notebooks', icon: '◎' },
  { id: 'setup', label: 'Налаштування', icon: '⚙' },
];

export default function ToolkitNav({ blocks, activeTab, onTabChange }: ToolkitNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('');
  const navRef = useRef<HTMLElement>(null);

  // Scrollspy: observe block and solution headings (only on solutions tab)
  useEffect(() => {
    if (activeTab !== 'solutions') return;

    const ids: string[] = [];
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
  }, [blocks, activeTab]);

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

  const handleTabClick = useCallback(
    (tab: TabId) => {
      onTabChange(tab);
      setIsOpen(false);
      window.scrollTo({ top: 0 });
    },
    [onTabChange],
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

  const sidebarContent = (
    <>
      {/* Tab buttons */}
      <div className={styles.tabSection}>
        <div className={styles.sectionLabel}>Розділи</div>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`${styles.navTab} ${activeTab === tab.id ? styles.navTabActive : ''}`}
            onClick={() => handleTabClick(tab.id)}
          >
            <span className={styles.navTabIcon} aria-hidden="true">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.divider} />

      {/* Tab-specific content */}
      {activeTab === 'solutions' && (
        <div>
          <div className={styles.sectionLabel}>Блоки</div>
          <ul className={styles.list} role="list">
            {blocks.map((block) => (
              <li key={block.id} className={styles.blockGroup}>
                <button
                  type="button"
                  className={`${styles.blockTitle} ${activeId === `block-${block.id}` ? styles.active : ''}`}
                  onClick={() => handleClick(`block-${block.id}`)}
                >
                  <span className={styles.blockDot} style={{ backgroundColor: block.color }} />
                  {block.title}
                </button>
                <ul className={styles.solutionList} role="list">
                  {block.solutions.map((solution) => (
                    <li key={solution.id}>
                      <button
                        type="button"
                        className={`${styles.solutionItem} ${activeId === `solution-${solution.id}` ? styles.active : ''}`}
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
          </ul>
        </div>
      )}

      {activeTab === 'notebooks' && (
        <div>
          <div className={styles.sectionLabel}>Зміст</div>
          <ul className={styles.list} role="list">
            <li><button type="button" className={styles.staticItem} onClick={() => handleClick('audio-demo')}>🎧 Подкаст-демо</button></li>
            <li><button type="button" className={styles.staticItem} onClick={() => handleClick('explainer')}>📖 Що таке NotebookLM</button></li>
            <li><button type="button" className={styles.staticItem} onClick={() => handleClick('trust')}>✅ Чому можна довіряти</button></li>
            <li><button type="button" className={styles.staticItem} onClick={() => handleClick('setup-guide')}>🔧 Як створити ноутбук</button></li>
            <li><button type="button" className={styles.staticItem} onClick={() => handleClick('ready-notebooks')}>🎁 Готові ноутбуки</button></li>
          </ul>
        </div>
      )}

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
        {/* Mobile tab pills */}
        <div className={styles.mobileTabs}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`${styles.mobileTabPill} ${activeTab === tab.id ? styles.mobileTabActive : ''}`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
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
        {sidebarContent}
      </div>

      {/* Desktop: fixed dark sidebar — always visible */}
      <nav ref={navRef} className={styles.sidebar} aria-label="Навігація по розділах">
        {sidebarContent}
      </nav>
    </>
  );
}
