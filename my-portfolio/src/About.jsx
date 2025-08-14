// src/components/About.jsx
import React from 'react';
import './About.css'; // New import for the about section styles

function About() {
  return (
    <section id="about" className="page-section">
      <h2>About Me</h2>
      <div className="about-grid">
        <div className="grid-item left-top">
          <h3>My Journey</h3>
          <p>
            I'm a passionate developer with a knack for turning ideas into reality. My journey began with a curiosity for how things work, leading me down the path of coding and design. I thrive on challenges and constantly seek to expand my skill set.
          </p>
        </div>
        <div className="grid-item main-right">
          <h3>Who I Am</h3>
          <p>
            Beyond coding, I'm an avid learner and a problem-solver. I love exploring new technologies and finding creative solutions to complex issues. My goal is to build impactful and intuitive web experiences that delight users.
            I believe in clean code, efficient processes, and continuous improvement. When I'm not coding, you might find me exploring the outdoors or diving into a good book.
          </p>
          <p>
            This section is designed to be taller, showcasing more detailed information about my background and philosophy. It spans two rows on larger screens, providing ample space for a richer narrative or an image.
          </p>
        </div>
        <div className="grid-item left-bottom-wrapper">
          <div className="left-bottom-part part-1">
            <h3>Skills</h3>
            <ul>
              <li>React.js</li>
              <li>JavaScript (ES6+)</li>
              <li>HTML5 & CSS3</li>
              <li>Node.js</li>
              <li>Git/GitHub</li>
              <li>Responsive Design</li>
            </ul>
          </div>
          <div className="left-bottom-part part-2">
            <h3>Interests</h3>
            <ul>
              <li>Web Development</li>
              <li>UI/UX Design</li>
              <li>Photography</li>
              <li>Learning new languages</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;