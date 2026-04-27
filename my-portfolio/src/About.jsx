import './About.css';
import { HiExternalLink } from 'react-icons/hi';
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
              I&apos;m a junior Computer Science student at Howard University, based in Boston and
              Washington, DC. I&apos;ve worked in engineering at the NBA and at a health tech startup.
              I like building products that are useful, reliable, and easy to maintain.
            </p>
            <p>
              Outside of coding, I spend a lot of time leading student organizations and helping move
              projects forward on campus.
            </p>
            <p className="about-copy__creative">
              I also work in graphics, UI design, and photography. That creative side helps me think
              more clearly about user experience and storytelling.
            </p>
            <motion.a
              href="https://sameerdhanda.myportfolio.com/home"
              className="about-portfolio-cta"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={reduceMotion ? undefined : { y: -2, scale: 1.01 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            >
              <HiExternalLink className="about-portfolio-cta__icon" aria-hidden />
              View creative portfolio
            </motion.a>
            <div className="about-leadership">
              <h3 className="about-leadership__title">Leadership</h3>
              <ul className="about-leadership__list">
                <li>
                  Google Student Developer Club, <strong>Freshman Liaison</strong> (2023-24)
                </li>
                <li>
                  Men of George Washington Carver Inc., <strong>Co-Chair of Public Relations</strong>{' '}
                  (May 2024 to April 2025)
                </li>
                <li>
                  DC HBCU Inc., <strong>Public Relations Chair</strong> (January 2025 to October 2025);
                  nonprofit supporting the local DC community
                </li>
                <li>
                  College of Engineering &amp; Architecture, <strong>Social Media Coordinator</strong>{' '}
                  (2025-26)
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
