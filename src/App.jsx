import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Members } from './pages/Members';
import { Contact } from './pages/Contact';
import { Info } from './pages/Info';
import { InfoDetail } from './pages/InfoDetail';
import { CustomCursor } from './components/ui/CustomCursor';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // ハッシュがある場合は、該当セクションまでスクロール
    if (hash) {
      // 少し遅延させてDOMが確実にレンダリングされた後にスクロール
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // ハッシュがない場合は、ページトップにスクロール
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

function App() {
  return (
    <div className="min-h-screen bg-background-primary font-sans antialiased text-text-primary selection:bg-primary selection:text-white flex flex-col cursor-none md:cursor-auto">
      <style>{`
        @media (min-width: 768px) {
          body, a, button, input, textarea, select {
            cursor: none !important;
          }
        }
      `}</style>
      <ScrollToTop />
      <CustomCursor />
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/members" element={<Members />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/info" element={<Info />} />
          <Route path="/info/:id" element={<InfoDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
