import { useEffect } from 'react';
import styles from './AiCoursePage.module.css';
import CourseHero from '../components/ai-course/CourseHero/CourseHero';
import CourseTrustBadges from '../components/ai-course/CourseTrustBadges/CourseTrustBadges';
import PainPoints from '../components/ai-course/PainPoints/PainPoints';
import Outcomes from '../components/ai-course/Outcomes/Outcomes';
import SocialProof from '../components/ai-course/SocialProof/SocialProof';
import ForWho from '../components/ai-course/ForWho/ForWho';
import Credibility from '../components/ai-course/Credibility/Credibility';
import Pricing from '../components/ai-course/Pricing/Pricing';
import CourseFaq from '../components/ai-course/CourseFaq/CourseFaq';
import CourseFinalCta from '../components/ai-course/FinalCta/FinalCta';
import CourseFooter from '../components/ai-course/CourseFooter/CourseFooter';
import StickyMobileCta from '../components/ai-course/StickyMobileCta/StickyMobileCta';

export default function AiCoursePage() {
  useEffect(() => {
    document.title = 'ШІ-помічник лікаря: 15 готових рішень | Др. Піднебесна';

    const metaDesc = document.querySelector('meta[name="description"]');
    const descContent =
      '15 готових ШІ-шаблонів для лікарів — документація, діагностика, протоколи. Копіюєте, вставляєте, працює. 799₴, одноразова покупка.';
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
      'og:title': 'ШІ-помічник лікаря: 15 готових рішень',
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
      <CourseTrustBadges />
      <PainPoints />
      <Outcomes />
      <SocialProof />
      <Credibility />
      <ForWho />
      <Pricing />
      <CourseFaq />
      <CourseFinalCta />
      <CourseFooter />
      <StickyMobileCta />
    </div>
  );
}
