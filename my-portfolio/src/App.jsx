import { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
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
import BentoView from './BentoView';
import ScrollProgress from './magicui/ScrollProgress';
import SmoothCursor from './magicui/SmoothCursor';
import SmoothScroll from './SmoothScroll';

const SECTION_IDS = ['home', 'about', 'experience', 'projects', 'skills', 'honors', 'contact'];

function App() {
  const [activeLink, setActiveLink] = useState('home');
  // Resolve the theme synchronously so the intro loader renders in the right
  // mode from the very first frame (no light flash for dark-mode users)
  const [theme, setTheme] = useState(() => {
    const stored = window.localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

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
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = (event) => {
    const next = theme === 'light' ? 'dark' : 'light';
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || !document.startViewTransition) {
      setTheme(next);
      return;
    }

    // Circular reveal expanding from the toggle button
    const rect = event?.currentTarget?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth - 40;
    const y = rect ? rect.top + rect.height / 2 : 40;
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(next));
    });
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 650,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    });
  };

  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('scroll'); // 'scroll' | 'bento'

  return (
    <div className="app-shell" data-theme={theme}>
      {/* Page mounts behind the intro so the curtain reveals a living site */}
      {loading && <Loading onLoadingComplete={() => setLoading(false)} />}
      <SmoothScroll />
      <ScrollProgress />
      <FloatingOrbs />
      <Navbar
        activeLink={activeLink}
        setActiveLink={setActiveLink}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <SmoothCursor />
      {view === 'bento' ? (
        <BentoView theme={theme} onExit={() => setView('scroll')} />
      ) : (
        <>
          <Home onOpenIndex={() => setView('bento')} />
          <div className="container">
            <div className="sections-stack">
              <About />
              <Experience />
              <Projects />
              <Skills />
              <Honors />
              <Contact />
            </div>
            <Footer />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
