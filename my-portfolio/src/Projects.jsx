import React, { useState } from 'react';
import './Projects.css';

const projectData = [
  {
    id: 1,
    title: 'Project Alpha',
    description: 'A responsive web application built with React and Node.js. It features a modern UI and a RESTful API.',
    image: 'https://via.placeholder.com/600x400/2a2a4b/ffffff?text=Project+Alpha',
  },
  {
    id: 2,
    title: 'Project Beta',
    description: 'An e-commerce platform with a clean design and seamless user experience. Developed using a MERN stack.',
    image: 'https://via.placeholder.com/600x400/2a2a4b/ffffff?text=Project+Beta',
  },
  {
    id: 3,
    title: 'Project Gamma',
    description: 'A mobile-first portfolio site with sleek animations and a dark theme. Built from scratch with HTML, CSS, and JavaScript.',
    image: 'https://via.placeholder.com/600x400/2a2a4b/ffffff?text=Project+Gamma',
  },
  {
    id: 4,
    title: 'Project Delta',
    description: 'A data visualization tool that renders complex datasets into interactive charts and graphs. Used D3.js and React.',
    image: 'https://via.placeholder.com/600x400/2a2a4b/ffffff?text=Project+Delta',
  },
  {
    id: 5,
    title: 'Project Epsilon',
    description: 'A real-time chat application with user authentication and group messaging features. Leveraged WebSockets and Express.',
    image: 'https://via.placeholder.com/600x400/2a2a4b/ffffff?text=Project+Epsilon',
  },
  {
    id: 6,
    title: 'Project Zeta',
    description: 'A productivity dashboard that tracks tasks, deadlines, and progress. Integrated with external APIs for weather and news.',
    image: 'https://via.placeholder.com/600x400/2a2a4b/ffffff?text=Project+Zeta',
  },
  {
    id: 7,
    title: 'Project Eta',
    description: 'An online booking system for a local service provider. Featured a booking calendar and automated email confirmations.',
    image: 'https://via.placeholder.com/600x400/2a2a4b/ffffff?text=Project+Eta',
  },
];

function Projects() {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const totalProjects = projectData.length;

  const nextProject = () => {
    setCurrentProjectIndex((prevIndex) => (prevIndex + 1) % totalProjects);
  };

  const prevProject = () => {
    setCurrentProjectIndex((prevIndex) => (prevIndex - 1 + totalProjects) % totalProjects);
  };

  return (
    <section id="projects" className="page-section">
      <h2>Projects</h2>
      <div className="carousel-container">
        <div 
          className="carousel-slides"
          style={{ transform: `translateX(-${currentProjectIndex * 100}%)` }}
        >
          {projectData.map((project) => (
            <div key={project.id} className="project-card">
              <img src={project.image} alt={project.title} />
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="carousel-nav">
          <button onClick={prevProject}>&lt;</button>
          <button onClick={nextProject}>&gt;</button>
        </div>
      </div>
    </section>
  );
}

export default Projects;