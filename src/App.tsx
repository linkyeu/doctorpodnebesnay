import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
// import BlogListingPage from './pages/BlogListingPage'; // Hidden until articles are polished
// import BlogArticlePage from './pages/BlogArticlePage'; // Hidden until articles are polished
import styles from './App.module.css';

const AiCoursePage = lazy(() => import('./pages/AiCoursePage'));

export default function App() {
  return (
    <div className={styles.app}>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/ai-course" element={<AiCoursePage />} />
          {/* <Route path="/blog" element={<BlogListingPage />} /> */}{/* Hidden until articles are polished */}
          {/* <Route path="/blog/:slug" element={<BlogArticlePage />} /> */}{/* Hidden until articles are polished */}
        </Routes>
      </Suspense>
    </div>
  );
}
