import { useEffect, useState, useCallback, useMemo } from 'react';
import { blocks } from '../data/ai-toolkit';
import type { Solution } from '../data/ai-toolkit';
import ToolkitNav from '../components/ai-toolkit/ToolkitNav/ToolkitNav';
import BlockHeader from '../components/ai-toolkit/BlockHeader/BlockHeader';
import SolutionCard from '../components/ai-toolkit/SolutionCard/SolutionCard';
import { ToolkitSetupContent } from '../components/ai-toolkit/ToolkitSetup/ToolkitSetup';
import SuperpowerSection from '../components/ai-toolkit/SuperpowerSection/SuperpowerSection';
import PasswordGate from '../components/ai-toolkit/PasswordGate/PasswordGate';
import ToolkitWelcome from '../components/ai-toolkit/ToolkitWelcome/ToolkitWelcome';
import ToolkitSearch from '../components/ai-toolkit/ToolkitSearch/ToolkitSearch';
import styles from './AiToolkitPage.module.css';

function matchesSolution(solution: Solution, query: string): boolean {
  const q = query.toLowerCase();
  return (
    solution.title.toLowerCase().includes(q) ||
    solution.prompt.toLowerCase().includes(q) ||
    (solution.tool ?? '').toLowerCase().includes(q)
  );
}

/** Simple collapsible section — no step numbers, no "Крок" */
function CollapsibleSection({
  id,
  title,
  description,
  expanded,
  onToggle,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <section className={styles.collapsibleSection} id={id}>
      <button
        type="button"
        className={styles.collapsibleSummary}
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={`${id}-content`}
      >
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitleRow}>
            <h2 className={styles.sectionTitle}>{title}</h2>
            <span className={`${styles.chevron} ${expanded ? styles.chevronOpen : ''}`} aria-hidden="true" />
          </div>
          {description && <p className={styles.sectionDescription}>{description}</p>}
        </div>
      </button>
      <div
        id={`${id}-content`}
        role="region"
        className={`${styles.collapsibleContent} ${expanded ? styles.collapsibleContentOpen : ''}`}
      >
        <div className={styles.collapsibleInner}>
          {children}
        </div>
      </div>
    </section>
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
    // Deep link to a specific solution? Expand its parent block
    const hash = window.location.hash.replace('#', '');
    if (hash.startsWith('solution-')) {
      const solutionId = hash.replace('solution-', '');
      const parent = blocks.find(b => b.solutions.some(s => s.id === solutionId));
      if (parent) {
        initial[parent.id] = true;
        return initial;
      }
    }
    return initial;
  });

  const toggleBlock = useCallback((id: string) => {
    setExpandedBlocks((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(() => {
    const hash = window.location.hash;
    return {
      'section-superpower': hash === '#section-superpower',
      'section-setup': hash === '#section-setup',
    };
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'section-setup' || hash === 'section-superpower') {
        setExpandedSections((prev) => ({ ...prev, [hash]: true }));
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const toggleSection = useCallback((id: string) => {
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredResults = useMemo(() => {
    const q = searchQuery.trim();
    if (!q) return null;
    return blocks.flatMap((block) =>
      block.solutions
        .filter((s) => matchesSolution(s, q))
        .map((solution) => ({ solution, blockColor: block.color }))
    );
  }, [searchQuery]);

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

  if (!authenticated) {
    return <PasswordGate onSuccess={() => setAuthenticated(true)} />;
  }

  return (
    <div className={styles.toolkitPage}>
      <ToolkitNav blocks={blocks} />
      <main className={styles.content}>
        <h1 className="sr-only">ШІ-помічник лікаря — 16 готових рішень для щоденної практики</h1>
        <ToolkitWelcome />
        <ToolkitSearch value={searchQuery} onChange={setSearchQuery} />

        {/* Filtered results when searching */}
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
            <p className={styles.searchEmpty}>
              Нічого не знайдено. Спробуйте інший запит.
            </p>
          )
        ) : (
          <>
            {/* Solutions — directly on page, no step wrapper */}
            {blocks.map((block) => (
              <div key={block.id}>
                <div
                  className={styles.blockSection}
                  style={{ '--block-bg': `color-mix(in srgb, ${block.color} 4%, transparent)` } as React.CSSProperties}
                >
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
              </div>
            ))}
            {/* Ready notebooks callout — above superpower section */}
            <div className={styles.readyNotebooksCallout}>
              <span className={styles.readyNotebooksIcon} aria-hidden="true">🎁</span>
              <p className={styles.readyNotebooksText}>
                6 ноутбуків з протоколами МОЗ та міжнародними гайдлайнами — готові до використання
              </p>
            </div>
            {/* NotebookLM — collapsible, no step number */}
            <CollapsibleSection
              id="section-superpower"
              title="NotebookLM — AI, який працює тільки з вашими документами"
              description="AI від Google, який працює ТІЛЬКИ з вашими документами. Без вигаданих фактів."
              expanded={expandedSections['section-superpower']}
              onToggle={() => toggleSection('section-superpower')}
            >
              <SuperpowerSection />
            </CollapsibleSection>

            {/* ChatGPT setup — collapsible, no step number */}
            <CollapsibleSection
              id="section-setup"
              title="Налаштування ChatGPT"
              description="Наступний крок · 2 хв. Уже спробували рішення вище? Налаштуйте ChatGPT під себе."
              expanded={expandedSections['section-setup']}
              onToggle={() => toggleSection('section-setup')}
            >
              <ToolkitSetupContent />
            </CollapsibleSection>
          </>
        )}
      </main>
    </div>
  );
}
