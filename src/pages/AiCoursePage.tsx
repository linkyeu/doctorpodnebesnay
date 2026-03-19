import { useEffect } from 'react';
import styles from './AiCoursePage.module.css';
import CourseHero from '../components/ai-course/CourseHero/CourseHero';
import DailyReality from '../components/ai-course/DailyReality/DailyReality';
import NotACourse from '../components/ai-course/NotACourse/NotACourse';
import WhatsInside from '../components/ai-course/WhatsInside/WhatsInside';
import AuthorTrust from '../components/ai-course/AuthorTrust/AuthorTrust';
import Pricing from '../components/ai-course/Pricing/Pricing';
import CourseFooter from '../components/ai-course/CourseFooter/CourseFooter';
import StickyMobileCta from '../components/ai-course/StickyMobileCta/StickyMobileCta';

export default function AiCoursePage() {
  useEffect(() => {
    document.title = 'ШІ-помічник лікаря — готові рішення з джерелами МОЗ | Др. Піднебесна';

    const metaDesc = document.querySelector('meta[name="description"]');
    const descContent =
      'Впевнений діагноз — навіть у складному випадку. 17 готових рішень для лікарів на основі протоколів МОЗ. 999 ₴, одноразова покупка.';
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
      <DailyReality />
      <NotACourse />
      <WhatsInside />
      <AuthorTrust />
      <Pricing />
      <CourseFooter />
      <StickyMobileCta />
    </div>
  );
}
