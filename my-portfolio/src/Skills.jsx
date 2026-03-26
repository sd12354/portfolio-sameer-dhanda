import './Skills.css';
import { HiCode } from 'react-icons/hi';
import { TbCube } from 'react-icons/tb';
import { FaDatabase, FaCloud } from 'react-icons/fa';
import { BsDiagram3 } from 'react-icons/bs';

const categories = [
  {
    Icon: HiCode,
    title: 'Languages',
    items: ['Python', 'Java', 'JavaScript', 'TypeScript', 'Swift', 'HTML', 'CSS'],
  },
  {
    Icon: TbCube,
    title: 'Frameworks & Libraries',
    items: ['React', 'Node.js'],
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
  return (
    <section id="skills" className="skills-section">
      <div className="skills-section__bg" aria-hidden />
      <div className="skills-inner">
        <h2 className="section-title skills-title">Skills</h2>
        <div className="skills-grid">
          {categories.map(({ Icon, title, items }) => (
            <article key={title} className="skills-card">
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
