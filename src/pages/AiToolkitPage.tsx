import { useEffect } from 'react';
import { blocks } from '../data/ai-toolkit';
import ToolkitNav from '../components/ai-toolkit/ToolkitNav/ToolkitNav';
import ToolkitIntro from '../components/ai-toolkit/ToolkitIntro/ToolkitIntro';
import BlockHeader from '../components/ai-toolkit/BlockHeader/BlockHeader';
import SolutionCard from '../components/ai-toolkit/SolutionCard/SolutionCard';
import ToolComparison from '../components/ai-toolkit/ToolComparison/ToolComparison';
import ToolkitMistakes from '../components/ai-toolkit/ToolkitMistakes/ToolkitMistakes';
import ToolkitSetup from '../components/ai-toolkit/ToolkitSetup/ToolkitSetup';
import styles from './AiToolkitPage.module.css';

export default function AiToolkitPage() {
  useEffect(() => {
    document.title =
      'ШІ-помічник лікаря — 19 готових рішень для щоденної практики';

    const metaDesc = document.querySelector('meta[name="description"]');
    const descContent =
      'Довідник готових ШІ-рішень для лікарів: промпти для документації, діагностики, комунікації з пацієнтами. 19 рішень з чеклістами безпеки.';
    if (metaDesc) {
      metaDesc.setAttribute('content', descContent);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = descContent;
      document.head.appendChild(meta);
    }

    const ogTags: Record<string, string> = {
      'og:title': 'ШІ-помічник лікаря — 19 готових рішень',
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

  return (
    <div className={styles.toolkitPage}>
      <ToolkitNav blocks={blocks} />
      <main className={styles.content}>
        <ToolkitIntro />
        <ToolComparison />
        <ToolkitSetup />
        {blocks.map((block) => (
          <section
            key={block.id}
            className={styles.blockSection}
            style={{ '--block-bg': `color-mix(in srgb, ${block.color} 4%, transparent)` } as React.CSSProperties}
          >
            <BlockHeader block={block} />
            <div className={styles.solutionsGrid}>
              {block.solutions.map((solution) => (
                <SolutionCard
                  key={solution.id}
                  solution={solution}
                  blockColor={block.color}
                />
              ))}
            </div>
          </section>
        ))}
        <ToolkitMistakes />
      </main>
    </div>
  );
}
