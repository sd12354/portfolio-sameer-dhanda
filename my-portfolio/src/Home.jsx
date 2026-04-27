import './Home.css';
import { HiArrowRight, HiChevronDown } from 'react-icons/hi';
import { motion, useReducedMotion } from 'motion/react';
import {
  FaAws,
  FaGithub,
  FaJava,
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

const techIcons = [
  { Icon: FaGithub, label: 'GitHub' },
  { Icon: FaJava, label: 'Java' },
  { Icon: FaPython, label: 'Python' },
  { Icon: SiTypescript, label: 'TypeScript' },
  { Icon: SiJavascript, label: 'JavaScript' },
  { Icon: FaAws, label: 'AWS' },
  { Icon: SiAdobe, label: 'Adobe' },
  { Icon: SiNextdotjs, label: 'Next.js' },
  { Icon: FaReact, label: 'React' },
  { Icon: SiNodedotjs, label: 'Node.js' },
  { Icon: SiFirebase, label: 'Firebase' },
  { Icon: SiTailwindcss, label: 'Tailwind CSS' },
  { Icon: SiPostgresql, label: 'PostgreSQL' },
  { Icon: SiPrisma, label: 'Prisma' },
  { Icon: SiSwift, label: 'Swift' },
];

function Home() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="home" className="hero">
      <div className="hero-mesh" aria-hidden />
      <motion.div
        className="hero-content"
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.h1
          className="hero-name"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Sameer Dhanda
        </motion.h1>
        <motion.p
          className="hero-role"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={reduceMotion ? undefined : { opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Software Engineer
        </motion.p>
        <motion.p
          className="hero-location"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={reduceMotion ? undefined : { opacity: 1 }}
          transition={{ delay: 0.28, duration: 0.5 }}
        >
          Based in Boston, MA / Washington, DC
        </motion.p>
        <motion.p
          className="hero-tagline"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={reduceMotion ? undefined : { opacity: 1 }}
          transition={{ delay: 0.36, duration: 0.5 }}
        >
          Building clean software and solving hard problems.
        </motion.p>
        <div className="hero-actions">
          <motion.a
            href="#projects"
            className="btn btn-primary"
            whileHover={reduceMotion ? undefined : { y: -2, scale: 1.01 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          >
            View My Work
            <HiArrowRight className="btn-icon-end" aria-hidden />
          </motion.a>
        </div>
        <div className="hero-tech-marquee" aria-label="Technologies">
          <div className="hero-tech-track">
            {techIcons.map(({ Icon, label }) => (
              <span key={`set-a-${label}`} className="hero-tech-item" title={label}>
                <Icon aria-hidden />
              </span>
            ))}
            {techIcons.map(({ Icon, label }) => (
              <span key={`set-b-${label}`} className="hero-tech-item" title={label}>
                <Icon aria-hidden />
              </span>
            ))}
          </div>
        </div>
      </motion.div>
      <a href="#about" className="hero-scroll-hint" aria-label="Scroll to about">
        <HiChevronDown />
      </a>
    </section>
  );
}

export default Home;
