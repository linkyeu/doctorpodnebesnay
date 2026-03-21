import { useEffect, useState, useCallback, useMemo } from 'react';
import { blocks } from '../data/ai-toolkit';
import type { Solution } from '../data/ai-toolkit';
import ToolkitNav from '../components/ai-toolkit/ToolkitNav/ToolkitNav';
import BlockHeader from '../components/ai-toolkit/BlockHeader/BlockHeader';
import SolutionCard from '../components/ai-toolkit/SolutionCard/SolutionCard';
import { ChatGPTSetup } from '../components/ai-toolkit/ToolkitSetup/ToolkitSetup';
import PasswordGate from '../components/ai-toolkit/PasswordGate/PasswordGate';
import ToolkitWelcome from '../components/ai-toolkit/ToolkitWelcome/ToolkitWelcome';
import ToolkitSearch from '../components/ai-toolkit/ToolkitSearch/ToolkitSearch';
import '../styles/toolkit-tokens.css';
import styles from './AiToolkitPage.module.css';

const SETUP_DONE_KEY = 'toolkit_setup_done';

function SetupSection({ onCollapse }: { onCollapse?: () => void }) {
  const [expanded, setExpanded] = useState(() => {
    return !localStorage.getItem(SETUP_DONE_KEY);
  });

  const isDone = !!localStorage.getItem(SETUP_DONE_KEY);

  const toggle = () => {
    if (expanded) {
      setExpanded(false);
      onCollapse?.();
    } else {
      setExpanded(true);
    }
  };

  const markDone = () => {
    localStorage.setItem(SETUP_DONE_KEY, '1');
    setExpanded(false);
    onCollapse?.();
  };

  return (
    <section id="setup" className={styles.setupSection}>
      <button
        type="button"
        className={styles.setupToggle}
        onClick={toggle}
        aria-expanded={expanded}
        aria-controls="setup-content"
      >
        <div className={styles.setupToggleLeft}>
          {isDone ? (
            <span className={styles.setupToggleIcon} aria-hidden="true">✓</span>
          ) : (
            <img
              src="/images/toolkit/illustrations/icon-setup.png"
              alt=""
              aria-hidden="true"
              className={styles.setupToggleImg}
              width="48"
              height="48"
            />
          )}
          <div>
            <span className={styles.setupHeading}>
              {isDone ? 'Налаштування ChatGPT' : 'Навчіть ChatGPT думати як лікар'}
            </span>
            <span className={styles.setupSubtext}>
              {isDone ? 'Налаштовано' : '2 хвилини, один раз'}
            </span>
          </div>
        </div>
        <svg
          className={`${styles.setupChevron} ${expanded ? styles.setupChevronOpen : ''}`}
          width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"
        >
          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        id="setup-content"
        className={`${styles.setupCollapsible} ${expanded ? styles.setupCollapsibleOpen : ''}`}
      >
        <div className={styles.setupInner}>
          {!isDone && (
            <p className={styles.setupDescription}>
              Без цього — він відповідає як студент-першокурсник. З цим — як досвідчений колега.
            </p>
          )}
          <ChatGPTSetup />
          {!isDone && (
            <button type="button" className={styles.setupDoneBtn} onClick={markDone}>
              Готово, я налаштував ✓
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function matchesSolution(solution: Solution, query: string): boolean {
  const q = query.toLowerCase();
  return (
    solution.title.toLowerCase().includes(q) ||
    solution.prompt.toLowerCase().includes(q) ||
    (solution.tool ?? '').toLowerCase().includes(q)
  );
}

export default function AiToolkitPage() {
  const [authenticated, setAuthenticated] = useState(() => {
    const stored = localStorage.getItem('toolkit_auth');
    if (!stored) return false;
    const ts = parseInt(stored, 10);
    return Date.now() - ts < 30 * 24 * 60 * 60 * 1000;
  });

  const [expandedBlocks, setExpandedBlocks] = useState<Record<string, boolean>>(() => {
    const initial = Object.fromEntries(blocks.map((b) => [b.id, false]));
    const hash = window.location.hash.replace('#', '');
    if (hash.startsWith('solution-')) {
      const solutionId = hash.replace('solution-', '');
      const parent = blocks.find(b => b.solutions.some(s => s.id === solutionId));
      if (parent) {
        initial[parent.id] = true;
        return initial;
      }
    }
    // Only auto-expand Block A if onboarding is complete (returning user)
    const welcomeDone = !!localStorage.getItem('toolkit_orientation_seen');
    const setupDone = !!localStorage.getItem(SETUP_DONE_KEY);
    if (welcomeDone && setupDone && blocks.length > 0) {
      initial[blocks[0].id] = true;
    }
    return initial;
  });

  // Auto-expand first category when all onboarding sections are done
  const expandFirstBlockIfReady = useCallback(() => {
    const welcomeDone = !!localStorage.getItem('toolkit_orientation_seen');
    const setupDone = !!localStorage.getItem(SETUP_DONE_KEY);
    if (welcomeDone && setupDone && blocks.length > 0) {
      setExpandedBlocks(prev => {
        // Only expand if no block is currently open
        const anyOpen = Object.values(prev).some(Boolean);
        if (anyOpen) return prev;
        return { ...prev, [blocks[0].id]: true };
      });
      setTimeout(() => {
        document.getElementById(`block-${blocks[0].id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 350);
    }
  }, []);

  // Counter to force-remount SolutionCards when blocks toggle (resets expanded state)
  const [blockResetKey, setBlockResetKey] = useState(0);

  const toggleBlock = useCallback((id: string) => {
    setExpandedBlocks((prev) => {
      const isClosing = prev[id];
      // Collapse all, then open only the clicked one (unless closing it)
      const next = Object.fromEntries(Object.keys(prev).map((k) => [k, false]));
      if (!isClosing) next[id] = true;
      return next;
    });
    // Increment reset key to force solution cards to remount (closing any expanded cards)
    setBlockResetKey(k => k + 1);
    // Scroll to the block header after animation completes
    setTimeout(() => {
      const el = document.getElementById(`block-${id}`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 350);
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  const filteredResults = useMemo(() => {
    const q = searchQuery.trim();
    if (!q) return null;
    return blocks.flatMap((block) =>
      block.solutions
        .filter((s) => matchesSolution(s, q))
        .map((solution) => ({ solution, blockColor: block.color, blockTitle: block.title }))
    );
  }, [searchQuery]);

  const handleScrollToSolution = useCallback((id: string) => {
    const parent = blocks.find(b => b.solutions.some(s => s.id === id));
    if (parent) {
      setExpandedBlocks(prev => {
        const next = Object.fromEntries(Object.keys(prev).map(k => [k, false]));
        next[parent.id] = true;
        return next;
      });
      requestAnimationFrame(() => {
        const el = document.getElementById(`solution-${id}`);
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, []);

  // On mount: scroll to hash target (#setup, #notebooks → setup, #solution-*)
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'setup' || hash === 'notebooks' || hash === 'section-superpower' || hash === 'section-setup') {
      requestAnimationFrame(() => {
        const el = document.getElementById('setup');
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, []);

  useEffect(() => {
    // noindex — password-protected product page, not for search
    let robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    const createdRobots = !robotsMeta;
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.name = 'robots';
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.content = 'noindex, nofollow';
    return () => {
      if (createdRobots && robotsMeta) robotsMeta.remove();
    };
  }, []);

  useEffect(() => {
    document.title =
      'ШІ-помічник лікаря — 17 готових рішень для щоденної практики';

    const metaDesc = document.querySelector('meta[name="description"]');
    const descContent =
      'Довідник готових ШІ-рішень для лікарів: готові запити для документації, діагностики, комунікації з пацієнтами. Рішення з чеклістами безпеки.';
    if (metaDesc) {
      metaDesc.setAttribute('content', descContent);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = descContent;
      document.head.appendChild(meta);
    }

    const ogTags: Record<string, string> = {
      'og:title': 'ШІ-помічник лікаря — 17 готових рішень',
      'og:description': descContent,
      'og:url': 'https://doctorpidnebesna.com/toolkit',
      'og:type': 'website',
    };

    const createdMetas: HTMLMetaElement[] = [];
    for (const [property, content] of Object.entries(ogTags)) {
      const el = document.querySelector(`meta[property="${property}"]`);
      if (el) {
        el.setAttribute('content', content);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', property);
        meta.content = content;
        document.head.appendChild(meta);
        createdMetas.push(meta);
      }
    }

    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;
    const createdCanonical = !canonical;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://doctorpidnebesna.com/toolkit';

    return () => {
      createdMetas.forEach((m) => m.remove());
      if (createdCanonical && canonical) canonical.remove();
    };
  }, []);

  // Keyboard shortcut: Cmd/Ctrl+K to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!authenticated) {
    return <PasswordGate onSuccess={() => setAuthenticated(true)} />;
  }

  return (
    <div className={`${styles.toolkitPage} toolkit-scope`}>
      <ToolkitNav blocks={blocks} />
      <main className={styles.content}>
        <h1 className="sr-only">ШІ-помічник лікаря — 17 готових рішень для щоденної практики</h1>
        <ToolkitWelcome onScrollToSolution={handleScrollToSolution} onCollapse={expandFirstBlockIfReady} />

        {/* Setup — mandatory first step, collapsible */}
        <SetupSection onCollapse={expandFirstBlockIfReady} />

        {/* Search */}
        <ToolkitSearch
          value={searchQuery}
          onChange={setSearchQuery}
          isOpen={searchOpen}
          onOpenChange={setSearchOpen}
        />

        {/* Solutions */}
        {filteredResults ? (
          filteredResults.length > 0 ? (
            <div className={styles.searchResults}>
              <p className={styles.searchCount}>
                {filteredResults.length}{' '}
                {filteredResults.length === 1 ? 'рішення' : filteredResults.length < 5 ? 'рішення' : 'рішень'}
              </p>
              <div className={styles.solutionsGrid}>
                {filteredResults.map(({ solution, blockColor }) => (
                  <SolutionCard
                    key={solution.id}
                    solution={solution}
                    blockColor={blockColor}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className={styles.searchEmpty}>
              <img
                className={styles.searchEmptyImg}
                src="/images/toolkit/illustrations/search-empty.png"
                alt=""
                aria-hidden="true"
                width="120"
                height="120"
              />
              <p className={styles.searchEmptyText}>Нічого не знайдено</p>
              <p className={styles.searchEmptyHint}>Спробуйте інший запит або перегляньте розділи нижче</p>
            </div>
          )
        ) : (
          <>
            {blocks.map((block) => (
              <div key={block.id} className={styles.blockSection}>
                <BlockHeader
                  block={block}
                  expanded={expandedBlocks[block.id]}
                  onToggle={() => toggleBlock(block.id)}
                />
                <div
                  id={`block-${block.id}-content`}
                  role="region"
                  className={`${styles.blockCollapsible} ${expandedBlocks[block.id] ? styles.blockCollapsibleOpen : ''}`}
                >
                  <div className={styles.blockInner}>
                    <div
                      className={styles.solutionsRail}
                      style={{ '--block-color': block.color } as React.CSSProperties}
                    >
                      <div className={styles.solutionsGrid}>
                        {block.solutions.map((solution) => (
                          <SolutionCard
                            key={`${solution.id}-${blockResetKey}`}
                            solution={solution}
                            blockColor={block.color}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </main>
    </div>
  );
}
