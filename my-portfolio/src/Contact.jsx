import './Contact.css';
import { HiMail } from 'react-icons/hi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiDocumentText } from 'react-icons/hi';
import { motion, useReducedMotion } from 'motion/react';

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
        <motion.h2 className="contact-heading">Let&apos;s Work Together</motion.h2>
        <motion.p className="contact-status">
          Open to internship opportunities · May 2026
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
          <motion.a
            href="https://github.com/sd12354"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-social-btn"
            aria-label="GitHub"
            whileHover={reduceMotion ? undefined : { y: -2, scale: 1.03 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
          >
            <FaGithub />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/sameer-dhanda-b97437224/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-social-btn"
            aria-label="LinkedIn"
            whileHover={reduceMotion ? undefined : { y: -2, scale: 1.03 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
          >
            <FaLinkedin />
          </motion.a>
          <motion.a
            href="mailto:sameer.dhanda@bison.howard.edu?subject=Resume"
            className="contact-social-btn"
            aria-label="Request resume"
            whileHover={reduceMotion ? undefined : { y: -2, scale: 1.03 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
          >
            <HiDocumentText />
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}

export default Contact;
