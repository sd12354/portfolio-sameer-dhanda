import './About.css';
import { LuBriefcase } from 'react-icons/lu';
import { motion, useReducedMotion } from 'motion/react';

function About() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="about" className="about-section">
      <div className="about-section__bg" aria-hidden />
      <div className="about-inner">
        <h2 className="section-title about-heading">About Me</h2>
        <div className="about-grid">
          <div className="about-visual">
            <motion.div
              className="about-visual__frame"
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="about-visual__aurora" aria-hidden>
                <span className="about-visual__orb about-visual__orb--1" />
                <span className="about-visual__orb about-visual__orb--2" />
                <span className="about-visual__orb about-visual__orb--3" />
              </div>
              <div className="about-visual__photo-wrap">
                <motion.img
                  src="/sameer-portrait.png"
                  alt="Sameer Dhanda"
                  className="about-visual__photo"
                  loading="lazy"
                  decoding="async"
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          y: [0, -6, 0],
                        }
                  }
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          scale: 1.03,
                          transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                        }
                  }
                />
              </div>
            </motion.div>
          </div>
          <div className="about-copy">
            <p>
              I&apos;m a junior Computer Science student at Howard University, based in Boston, MA and
              Washington, DC, with hands-on engineering experience at the NBA and a health-tech
              startup. I care about writing code that&apos;s intentional — systems that scale, data
              that&apos;s reliable, and products people actually use.
            </p>
            <p>
              When I&apos;m not building, I&apos;m leading, organizing, and pushing things forward on
              campus.
            </p>
            <div className="about-leadership">
              <h3 className="about-leadership__title">Leadership</h3>
              <ul className="about-leadership__list">
                <li>
                  Google Student Developer Club — <strong>Freshman Liaison</strong> (2023–24)
                </li>
                <li>
                  Men of George Washington Carver Inc. — <strong>Co-Chair of Public Relations</strong>{' '}
                  (May 2024 – April 2025)
                </li>
                <li>
                  DC HBCU Inc. — <strong>Public Relations Chair</strong> (January 2025 – October 2025);
                  nonprofit supporting the local DC community
                </li>
                <li>
                  College of Engineering &amp; Architecture — <strong>Social Media Coordinator</strong>{' '}
                  (2025–26)
                </li>
              </ul>
            </div>
            <div className="about-tags">
              <span className="about-tag about-tag--blue">
                <span className="about-tag-dot" aria-hidden />
                Open to internship opportunities · May 2026
              </span>
              <span className="about-tag about-tag--neutral">
                <LuBriefcase className="about-tag-icon" aria-hidden />
                May 2027 grad
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
