import { useEffect, useState, useCallback, useMemo } from 'react';
import { blocks } from '../data/ai-toolkit';
import type { Solution } from '../data/ai-toolkit';
import ToolkitNav from '../components/ai-toolkit/ToolkitNav/ToolkitNav';
import type { TabId } from '../components/ai-toolkit/ToolkitNav/ToolkitNav';
import BlockHeader from '../components/ai-toolkit/BlockHeader/BlockHeader';
import SolutionCard from '../components/ai-toolkit/SolutionCard/SolutionCard';
import { ToolkitSetupContent } from '../components/ai-toolkit/ToolkitSetup/ToolkitSetup';
import SuperpowerSection from '../components/ai-toolkit/SuperpowerSection/SuperpowerSection';
import PasswordGate from '../components/ai-toolkit/PasswordGate/PasswordGate';
import ToolkitWelcome from '../components/ai-toolkit/ToolkitWelcome/ToolkitWelcome';
import ToolkitSearch from '../components/ai-toolkit/ToolkitSearch/ToolkitSearch';
import '../styles/toolkit-tokens.css';
import styles from './AiToolkitPage.module.css';

function matchesSolution(solution: Solution, query: string): boolean {
  const q = query.toLowerCase();
  return (
    solution.title.toLowerCase().includes(q) ||
    solution.prompt.toLowerCase().includes(q) ||
    (solution.tool ?? '').toLowerCase().includes(q)
  );
}

function getInitialTab(): TabId {
  const hash = window.location.hash.replace('#', '');
  if (hash === 'notebooks' || hash === 'section-superpower') return 'notebooks';
  if (hash === 'setup' || hash === 'section-setup') return 'setup';
  return 'solutions';
}

export default function AiToolkitPage() {
  const [authenticated, setAuthenticated] = useState(() => {
    const stored = localStorage.getItem('toolkit_auth');
    if (!stored) return false;
    const ts = parseInt(stored, 10);
    return Date.now() - ts < 30 * 24 * 60 * 60 * 1000;
  });

  const [activeTab, setActiveTab] = useState<TabId>(getInitialTab);

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
    // Auto-expand Block A by default so users see solutions on load
    if (blocks.length > 0) {
      initial[blocks[0].id] = true;
    }
    return initial;
  });

  const toggleBlock = useCallback((id: string) => {
    setExpandedBlocks((prev) => ({ ...prev, [id]: !prev[id] }));
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

  // Update URL hash when tab changes
  useEffect(() => {
    const hashMap: Record<TabId, string> = {
      solutions: '#solutions',
      notebooks: '#notebooks',
      setup: '#setup',
    };
    history.replaceState(null, '', hashMap[activeTab]);
  }, [activeTab]);

  useEffect(() => {
    document.title =
      'ШІ-помічник лікаря — 16 готових рішень для щоденної практики';

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
      'og:title': 'ШІ-помічник лікаря — 16 готових рішень',
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
      <ToolkitNav blocks={blocks} activeTab={activeTab} onTabChange={setActiveTab} />
      <main className={styles.content}>
        <h1 className="sr-only">ШІ-помічник лікаря — 16 готових рішень для щоденної практики</h1>
        <ToolkitWelcome
          onTabChange={(tab) => setActiveTab(tab as TabId)}
          onScrollToSolution={(id) => {
            setActiveTab('solutions');
            // Expand parent block and scroll to solution
            const parent = blocks.find(b => b.solutions.some(s => s.id === id));
            if (parent) {
              setExpandedBlocks(prev => ({ ...prev, [parent.id]: true }));
              requestAnimationFrame(() => {
                const el = document.getElementById(`solution-${id}`);
                el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              });
            }
          }}
        />

        {/* Solutions tab */}
        {activeTab === 'solutions' && (
          <div className={styles.tabContent}>
            <ToolkitSearch
              value={searchQuery}
              onChange={setSearchQuery}
              isOpen={searchOpen}
              onOpenChange={setSearchOpen}
            />

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
                        <div className={styles.solutionsGrid}>
                          {block.solutions.map((solution) => (
                            <SolutionCard
                              key={solution.id}
                              solution={solution}
                              blockColor={block.color}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        {/* Notebooks tab */}
        {activeTab === 'notebooks' && (
          <div className={styles.tabContent}>
            <SuperpowerSection />
          </div>
        )}

        {/* Setup tab */}
        {activeTab === 'setup' && (
          <div className={styles.tabContent}>
            <ToolkitSetupContent />
          </div>
        )}
      </main>
    </div>
  );
}
