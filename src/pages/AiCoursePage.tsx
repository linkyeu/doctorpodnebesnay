import { useEffect } from 'react';
import styles from './AiCoursePage.module.css';
import CourseHero from '../components/ai-course/CourseHero/CourseHero';
import PainPoints from '../components/ai-course/PainPoints/PainPoints';
// WhyNotChatGpt merged into PainPoints (4 points + early CTA)
// Personas removed — duplicated PainPoints content, audience line merged into PainPoints accent block (Ilyakhov audit)
import BeforeAfter from '../components/ai-course/BeforeAfter/BeforeAfter';
// HowItWorks removed — Denys prefers without the 3-step plan section
import WhatsInside from '../components/ai-course/WhatsInside/WhatsInside';
import AuthorTrust from '../components/ai-course/AuthorTrust/AuthorTrust';
import SocialProof from '../components/ai-course/SocialProof/SocialProof';
// ProductOverview removed — duplicated WhatsInside content, broke narrative flow (Ilyakhov audit)
import Urgency from '../components/ai-course/Urgency/Urgency';
import Pricing from '../components/ai-course/Pricing/Pricing';
// FAQ removed — objections already covered in Pricing features
// FinalCta removed — Pricing is the last product section with CTA, no need to duplicate
import CourseFooter from '../components/ai-course/CourseFooter/CourseFooter';
import StickyMobileCta from '../components/ai-course/StickyMobileCta/StickyMobileCta';

export default function AiCoursePage() {
  useEffect(() => {
    document.title = 'ШІ-помічник лікаря — готові рішення з джерелами МОЗ | Др. Піднебесна';

    const metaDesc = document.querySelector('meta[name="description"]');
    const descContent =
      'Онлайн-довідник з готовими ШІ-рішеннями для лікарів — діагностика, протоколи, документація. Відкрий і працюй. 999 ₴, одноразова покупка.';
    if (metaDesc) {
      metaDesc.setAttribute('content', descContent);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = descContent;
      document.head.appendChild(meta);
    }

    // OG meta tags
    const ogTags: Record<string, string> = {
      'og:title': 'ШІ-помічник лікаря — готові рішення з джерелами МОЗ',
      'og:description': descContent,
      'og:url': 'https://doctorpidnebesna.com/ai-course',
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

    // Canonical
    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;
    const createdCanonical = !canonical;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://doctorpidnebesna.com/ai-course';

    return () => {
      createdMetas.forEach((m) => m.remove());
      if (createdCanonical && canonical) canonical.remove();
    };
  }, []);

  return (
    <div className={styles.coursePage}>
      <CourseHero />
      <PainPoints />
      <BeforeAfter />
      <WhatsInside />
      <AuthorTrust />
      <SocialProof />
      <Urgency />
      <Pricing />
      <CourseFooter />
      <StickyMobileCta />
    </div>
  );
}
