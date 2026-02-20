import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Careers from './pages/Careers';
import Contact from './pages/Contact';

import './App.css';

gsap.registerPlugin(ScrollTrigger);

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetPath, setTargetPath] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = useCallback((path: string) => {
    if (path === location.pathname) return;
    setTargetPath(path);
    setIsTransitioning(true);
  }, [location.pathname]);

  useEffect(() => {
    if (isTransitioning && targetPath) {
      const timer = setTimeout(() => {
        navigate(targetPath);
        setIsTransitioning(false);
        setTargetPath(null);
        window.scrollTo(0, 0);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, targetPath, navigate]);

  useEffect(() => { ScrollTrigger.refresh(); }, [location.pathname]);

  return (
    <>
      {(isLoading || isTransitioning) && <LoadingScreen isLoading={isLoading || isTransitioning} onComplete={() => {}} />}
      <div className={`transition-opacity duration-300 ${isLoading || isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <Header onNavigate={handleNavigate} currentPath={location.pathname} />
        <main>
          <Routes>
            <Route path="/" element={<Home onNavigate={handleNavigate} />} />
            <Route path="/about" element={<About onNavigate={handleNavigate} />} />
            <Route path="/services" element={<Services onNavigate={handleNavigate} />} />
            <Route path="/projects" element={<Projects onNavigate={handleNavigate} />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer onNavigate={handleNavigate} />
      </div>
      <Toaster position="top-right" richColors closeButton />
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
