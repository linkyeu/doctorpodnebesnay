import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import BlogListingPage from './pages/BlogListingPage';
import BlogArticlePage from './pages/BlogArticlePage';
import styles from './App.module.css';

export default function App() {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/blog" element={<BlogListingPage />} />
        <Route path="/blog/:slug" element={<BlogArticlePage />} />
      </Routes>
    </div>
  );
}
