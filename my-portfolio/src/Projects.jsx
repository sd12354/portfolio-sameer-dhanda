import React, { useState } from 'react';
import './Projects.css';
import { FaHammer } from 'react-icons/fa';
const projectData = [
  {
    id: 1,
    title: 'Double Edge',
    description: 'Double Edge is a web application which serves as a way to visualize and analyze the effects of California wildfires and the impact they have on the housing market you can check it out',
    image: 'double.png',
  },
  {
    id: 2,
    title: 'Blastid',
    description: 'An e-commerce platform with a clean design and seamless user experience. Developed using a MERN stack.',
    image: 'blastid.png',
  },
  {
    id: 3,
    title: 'SmartU',
    description: 'A mobile-first portfolio site with sleek animations and a dark theme. Built from scratch with HTML, CSS, and JavaScript.',
    image: 'smart.png',
  },
  {
    id: 4,
    title: 'Hades AIO',
    description: 'A data visualization tool that renders complex datasets into interactive charts and graphs. Used D3.js and React.',
    image: 'hades.png',
  },
  {
    id: 5,
    title: 'Syntis',
    description: 'A real-time chat application with user authentication and group messaging features. Leveraged WebSockets and Express.',
    image: 'syntis.png',
  },
  {
    id: 6,
    title: 'No Bounds',
    description: 'A productivity dashboard that tracks tasks, deadlines, and progress. Integrated with external APIs for weather and news.',
    image: 'nb.png',
  },
  {
    id: 7,
    title: 'OB Nav',
    description: 'An online booking system for a local service provider. Featured a booking calendar and automated email confirmations.',
    image: '/public/ob.png',
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
      <h2>Projects <FaHammer/> </h2>
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