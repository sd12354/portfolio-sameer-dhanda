import './Navbar.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiDocumentText } from 'react-icons/hi';
import { HiMoon, HiSun } from 'react-icons/hi2';

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'honors', label: 'Honors' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = ({ isMenuOpen, toggleMenu, activeLink, setActiveLink, theme, toggleTheme }) => {
  const closeMenu = () => {
    if (isMenuOpen) toggleMenu();
  };

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main">
        <a
          href="#home"
          className="navbar-brand"
          aria-label="Sameer Dhanda — Home"
          onClick={() => {
            setActiveLink('home');
            closeMenu();
          }}
        >
          <span className="navbar-brand-mark" aria-hidden="true">
            <span className="navbar-brand-initials">SD</span>
          </span>
          <span className="navbar-brand-text">
            <span className="navbar-brand-name">Sameer Dhanda</span>
            <span className="navbar-brand-role">Software Engineer</span>
          </span>
        </a>

        <ul className={`nav-links ${isMenuOpen ? 'nav-links--open' : ''}`}>
          {NAV_LINKS.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={activeLink === id ? 'nav-link nav-link--active' : 'nav-link'}
                onClick={() => {
                  setActiveLink(id);
                  closeMenu();
                }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar-actions">
          <div className="navbar-social">
            <button
              type="button"
              className="navbar-icon-link navbar-theme-toggle"
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              onClick={toggleTheme}
            >
              {theme === 'light' ? <HiMoon /> : <HiSun />}
            </button>
            <a
              href="https://github.com/sd12354"
              target="_blank"
              rel="noopener noreferrer"
              className="navbar-icon-link"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/sameer-dhanda-b97437224/"
              target="_blank"
              rel="noopener noreferrer"
              className="navbar-icon-link"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="mailto:sameer.dhanda@bison.howard.edu?subject=Resume"
              className="navbar-icon-link"
              aria-label="Request resume"
            >
              <HiDocumentText />
            </a>
          </div>

          <button
            type="button"
            className={`nav-toggle ${isMenuOpen ? 'nav-toggle--open' : ''}`}
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
