import './App.css'

function App() {
  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="logo">My Portfolio</h1>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About Me</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <h2>Hi, I’m <span className="highlight">Your Name</span></h2>
        <p>I’m a passionate developer creating modern, beautiful, and functional web experiences.</p>
      </section>
    </div>
  );
}

export default App
