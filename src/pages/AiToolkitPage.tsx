import { useEffect, useState, useCallback } from 'react';
import { blocks } from '../data/ai-toolkit';
import ToolkitNav from '../components/ai-toolkit/ToolkitNav/ToolkitNav';
import { AiPitfalls } from '../components/ai-toolkit/ToolkitIntro/ToolkitIntro';
import BlockHeader from '../components/ai-toolkit/BlockHeader/BlockHeader';
import SolutionCard from '../components/ai-toolkit/SolutionCard/SolutionCard';
import { ToolkitSetupContent } from '../components/ai-toolkit/ToolkitSetup/ToolkitSetup';
import PasswordGate from '../components/ai-toolkit/PasswordGate/PasswordGate';
import styles from './AiToolkitPage.module.css';

function CollapsibleStep({
  id,
  step,
  title,
  description,
  expanded,
  onToggle,
  children,
}: {
  id: string;
  step: number;
  title: string;
  description?: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <section className={styles.stepSection} id={id}>
      <button
        type="button"
        className={styles.collapsibleSummary}
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={`${id}-content`}
      >
        <div className={styles.stepHeader} style={{ marginBottom: 0, position: 'static', padding: 0 }}>
          <div className={styles.stepTitleRow}>
            <span className={styles.stepCircle} aria-hidden="true">{step}</span>
            <h2 className={styles.stepTitle}>Крок {step}: {title}</h2>
            <span className={`${styles.chevron} ${expanded ? styles.chevronOpen : ''}`} aria-hidden="true" />
          </div>
          {description && <p className={styles.stepDescription}>{description}</p>}
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

  const [expandedBlocks, setExpandedBlocks] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(blocks.map((b) => [b.id, false]))
  );

  const toggleBlock = useCallback((id: string) => {
    setExpandedBlocks((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>(() => {
    // Check hash for deep links
    const hash = window.location.hash;
    const returning = localStorage.getItem('toolkit_visited') === 'true';

    return {
      'step-setup': hash === '#step-setup' ? true : !returning,
      'step-safety': hash === '#step-safety' ? true : false,
      'step-solutions': hash === '#step-solutions' ? true : false,
    };
  });

  // Mark as visited on first mount
  useEffect(() => {
    localStorage.setItem('toolkit_visited', 'true');
  }, []);

  // Handle hash changes (e.g. clicking nav links)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'step-setup' || hash === 'step-safety' || hash === 'step-solutions') {
        setExpandedSteps((prev) => ({ ...prev, [hash]: true }));
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const toggleStep = useCallback((id: string) => {
    setExpandedSteps((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  useEffect(() => {
    document.title =
      'ШІ-помічник лікаря — 17 готових рішень для щоденної практики';

    const metaDesc = document.querySelector('meta[name="description"]');
    const descContent =
      'Довідник готових ШІ-рішень для лікарів: промпти для документації, діагностики, комунікації з пацієнтами. Готові рішення з чеклістами безпеки.';
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

  if (!authenticated) {
    return <PasswordGate onSuccess={() => setAuthenticated(true)} />;
  }

  return (
    <div className={styles.toolkitPage}>
      <ToolkitNav blocks={blocks} />
      <main className={styles.content}>
{/* Крок 1: Налаштуйте інструменти */}
        <CollapsibleStep
          id="step-setup"
          step={1}
          title="Налаштуйте інструменти"
          description="Налаштуємо ChatGPT і NotebookLM — два інструменти для вашої практики."
          expanded={expandedSteps['step-setup']}
          onToggle={() => toggleStep('step-setup')}
        >
          <ToolkitSetupContent />
        </CollapsibleStep>

        {/* Крок 2: Відомі вади ChatGPT */}
        <CollapsibleStep
          id="step-safety"
          step={2}
          title="Відомі вади ChatGPT"
          description="У ChatGPT є три системні слабкості. У довіднику вони вже враховані — вам не потрібно про них думати."
          expanded={expandedSteps['step-safety']}
          onToggle={() => toggleStep('step-safety')}
        >
          <AiPitfalls />
        </CollapsibleStep>

        {/* Крок 3: Оберіть задачу */}
        <CollapsibleStep
          id="step-solutions"
          step={3}
          title="Знайдіть своє рішення"
          description="Оберіть задачу і слідкуйте інструкціям"
          expanded={expandedSteps['step-solutions']}
          onToggle={() => toggleStep('step-solutions')}
        >
          {blocks.map((block) => (
            <div
              key={block.id}
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
          ))}
        </CollapsibleStep>
      </main>
    </div>
  );
}
