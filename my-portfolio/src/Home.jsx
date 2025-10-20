import React from 'react';
import 'animate.css';
import './Home.css';
import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

function TypewriterText({ text }) {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    
    return () => clearInterval(timer);
  }, [text]);
  
  return <span>{displayText}<span style={{ animation: 'blink 1s infinite' }}>|</span></span>;
}

function Home() {
  return (
    <section id="home" class="hero" data-aos="zoom-in-up">
      <div className='Top'>
        <img src="headshot.png" alt="" />
        <h2>Hi, I’m <span style={{ color: '#4dffb5' }}><TypewriterText text="Sameer Dhanda 👋🏽!" /></span></h2>
        <p>I’m a passionate developer creating modern, beautiful, and functional web experiences.</p>
      </div>
    </section>
  );
}

export default Home;