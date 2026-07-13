import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  FaAws,
  FaGithub,
  FaJava,
  FaLinkedin,
  FaPython,
  FaReact,
} from 'react-icons/fa';
import {
  SiAdobe,
  SiFirebase,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiSwift,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';
import {
  HiArrowRight,
  HiChevronLeft,
  HiChevronRight,
  HiMail,
  HiOutlineBriefcase,
  HiOutlineSparkles,
  HiOutlineViewList,
  HiOutlineExternalLink,
  HiOutlineLocationMarker,
} from 'react-icons/hi';
import './BentoView.css';

const WAVE_INTERVAL_MS = 300;

function BentoCardFx({ waves }) {
  return (
    <span className="bento-card-fx" aria-hidden>
      <span className="bento-card-glow" />
      <span className="bento-card-waves">
        {waves.map((w) => (
          <span
            key={w.id}
            className="bento-card-wave"
            style={{ left: `${w.x}%`, top: `${w.y}%` }}
          />
        ))}
      </span>
    </span>
  );
}

function useBentoEnergy() {
  const ref = useRef(null);
  const waveId = useRef(0);
  const lastWave = useRef(0);
  const [waves, setWaves] = useState([]);
  const reduce = useReducedMotion();

  // Glass tilt toward the cursor — springs keep it smooth, and framer
  // composes these with its own entrance transform without conflicts.
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 220, damping: 20 });
  const rotateY = useSpring(tiltY, { stiffness: 220, damping: 20 });

  const onMouseMove = useCallback(
    (e) => {
      const node = ref.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / rect.width) * 100;
      const my = ((e.clientY - rect.top) / rect.height) * 100;
      node.style.setProperty('--mx', `${mx}%`);
      node.style.setProperty('--my', `${my}%`);
      node.style.setProperty('--glow', '1');

      if (reduce) return;

      tiltX.set(((my - 50) / 50) * -3);
      tiltY.set(((mx - 50) / 50) * 3);

      const now = Date.now();
      if (now - lastWave.current < WAVE_INTERVAL_MS) return;
      lastWave.current = now;

      const id = ++waveId.current;
      setWaves((prev) => [...prev.slice(-6), { id, x: mx, y: my }]);
      window.setTimeout(() => {
        setWaves((prev) => prev.filter((w) => w.id !== id));
      }, 1050);
    },
    [reduce, tiltX, tiltY],
  );

  const onMouseLeave = useCallback(() => {
    const node = ref.current;
    if (!node) return;
    node.style.setProperty('--glow', '0');
    tiltX.set(0);
    tiltY.set(0);
  }, [tiltX, tiltY]);

  const tiltStyle = { rotateX, rotateY, transformPerspective: 900 };

  return { ref, waves, onMouseMove, onMouseLeave, tiltStyle };
}

function BentoCard({ as: Component = motion.div, className = '', children, style, ...props }) {
  const { ref, waves, onMouseMove, onMouseLeave, tiltStyle } = useBentoEnergy();
  const reduce = useReducedMotion();

  return (
    <Component
      ref={ref}
      className={`bento-card ${className}`.trim()}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ ...tiltStyle, ...style }}
      whileHover={reduce ? undefined : { y: -3 }}
      {...props}
    >
      <BentoCardFx waves={waves} />
      {children}
    </Component>
  );
}

function BentoProjectTile({ href, image, tag, title, blurb }) {
  const { ref, waves, onMouseMove, onMouseLeave, tiltStyle } = useBentoEnergy();
  const reduce = useReducedMotion();

  return (
    <motion.a
      ref={ref}
      className="bento-project-tile"
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={tiltStyle}
      whileHover={reduce ? undefined : { y: -3 }}
    >
      <BentoCardFx waves={waves} />
      <div
        className="bento-project-tile-image"
        style={{ backgroundImage: `url(${image})` }}
        aria-hidden
      />
      <div className="bento-project-tile-body">
        <p className="bento-card-eyebrow">{tag}</p>
        <h4 className="bento-card-title-sm">{title}</h4>
        <p className="bento-card-sub-sm">{blurb}</p>
        <span className="bento-project-cta">
          Open <HiArrowRight />
        </span>
      </div>
    </motion.a>
  );
}

