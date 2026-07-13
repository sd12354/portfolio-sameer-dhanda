import './magicui.css';

function AnimatedShinyText({ children, className = '' }) {
  return <span className={`mui-shiny-text ${className}`.trim()}>{children}</span>;
}

export default AnimatedShinyText;
