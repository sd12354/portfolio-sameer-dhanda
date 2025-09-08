import React from 'react';
import './Projects.css'
import { FaHome } from 'react-icons/fa';
import { IoPersonCircle } from 'react-icons/io5';
import { FaProjectDiagram, FaInfo, FaRocketchat } from 'react-icons/fa';
const Navbar = ({ isMenuOpen, toggleMenu, activeLink, setActiveLink }) => {
  return (
    <nav className="navbar">
      <h1> &#123; SD &#125;</h1>
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
            Home <FaHome/>
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
            About Me <IoPersonCircle/>
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
            Projects <FaProjectDiagram/>
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
            Contact <FaRocketchat/>
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