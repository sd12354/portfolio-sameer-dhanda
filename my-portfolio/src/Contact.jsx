import './Contact.css';
import { HiMail } from 'react-icons/hi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiDocumentText } from 'react-icons/hi';

function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-section__bg" aria-hidden />
      <div className="contact-inner">
        <h2 className="contact-heading">Let&apos;s Work Together</h2>
        <p className="contact-status">
          Open to internship opportunities · May 2026
        </p>
        <a href="mailto:sameer.dhanda@bison.howard.edu" className="contact-email">
          <HiMail className="contact-email-icon" aria-hidden />
          sameer.dhanda@bison.howard.edu
        </a>
        <div className="contact-social">
          <a
            href="https://github.com/sd12354"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-social-btn"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/sameer-dhanda-b97437224/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-social-btn"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:sameer.dhanda@bison.howard.edu?subject=Resume"
            className="contact-social-btn"
            aria-label="Request resume"
          >
            <HiDocumentText />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;
