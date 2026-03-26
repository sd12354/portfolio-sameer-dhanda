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

  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Loading onLoadingComplete={() => setLoading(false)} />;
  }

  return (
    <div className="app-shell">
      <FloatingOrbs />
      <Navbar
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        activeLink={activeLink}
        setActiveLink={setActiveLink}
      />
      <Home />
      <div className="container">
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Honors />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;
