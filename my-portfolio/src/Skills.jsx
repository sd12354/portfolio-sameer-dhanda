import './Skills.css';
import { HiCode } from 'react-icons/hi';
import { TbCube } from 'react-icons/tb';
import { FaDatabase, FaCloud, FaReact, FaPython, FaJava, FaAws } from 'react-icons/fa';
import { BsDiagram3 } from 'react-icons/bs';
import {
  SiTypescript,
  SiNextdotjs,
  SiPostgresql,
  SiSwift,
  SiFirebase,
  SiTailwindcss,
} from 'react-icons/si';
import { motion, useReducedMotion } from 'motion/react';
import OrbitingCircles from './magicui/OrbitingCircles';
import Tilt from './magicui/Tilt';
import TextAnimate from './magicui/TextAnimate';

const categories = [
  {
    Icon: HiCode,
    title: 'Languages',
    items: ['Python', 'Java', 'JavaScript', 'TypeScript', 'Swift', 'HTML', 'CSS'],
  },
  {
    Icon: TbCube,
    title: 'Frameworks & Libraries',
    items: ['React', 'Next.js', 'SwiftUI', 'Tailwind CSS', 'Prisma', 'Motion'],
  },
  {
    Icon: FaDatabase,
    title: 'Data & Backend',
    items: ['SQL/RDBMS', 'Data Pipelines', 'REST APIs', 'Firebase', 'Batch Processing'],
  },
  {
    Icon: FaCloud,
    title: 'Cloud & Tools',
    items: ['Google Cloud Platform', 'AWS', 'Git/GitHub', 'Postman', 'Jira', 'CI/CD'],
  },
  {
    Icon: BsDiagram3,
    title: 'Practices',
    items: ['Agile/Scrum', 'Automated Testing', 'Technical Documentation'],
  },
];

function Skills() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="skills" className="skills-section">
      <div className="skills-section__bg" aria-hidden />
      <div className="skills-inner">
        <TextAnimate className="section-title skills-title">Skills</TextAnimate>
        <motion.div
          className="skills-orbit"
          role="img"
          aria-label="Tech stack: React, TypeScript, Python, Next.js, Java, PostgreSQL, Swift, AWS, Firebase, Tailwind CSS"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="skills-orbit__ring skills-orbit__ring--outer" aria-hidden />
          <span className="skills-orbit__ring skills-orbit__ring--inner" aria-hidden />
          <span className="skills-orbit__center" aria-hidden>
            <img src="/pixel-sameer.png" alt="" />
          </span>
          <OrbitingCircles radius={128} duration={30} iconSize={44}>
            <FaReact title="React" />
            <SiTypescript title="TypeScript" />
            <FaPython title="Python" />
            <SiNextdotjs title="Next.js" />
            <FaJava title="Java" />
            <SiPostgresql title="PostgreSQL" />
          </OrbitingCircles>
          <OrbitingCircles radius={74} duration={22} iconSize={38} reverse>
            <SiSwift title="Swift" />
            <FaAws title="AWS" />
            <SiFirebase title="Firebase" />
            <SiTailwindcss title="Tailwind CSS" />
          </OrbitingCircles>
        </motion.div>
        <motion.div
          className="skills-grid"
          initial={reduceMotion ? false : 'hidden'}
          whileInView={reduceMotion ? undefined : 'show'}
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {categories.map(({ Icon, title, items }) => (
            <Tilt
              as={motion.article}
              key={title}
              className="skills-card"
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4 }}
              whileHover={reduceMotion ? undefined : { y: -3 }}
            >
              <header className="skills-card__head">
                <span className="skills-card__icon-wrap">
                  <Icon className="skills-card__icon" aria-hidden />
                </span>
                <h3 className="skills-card__title">{title}</h3>
              </header>
              <ul className="skills-card__list">
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Tilt>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;
