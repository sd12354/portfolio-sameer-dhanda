import './Home.css';
import { useRef } from 'react';
import { HiArrowRight, HiChevronDown, HiOutlineViewGrid } from 'react-icons/hi';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import AuroraText from './magicui/AuroraText';
import WordRotate from './magicui/WordRotate';
import Meteors from './magicui/Meteors';
import ShimmerButton from './magicui/ShimmerButton';
import TypingAnimation from './magicui/TypingAnimation';
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

function Home({ onOpenIndex }) {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef(null);

  // Parallax exit: as the hero scrolls away its content sinks slower than the
  // page, fades, and softens — the mesh drifts at yet another rate for depth.
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const meshY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const parallaxStyle = reduceMotion
    ? undefined
    : { y: contentY, opacity: contentOpacity, scale: contentScale };

  return (
    <section id="home" className="hero" ref={heroRef}>
      <motion.div
        className="hero-mesh"
        style={reduceMotion ? undefined : { y: meshY }}
        aria-hidden
      />
      <Meteors number={18} />
      <motion.div className="hero-parallax" style={parallaxStyle}>
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
          <AuroraText>Sameer Dhanda</AuroraText>
        </motion.h1>
        <motion.p
          className="hero-role"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={reduceMotion ? undefined : { opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <WordRotate
            words={[
              'Software Engineer',
              'Full-Stack Developer',
              'iOS Developer',
              'Creative Technologist',
            ]}
          />
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
          <TypingAnimation delay={900}>
            Building clean software and solving hard problems.
          </TypingAnimation>
        </motion.p>
        <div className="hero-actions">
          <ShimmerButton href="#projects">
            View My Work
            <HiArrowRight className="btn-icon-end" aria-hidden />
          </ShimmerButton>
          <motion.button
            type="button"
            className="btn btn-secondary"
            onClick={onOpenIndex}
            whileHover={reduceMotion ? undefined : { y: -2, scale: 1.01 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          >
            <HiOutlineViewGrid className="btn-icon-start" aria-hidden />
            Bento View
          </motion.button>
        </div>
        <div
          className="hero-tech-marquee"
          role="img"
          aria-label={`Technologies: ${techIcons.map(({ label }) => label).join(', ')}`}
        >
          <div className="hero-tech-track" aria-hidden="true">
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
      </motion.div>
      <a href="#about" className="hero-scroll-hint" aria-label="Scroll to about">
        <HiChevronDown />
      </a>
    </section>
  );
}

export default Home;
