// src/App.jsx
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home'); // New state for active link

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Optional: Add logic to update the active link based on scroll position
  // This is a more advanced feature, but a great addition for SPAs.
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      let currentActive = 'home';
      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          // Check if the section is in the viewport
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
    <div className="container">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="logo">Sameer Dhanda</h1>

        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <li>
            <a 
              href="#home" 
              className={activeLink === 'home' ? 'active' : ''}
              onClick={() => {
                setActiveLink('home');
                setIsMenuOpen(false); // Close menu on click
              }}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="#about" 
              className={activeLink === 'about' ? 'active' : ''}
              onClick={() => {
                setActiveLink('about');
                setIsMenuOpen(false);
              }}
            >
              About Me
            </a>
          </li>
          <li>
            <a 
              href="#projects" 
              className={activeLink === 'projects' ? 'active' : ''}
              onClick={() => {
                setActiveLink('projects');
                setIsMenuOpen(false);
              }}
            >
              Projects
            </a>
          </li>
          <li>
            <a 
              href="#contact" 
              className={activeLink === 'contact' ? 'active' : ''}
              onClick={() => {
                setActiveLink('contact');
                setIsMenuOpen(false);
              }}
            >
              Contact
            </a>
          </li>
        </ul>

        <div className="hamburger" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </nav>

      {/* --- Page Sections --- */}
      <section id="home" className="hero">
        <h2>Hi, I’m <span className="highlight">Sameer Dhanda</span></h2>
        <p>I’m a passionate developer creating modern, beautiful, and functional web experiences.</p>
      </section>

      {/* Add your other sections here */}
      <section id="about" style={{ padding: '200px', textAlign: 'center' }}>
        <h2>About Me</h2>
      </section>
      <section id="projects" style={{ padding: '200px', textAlign: 'center' }}>
        <h2>Projects</h2>
      </section>
      <section id="contact" style={{ padding: '200px', textAlign: 'center' }}>
        <h2>Contact</h2>
      </section>
    </div>
  );
}

export default App;