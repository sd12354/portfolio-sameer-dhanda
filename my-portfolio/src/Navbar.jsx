import './Navbar.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiMoon, HiSun } from 'react-icons/hi2';

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'honors', label: 'Honors' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = ({ activeLink, setActiveLink, theme, toggleTheme }) => {
  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main">
        <a
          href="#home"
          className="navbar-brand navbar-gradient-ring"
          aria-label="Sameer Dhanda — Home"
          onClick={() => setActiveLink('home')}
        >
          <span className="navbar-brand-text">
            <span className="navbar-brand-name">Sameer Dhanda</span>
          </span>
        </a>

        <ul className="nav-links">
          {NAV_LINKS.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={
                  activeLink === id
                    ? 'nav-link nav-link--active navbar-gradient-ring'
                    : 'nav-link navbar-gradient-ring'
                }
                onClick={() => setActiveLink(id)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar-actions">
          <div className="navbar-social">
            <a
              href="https://github.com/sd12354"
              target="_blank"
              rel="noopener noreferrer"
              className="navbar-icon-link navbar-gradient-ring"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/sameer-dhanda-b97437224/"
              target="_blank"
              rel="noopener noreferrer"
              className="navbar-icon-link navbar-gradient-ring"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <button
              type="button"
              className={
                theme === 'dark'
                  ? 'nav-theme-switch nav-theme-switch--dark navbar-gradient-ring'
                  : 'nav-theme-switch navbar-gradient-ring'
              }
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              aria-pressed={theme === 'dark'}
              onClick={toggleTheme}
            >
              <span className="nav-theme-switch__rail" aria-hidden>
                <span className="nav-theme-switch__icon">
                  <HiSun />
                </span>
                <span className="nav-theme-switch__icon">
                  <HiMoon />
                </span>
                <span className="nav-theme-switch__thumb" />
              </span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
