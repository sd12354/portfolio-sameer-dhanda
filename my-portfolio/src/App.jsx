import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import Experience from './Experience';
import Skills from './Skills';
import Projects from './Projects';
import Honors from './Honors';
import Contact from './Contact';
import Loading from './Loading';
import Footer from './Footer';
import FloatingOrbs from './FloatingOrbs';

const SECTION_IDS = ['home', 'about', 'experience', 'skills', 'projects', 'honors', 'contact'];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const [theme, setTheme] = useState('light');
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      let currentActive = 'home';
      for (const sectionId of SECTION_IDS) {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            currentActive = sectionId;
          }
        }
      }
      setActiveLink(currentActive);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const stored = window.localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored);
      return;
    }
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const onMove = (e) => {
      setCursor({ x: e.clientX, y: e.clientY, visible: true });
    };
    const onLeave = () => setCursor((prev) => ({ ...prev, visible: false }));
    const onEnter = () => setCursor((prev) => ({ ...prev, visible: true }));

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Loading onLoadingComplete={() => setLoading(false)} />;
  }

  return (
    <div className="app-shell" data-theme={theme}>
      <FloatingOrbs />
      <Navbar
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        activeLink={activeLink}
        setActiveLink={setActiveLink}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <div
        className={cursor.visible ? 'custom-cursor custom-cursor--visible' : 'custom-cursor'}
        style={{ left: `${cursor.x}px`, top: `${cursor.y}px` }}
        aria-hidden
      >
      </div>
      <Home />
      <div className="container">
        <div className="sections-stack">
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Honors />
          <Contact />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
