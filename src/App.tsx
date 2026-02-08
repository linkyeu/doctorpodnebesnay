import { useState } from 'react';
import Hero from './components/Hero/Hero';
import Navigator from './components/Navigator/Navigator';
import Bio from './components/Bio/Bio';
import Footer from './components/Footer/Footer';
import Modal from './components/Modal/Modal';
import styles from './App.module.css';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.app}>
      <Hero onCtaClick={() => setIsModalOpen(true)} />
      <Navigator />
      <Bio />
      <Footer />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
