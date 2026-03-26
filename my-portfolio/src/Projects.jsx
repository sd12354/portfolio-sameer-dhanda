import './Projects.css';
import { HiExternalLink } from 'react-icons/hi';

const projects = [
  {
    id: 'treasure-seeker',
    title: 'Treasure Seeker',
    description:
      'A data-driven web application built and deployed end-to-end — custom REST API integrations, automated testing, and CI/CD from scratch.',
    tags: ['React', 'Firebase', 'REST API', 'CI/CD'],
    liveUrl: 'https://github.com/sd12354',
  },
  {
    id: 'react-firebase',
    title: 'React + Firebase Apps',
    description:
      'A collection of data-intensive apps featuring real-time database pipelines, SQL-style data modeling, and automated quality testing.',
    tags: ['React', 'Firebase', 'TypeScript', 'SQL'],
    liveUrl: null,
  },
  {
    id: 'double-edge',
    title: 'Double Edge',
    description:
      'Web app to visualize California wildfire impact on housing — APIs, data visualization, and an end-to-end user experience.',
    tags: ['React', 'Data Viz', 'REST API', 'Maps'],
    liveUrl: null,
  },
];

function Projects() {
  return (
    <section id="projects" className="projects-section">
      <div className="projects-section__bg" aria-hidden />
      <div className="projects-inner">
        <h2 className="section-title projects-title">Featured Projects</h2>
        <ul className="projects-list">
          {projects.map((project) => (
            <li key={project.id}>
              <article className="project-card">
                <header className="project-card__header">
                  <h3 className="project-card__title">{project.title}</h3>
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      className="project-card__cta"
                      {...(String(project.liveUrl).startsWith('http')
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                    >
                      <HiExternalLink aria-hidden />
                      View Live
                    </a>
                  ) : (
                    <span className="project-card__cta-placeholder" />
                  )}
                </header>
                <p className="project-card__desc">{project.description}</p>
                <ul className="project-card__tags">
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Projects;
