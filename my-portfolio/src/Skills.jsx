import './Skills.css';
import { HiCode } from 'react-icons/hi';
import { TbCube } from 'react-icons/tb';
import { FaDatabase, FaCloud } from 'react-icons/fa';
import { BsDiagram3 } from 'react-icons/bs';
import { motion, useReducedMotion } from 'motion/react';

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
        <motion.h2
          className="section-title skills-title"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5 }}
        >
          Skills
        </motion.h2>
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
            <motion.article
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
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;
