import React from 'react';
import 'animate.css';
import './Home.css';
import MouseScroll from './MouseScroll';

function Home() {
  return (
    <section id="home" className="hero">
      <img src="headshot.png" alt="" />
      <h2 class="animate__animated animate__bounce">Hi, I’m <span className="highlight">Sameer Dhanda 👋🏽</span></h2>
      <p>I’m a passionate developer creating modern, beautiful, and functional web experiences.</p>
      <MouseScroll></MouseScroll>
    </section>
  );
}

export default Home;