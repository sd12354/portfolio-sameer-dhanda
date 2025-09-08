import React from 'react';
import { FaReact, FaJava, FaPython, FaGithub, FaAws} from 'react-icons/fa6';
import './Skills.css';
import { BiLogoFirebase } from 'react-icons/bi';
import { BiLogoAdobe } from 'react-icons/bi';
import { IoLogoVercel } from 'react-icons/io5';
import { BsFiletypeSql } from 'react-icons/bs';

const skills = [
  { icon: <FaGithub /> },
  { icon: <FaReact /> },
  { icon: <FaJava />},
  { icon: <FaPython /> },
  { icon: <FaAws /> },
  { icon: <BiLogoFirebase /> },
  { icon: <BiLogoAdobe /> },
  { icon: <IoLogoVercel /> },
  { icon: <BsFiletypeSql/> },
];

function SkillsMarquee() {
  return (
    <section className="skills-marquee-section">
      <div className="marquee-container">
        {/* We duplicate the content to create a seamless loop */}
        <div className="marquee-content">
          {skills.map((skill, index) => (
            <div className="skill-item" key={`first-${index}`}>
              {skill.icon}
              <p>{skill.name}</p>
            </div>
          ))}
          {skills.map((skill, index) => (
            <div className="skill-item" key={`second-${index}`}>
              {skill.icon}
              <p>{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SkillsMarquee;