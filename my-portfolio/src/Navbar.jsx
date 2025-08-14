// src/components/Navbar.jsx
import React from 'react';

const Navbar = ({ isMenuOpen, toggleMenu, activeLink, setActiveLink }) => {
  return (
    <nav className="navbar">
      <h1 className="logo">Sameer Dhanda</h1>
      <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <li>
          <a
            href="#home"
            className={activeLink === 'home' ? 'active' : ''}
            onClick={() => {
              setActiveLink('home');
              toggleMenu();
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
              toggleMenu();
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
              toggleMenu();
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
              toggleMenu();
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
  );
};

export default Navbar;