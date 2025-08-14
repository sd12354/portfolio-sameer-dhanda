import React from 'react';

function Home() {
  return (
    <section id="home" className="hero">
      <h2>Hi, I’m <span className="highlight">Sameer Dhanda 👋🏽</span></h2>
      <p>I’m a passionate developer creating modern, beautiful, and functional web experiences.</p>
      {/* This is the element for the crescent planet. */}
      <div className="crescent-planet"></div>
    </section>
  );
}

export default Home;