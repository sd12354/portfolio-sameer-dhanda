import './Experience.css';
import { HiCalendar } from 'react-icons/hi';

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
  return (
    <section id="experience" className="experience-section">
      <div className="section-inner">
        <h2 className="section-title">Experience</h2>
        <div className="experience-timeline">
          <div className="experience-line" aria-hidden />
          <ul className="experience-list">
            {experiences.map((job) => (
              <li key={`${job.company}-${job.title}`} className="experience-item">
                <div className="experience-node" aria-hidden>
                  <span className="experience-node-dot" />
                </div>
                <article className="experience-card">
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
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Experience;
