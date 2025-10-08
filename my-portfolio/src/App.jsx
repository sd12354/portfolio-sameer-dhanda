// src/App.jsx
import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import SkillsMarquee from './Skills'; // <-- New import
import Projects from './Projects';
import Contact from './Contact';
import SocialLinks from './SocialLinks';
import './Sociallinks.css'; 

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      let currentActive = 'home';
      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentActive = sectionId;
          }
        }
      }
      setActiveLink(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div class="gradient">
    <div className="container">
      <Navbar
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        activeLink={activeLink}
        setActiveLink={setActiveLink}
      />
      <Home />
      <About />
      <SkillsMarquee />
      <Projects />
      <Contact />
      <SocialLinks />
    </div>
    </div>
  );
}

export default App;