const SKILLS = [
  FaReact,
  SiTypescript,
  SiNextdotjs,
  SiNodedotjs,
  FaPython,
  FaJava,
  SiPostgresql,
  SiPrisma,
  SiSwift,
  SiTailwindcss,
  SiJavascript,
  SiFirebase,
  FaAws,
  SiAdobe,
  FaGithub,
];

const CURRENT_BULLETS = [
  'Early team member at a startup AI biotech company building foundation models for DNA.',
  'Helping ship the MVP for an AI recombination model from the ground up.',
  'Working full-stack across frontend and backend on core product features.',
  'Leveraging AI tooling like Claude Code to accelerate iteration.',
];

const PROJECTS = [
  {
    id: 'vinylvault',
    title: 'VinylVault',
    blurb: 'Vinyl manager with live Discogs/eBay pricing & AI-written listings.',
    image: '/vinylvault-1.png',
    href: 'https://album-manager-neon.vercel.app/',
    tag: 'Next.js · TS · AI',
  },
  {
    id: 'applyflow',
    title: 'ApplyFlow',
    blurb: 'Turns job-search Gmail into a kanban application pipeline.',
    image: '/applyflow-1.png',
    href: 'https://apply-flow-93wa.vercel.app/landing',
    tag: 'Next.js · Postgres · OAuth',
  },
  {
    id: 'film-vault',
    title: 'Film Vault',
    blurb: 'DVD collection cataloging with barcode scan + TMDB metadata.',
    image: '/sd-website.svg',
    href: 'https://film-vault.com/',
    tag: 'React · Firebase · PWA',
  },
  {
    id: 'treasure-seeker',
    title: 'Treasure Seeker',
    blurb: 'React + Firebase treasure-hunt platform with auth & leaderboard.',
    image: '/treasure-seeker-3.png',
    href: 'https://treasure-seeker-a771e.web.app/',
    tag: 'React · TS · Firebase',
  },
  {
    id: 'translateme',
    title: 'TranslateMe (iOS)',
    blurb: 'SwiftUI translator with real-time Firestore history.',
    image: '/translateme-preview.png',
    href: 'https://youtube.com/shorts/mmScV6eegjE',
    tag: 'SwiftUI · Firebase',
  },
  {
    id: 'studysync',
    title: 'StudySync (iOS)',
    blurb: 'Campus app for finding in-person study sessions.',
    image: '/sd-website.svg',
    href: 'https://github.com/sd12354/Unit-7-Group-Milestone-1',
    tag: 'SwiftUI · MVVM',
  },
];

