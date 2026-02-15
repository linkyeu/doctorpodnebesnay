import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import BlogComingSoon from './components/BlogComingSoon/BlogComingSoon';
import styles from './App.module.css';

export default function App() {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/blog" element={<BlogComingSoon />} />
      </Routes>
    </div>
  );
}
