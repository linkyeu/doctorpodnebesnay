import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import AiCoursePage from './pages/AiCoursePage';
// import BlogListingPage from './pages/BlogListingPage'; // Hidden until articles are polished
// import BlogArticlePage from './pages/BlogArticlePage'; // Hidden until articles are polished
import styles from './App.module.css';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const AiToolkitPage = lazy(() => import('./pages/AiToolkitPage'));
const ToolkitThankYouPage = lazy(() => import('./pages/ToolkitThankYouPage'));
const ToolkitPaymentFailedPage = lazy(() => import('./pages/ToolkitPaymentFailedPage'));

export default function App() {
  return (
    <div className={styles.app}>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/ai-course" element={<AiCoursePage />} />
          <Route path="/toolkit" element={<AiToolkitPage />} />
          <Route path="/toolkit/thank-you" element={<ToolkitThankYouPage />} />
          <Route path="/toolkit/payment-failed" element={<ToolkitPaymentFailedPage />} />
          {/* <Route path="/blog" element={<BlogListingPage />} /> */}{/* Hidden until articles are polished */}
          {/* <Route path="/blog/:slug" element={<BlogArticlePage />} /> */}{/* Hidden until articles are polished */}
        </Routes>
      </Suspense>
    </div>
  );
}
