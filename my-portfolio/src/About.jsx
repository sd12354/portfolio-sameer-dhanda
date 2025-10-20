import React from 'react';
import './About.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaUserAlt } from 'react-icons/fa';
import { BiLogoAdobe } from 'react-icons/bi';
import FloatingOrbs from './FloatingOrbs';
import { BsMusicNoteList } from 'react-icons/bs';
import { FaRocket } from 'react-icons/fa';
import { BsPersonBoundingBox } from 'react-icons/bs';
import { FaReact, FaJava, FaPython, FaGithub, FaAws} from 'react-icons/fa6';
import { BiLogoFirebase } from 'react-icons/bi';
import { IoLogoVercel } from 'react-icons/io5';
import { BsFiletypeSql } from 'react-icons/bs';
import { FaHtml5 } from 'react-icons/fa';
import { MdOutlineInterests } from 'react-icons/md';
import { PiPersonSimpleSkiLight } from 'react-icons/pi';

AOS.init();

function About() {
  return (
    <section id="about" className="page-section">
      <FloatingOrbs />
      <h2>About Me <FaUserAlt color="dodgerblue"></FaUserAlt> </h2>
      <div className="about-grid" >
        <div className="grid-item left-top" data-aos="fade-right">
          <h3>My Journey <FaRocket></FaRocket> </h3>
          <p>
          From Boston to Washington, D.C., my path has been fueled by curiosity and a passion for technology. I began building a strong academic foundation at the John D. O'Bryant School of Mathematics and Science, where I pushed myself through rigorous AP courses in computer science and math. That drive led me to Howard University, where I'm pursuing a B.A. in Computer Science and furthering my passion for solving problems through code.
          <br></br>
          <br></br>
          Along the way, I've had the chance to work with organizations that shaped me both technically and professionally. At Altoida, I learned how agile teams bring products to life, developing backend API tests that improved efficiency. Most recently, I joined the National Basketball Association as a DTC Product & Tech Ops intern, collaborating with product designers and engineers to improve digital assets and optimize user experiences. Each experience sharpened my skills in software development while giving me perspective on the intersection of technology, design, and global impact.
          </p>
        </div>
        <div className="grid-item main-right" data-aos="fade-left">
          {/* Image container with text overlay */}
          <div className="image-overlay-container">
            <img src="nba.png" className='about-img' alt="Profile" />
            <div className="image-text-overlay">
              <h3 className="overlay-title">Who I Am <BsPersonBoundingBox /></h3>
              <p>
          I'm a problem solver, builder, and collaborator who thrives at the intersection of technology and creativity. Whether it's coding backend systems, experimenting with new design tools, or leading social media strategy for student organizations, I enjoy using my skills to make ideas tangible and impactful.

          At my core, I'm driven by curiosity and growth. I love working in environments where innovation, teamwork, and learning collide. Beyond the classroom and internships, I've served as a leader in organizations like the College of Engineering & Architecture Student Council and The Men of George Washington Carver Inc., where I learned the value of community, responsibility, and giving back.

          I'm continuously exploring ways to merge my technical expertise with my broader interests — from sports and product design to community building — to create solutions that make a difference.
          </p>
            </div>
          </div>
        </div>
        <div className="grid-item left-bottom-wrapper">
          <div className="left-bottom-part part-1">
            <h3>Skills <PiPersonSimpleSkiLight></PiPersonSimpleSkiLight> </h3>
            <ul data-aos="fade-up" data-aos-delay="150">
              <li>React.js <FaReact></FaReact> </li>
              <li>JavaScript (ES6+) <FaJava></FaJava> </li>
              <li>HTML5 & CSS3 <FaHtml5></FaHtml5> </li>
              <li>AWS Cloud Practicioner <FaAws></FaAws> </li>
              <li>SQL <BsFiletypeSql></BsFiletypeSql> </li>
              <li>Git/GitHub <FaGithub></FaGithub> </li>
              <li>Python <FaPython></FaPython> </li>
            </ul>
          </div>
          <div className="left-bottom-part part-2">
            <h3>Interests <MdOutlineInterests></MdOutlineInterests> </h3>
            <ul data-aos="fade-up" data-aos-delay="150">
              <li>Frontend Development</li>
              <li>Machine Learning</li>
              <li>UI/UX Design</li>
              <li>Photography</li>
              <li>Learning new languages</li>
            </ul>
          </div>
        </div>
        {/* --- New Row for Portfolio and Music --- */}
        <div className="grid-item new-row-wrapper">
          <div className="adobe-portfolio" data-aos="fade-up">
            <h3>Adobe Portfolio <BiLogoAdobe></BiLogoAdobe></h3>
            <iframe
              src="https://sameerdhanda.myportfolio.com/"
              width="100%"
              height="300"
              frameBorder="0"
              allowFullScreen
              title="Adobe Portfolio"
            ></iframe>
          </div>
          <div className="apple-music" data-aos="fade-right">
            <h3>Currently Listening <BsMusicNoteList></BsMusicNoteList></h3>
            <iframe 
              src="https://music.apple.com/us/playlist/pl.u-Ymb00APTPV1mWo"
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
