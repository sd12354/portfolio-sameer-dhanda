import './Contact.css';
import { HiMail } from 'react-icons/hi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiDocumentText } from 'react-icons/hi';
import { motion, useReducedMotion } from 'motion/react';
import LinkedInBadge from './LinkedInBadge';
import GitHubActivity from './GitHubActivity';
import SparklesText from './magicui/SparklesText';
import AnimatedShinyText from './magicui/AnimatedShinyText';
import { Dock, DockIcon } from './magicui/Dock';

function Contact() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="contact" className="contact-section">
      <div className="contact-section__bg" aria-hidden />
      <motion.div
        className="contact-inner"
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.55 }}
      >
        <motion.h2 className="contact-heading">
          <SparklesText>Let&apos;s Work Together</SparklesText>
        </motion.h2>
        <motion.p className="contact-status">
          <AnimatedShinyText>Open to internship opportunities · Fall 2026</AnimatedShinyText>
        </motion.p>
        <motion.a
          href="mailto:sameer.dhanda@bison.howard.edu"
          className="contact-email"
          whileHover={reduceMotion ? undefined : { y: -1 }}
        >
          <HiMail className="contact-email-icon" aria-hidden />
          sameer.dhanda@bison.howard.edu
        </motion.a>
        <div className="contact-social">
          <Dock>
            <DockIcon href="https://github.com/sd12354" label="GitHub" external>
              <FaGithub />
            </DockIcon>
            <DockIcon
              href="https://www.linkedin.com/in/sameer-dhanda-b97437224/"
              label="LinkedIn"
              external
            >
              <FaLinkedin />
            </DockIcon>
            <DockIcon href="mailto:sameer.dhanda@bison.howard.edu" label="Email">
              <HiMail />
            </DockIcon>
            <DockIcon
              href="mailto:sameer.dhanda@bison.howard.edu?subject=Resume"
              label="Request resume"
            >
              <HiDocumentText />
            </DockIcon>
          </Dock>
        </div>
        <div className="contact-live-row">
          <GitHubActivity />
          <LinkedInBadge />
        </div>
      </motion.div>
    </section>
  );
}

export default Contact;
