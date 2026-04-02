import './Experience.css';
import { HiCalendar } from 'react-icons/hi';
import { motion, useReducedMotion } from 'motion/react';

const experiences = [
  {
    title: 'DTC Product & Tech Ops Intern',
    company: 'National Basketball Association',
    location: 'New York, NY',
    date: 'Jun – Aug 2025',
    bullets: [
      'Collaborated with product designers and engineers to improve digital assets and user-facing experiences.',
      'Partnered across teams to ship updates to digital products and streamline technical operations.',
      'Contributed to tooling and workflows that support how the league delivers content to fans.',
    ],
  },
  {
    title: 'Software Engineering Intern',
    company: 'Altoida',
    location: 'Remote / Boston, MA',
    date: 'May – Aug 2024',
    bullets: [
      'Built and maintained automated backend API tests that improved reliability and team velocity.',
      'Worked in an agile environment shipping incremental improvements with clear ownership.',
      'Strengthened familiarity with production-minded testing, APIs, and cross-functional collaboration.',
    ],
  },
];

function Experience() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="experience" className="experience-section">
      <div className="experience-inner">
        <motion.h2
          className="section-title"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5 }}
        >
          Experience
        </motion.h2>
        <div className="experience-timeline">
          <div className="experience-line" aria-hidden />
          <motion.ul
            className="experience-list"
            initial={reduceMotion ? false : 'hidden'}
            whileInView={reduceMotion ? undefined : 'show'}
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12 } },
            }}
          >
            {experiences.map((job) => (
              <motion.li
                key={`${job.company}-${job.title}`}
                className="experience-item"
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.45 }}
              >
                <div className="experience-node" aria-hidden>
                  <span className="experience-node-dot" />
                </div>
                <motion.article
                  className="experience-card"
                  whileHover={reduceMotion ? undefined : { y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <header className="experience-card-header">
                    <h3 className="experience-job-title">{job.title}</h3>
                    <div className="experience-date">
                      <HiCalendar className="experience-date-icon" aria-hidden />
                      <span>{job.date}</span>
                    </div>
                  </header>
                  <p className="experience-company">{job.company}</p>
                  <p className="experience-location">{job.location}</p>
                  <ul className="experience-bullets">
                    {job.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </motion.article>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

export default Experience;
