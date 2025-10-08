import React from 'react';
import './Contact.css';
import { FaRegComments } from 'react-icons/fa';

function Contact() {
  return (
    <section id="contact" className="page-section">
      <h2>Get in Touch <FaRegComments color="dodgerblue"/> </h2>
      <p>I'm always open to new opportunities and collaborations.</p>
      <form 
        className="contact-form" 
        action="https://formspree.io/f/mblkblea" 
        method="POST" 
      >
        <div className="form-group">
          <label htmlFor="name">Your Name</label>
          <input
            placeholder='John Doe'
            type="text" 
            id="name" 
            name="name" 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact">Email or Phone Number</label>
          <input 
            placeholder='johndoe@gmail.com'
            type="text" 
            id="contact" 
            name="contact" 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Your Message</label>
          <textarea 
            placeholder='What you would like to say'
            id="message" 
            name="message" 
            rows="5"
            required 
          />
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </section>
  );
}

export default Contact;