export default function BentoView({ onExit, theme }) {
  const reduce = useReducedMotion();
  const scrollerRef = useRef(null);

  const stagger = (i) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.04 * i, duration: 0.35, ease: [0.22, 1, 0.36, 1] },
        };

  const scrollProjects = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.85 * (dir === 'right' ? 1 : -1);
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onExit();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onExit]);

  return (
    <section className="bento-view" data-theme={theme}>
      <div className="bento-toolbar">
        <div className="bento-toolbar-left">
          <span className="bento-eyebrow">Sameer Dhanda</span>
          <h1 className="bento-h1">Portfolio · Bento View</h1>
        </div>
        <button type="button" className="bento-exit" onClick={onExit}>
          <HiOutlineViewList />
          Scroll View
        </button>
      </div>

      <div className="bento-grid">
        {/* Profile — big card */}
        <BentoCard className="bento-card--profile" {...stagger(0)}>
          <div className="bento-profile-row">
            <img src="/headshot.png" alt="Sameer Dhanda" className="bento-avatar" />
            <div className="bento-profile-text">
              <span className="bento-card-eyebrow">I’m</span>
              <h2 className="bento-card-title">Sameer Dhanda</h2>
              <p className="bento-profile-role">Software Engineer · Howard University CS</p>
              <p className="bento-card-body">
                Senior CS at Howard University, currently an AI Intern at <strong>Baobab</strong>{' '}
                building foundation models for DNA. Previously interned in engineering at the{' '}
                <strong>NBA</strong> and at <strong>Altoida</strong>, a health-tech startup.
              </p>
              <p className="bento-card-body">
                I like building products that are useful, reliable, and easy to maintain — from
                full-stack web apps to iOS apps. Open to internship opportunities for Fall 2026.
              </p>
              <p className="bento-profile-meta">
                <HiOutlineLocationMarker aria-hidden /> Boston, MA · Washington, DC
              </p>
            </div>
          </div>
          <div className="bento-stats">
            {[
              ['3', 'Internships'],
              ['6', 'Projects'],
              ['4', 'Leadership Roles'],
              ['15+', 'Technologies'],
            ].map(([value, label]) => (
              <div key={label} className="bento-stat">
                <span className="bento-stat__value">{value}</span>
                <span className="bento-stat__label">{label}</span>
              </div>
            ))}
          </div>
        </BentoCard>

        {/* Currently working at Baobab */}
        <BentoCard
          as={motion.a}
          className="bento-card--current"
          href="https://www.baobab.bio/"
          target="_blank"
          rel="noopener noreferrer"
          {...stagger(1)}
        >
          <span className="bento-card-eyebrow bento-current-eyebrow">
            <span className="bento-status-dot" aria-hidden />
            Currently
          </span>
          <div className="bento-current-row">
            <img src="/baobab-logo.png" alt="Baobab" className="bento-current-logo" />
            <div>
              <h3 className="bento-card-title-sm">AI Intern at Baobab</h3>
              <p className="bento-card-sub-sm">Foundation models for DNA · Jun 2026 →</p>
            </div>
          </div>
          <ul className="bento-current-bullets">
            {CURRENT_BULLETS.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <div className="bento-current-tags">
            {['Foundation Models', 'AI · Biotech', 'Full-Stack', 'Claude Code'].map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </BentoCard>

        {/* GitHub with heatmap */}
        <BentoCard
          as={motion.a}
          className="bento-card--github"
          href="https://github.com/sd12354"
          target="_blank"
          rel="noopener noreferrer"
          {...stagger(2)}
        >
          <div className="bento-github-head">
            <FaGithub className="bento-icon-lg" aria-hidden />
            <div className="bento-github-titles">
              <p className="bento-card-sub">GitHub</p>
              <p className="bento-card-title-sm">@sd12354</p>
            </div>
            <HiOutlineExternalLink className="bento-arrow" />
          </div>
          <div className="bento-github-heatmap">
            <img
              src="https://ghchart.rshah.org/4ade80/sd12354"
              alt="sd12354 GitHub contributions over the last year"
              loading="lazy"
            />
          </div>
          <p className="bento-card-sub-sm">Contributions over the last year — live from GitHub.</p>
        </BentoCard>

        {/* LinkedIn */}
        <BentoCard
          as={motion.a}
          className="bento-card--linkedin"
          href="https://www.linkedin.com/in/sameer-dhanda-b97437224/"
          target="_blank"
          rel="noopener noreferrer"
          {...stagger(3)}
        >
          <FaLinkedin className="bento-icon-lg" aria-hidden />
          <div>
            <p className="bento-card-sub">LinkedIn</p>
            <p className="bento-card-title-sm">Sameer Dhanda</p>
          </div>
          <HiOutlineExternalLink className="bento-arrow" />
        </BentoCard>

        {/* Email */}
        <BentoCard
          as={motion.a}
          className="bento-card--email"
          href="mailto:sameer.dhanda@bison.howard.edu"
          {...stagger(4)}
        >
          <HiMail className="bento-icon-lg" aria-hidden />
          <div>
            <p className="bento-card-sub">Email</p>
            <p className="bento-card-title-sm">sameer.dhanda@bison.howard.edu</p>
          </div>
        </BentoCard>

        {/* Projects — horizontal scroll */}
        <BentoCard className="bento-card--projects" {...stagger(5)}>
          <div className="bento-projects-head">
            <div>
              <p className="bento-card-eyebrow">Featured</p>
              <h3 className="bento-card-title-sm">Projects</h3>
            </div>
            <div className="bento-projects-arrows">
              <button
                type="button"
                onClick={() => scrollProjects('left')}
                aria-label="Scroll left"
              >
                <HiChevronLeft />
              </button>
              <button
                type="button"
                onClick={() => scrollProjects('right')}
                aria-label="Scroll right"
              >
                <HiChevronRight />
              </button>
            </div>
          </div>
          <div className="bento-projects-scroll" ref={scrollerRef}>
            {PROJECTS.map((p) => (
              <BentoProjectTile
                key={p.id}
                href={p.href}
                image={p.image}
                tag={p.tag}
                title={p.title}
                blurb={p.blurb}
              />
            ))}
          </div>
        </BentoCard>

        {/* Skills */}
        <BentoCard className="bento-card--skills" {...stagger(6)}>
          <div className="bento-card-head">
            <HiOutlineSparkles className="bento-card-head-icon" />
            <p className="bento-card-sub">Skills</p>
          </div>
          <div className="bento-skills-grid">
            {SKILLS.map((Icon, i) => (
              <span key={i} className="bento-skill">
                <Icon aria-hidden />
              </span>
            ))}
          </div>
        </BentoCard>

        {/* Honors */}
        <BentoCard className="bento-card--honor" {...stagger(7)}>
          <div className="bento-card-head">
            <HiOutlineSparkles className="bento-card-head-icon" />
            <p className="bento-card-sub">Honors</p>
          </div>
          <ul className="bento-honors-list">
            <li>
              <strong>Last Mile Fund Scholar</strong>
              <span>Spring 2026</span>
            </li>
            <li>
              <strong>NBA x HBCU Fellow</strong>
              <span>1 of 70 from 10,000+ applicants</span>
            </li>
            <li>
              <strong>BisonBytes 2024 · 2nd Place</strong>
              <span>Fintech track</span>
            </li>
            <li>
              <strong>Founders Scholarship</strong>
              <span>Howard University · merit-based</span>
            </li>
            <li>
              <strong>Adobe Ambassador</strong>
              <span>Howard University campus</span>
            </li>
          </ul>
        </BentoCard>

        {/* Past experience */}
        <BentoCard className="bento-card--past" {...stagger(8)}>
          <div className="bento-card-head">
            <HiOutlineBriefcase className="bento-card-head-icon" />
            <p className="bento-card-sub">Previously</p>
          </div>
          <div className="bento-past-item">
            <img src="/nba-logo.svg" alt="NBA" className="bento-past-logo" />
            <div>
              <p className="bento-past-role">DTC Product &amp; Tech Ops Intern</p>
              <p className="bento-past-date">NBA · Jun – Aug 2025</p>
              <p className="bento-past-blurb">Digital products &amp; tech ops for fans</p>
            </div>
          </div>
          <div className="bento-past-item">
            <img src="/altoida-logo.png" alt="Altoida" className="bento-past-logo" />
            <div>
              <p className="bento-past-role">Software Engineering Intern</p>
              <p className="bento-past-date">Altoida · May – Aug 2024</p>
              <p className="bento-past-blurb">Automated API testing in health tech</p>
            </div>
          </div>
        </BentoCard>
      </div>
    </section>
  );
}
