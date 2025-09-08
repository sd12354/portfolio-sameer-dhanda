import React from 'react';
import './About.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { FaUserAlt } from 'react-icons/fa';
import FloatingOrbs from './FloatingOrbs';
// ..
AOS.init();

function About() {
  return (
    <section id="about" className="page-section">
      <FloatingOrbs />
      <h2>About Me <FaUserAlt/> </h2>
      <div className="about-grid" >
        <div className="grid-item left-top" data-aos="fade-right">
          <h3>My Journey</h3>
          <p>
            I'm a passionate developer with a knack for turning ideas into reality. My journey began with a curiosity for how things work, leading me down the path of coding and design. I thrive on challenges and constantly seek to expand my skill set.
          </p>
        </div>
        <div className="grid-item main-right" data-aos="fade-left">
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
        {/* --- New Row for Portfolio and Music --- */}
        <div className="grid-item new-row-wrapper">
          <div className="adobe-portfolio">
            <h3>Adobe Portfolio</h3>
            {/* Replace the URL below with your actual Adobe portfolio embed link */}
            <iframe
              src="https://sameerdhanda.myportfolio.com/"
              width="100%"
              height="300"
              frameBorder="0"
              allowFullScreen
              title="Adobe Portfolio"
            ></iframe>
          </div>
          <div className="apple-music">
            <h3>Currently Listening</h3>
            {/* Replace this with your Apple Music embed code */}
            <iframe 
              src="https://embed.music.apple.com/us/album/the-last-wun/1830597627"
              width="100%"
              height="900"
              frameBorder="0"
              allow="autoplay; encrypted-media;"
              sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
              title="Apple Music Player"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;