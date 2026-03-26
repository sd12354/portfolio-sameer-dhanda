import './Home.css';
import { HiChevronDown } from 'react-icons/hi';

function Home() {
  return (
    <section id="home" className="hero">
      <div className="hero-mesh" aria-hidden />
      <div className="hero-content">
        <h1 className="hero-name">Sameer Dhanda</h1>
        <p className="hero-role">Software Engineer</p>
        <p className="hero-location">Based in Boston, MA / Washington, DC</p>
        <p className="hero-tagline">Building clean software and solving hard problems.</p>
        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary">
            View My Work
          </a>
          <a
            href="mailto:sameer.dhanda@bison.howard.edu?subject=Resume"
            className="btn btn-secondary"
          >
            Resume
          </a>
        </div>
      </div>
      <a href="#about" className="hero-scroll-hint" aria-label="Scroll to about">
        <HiChevronDown />
      </a>
    </section>
  );
}

export default Home;
