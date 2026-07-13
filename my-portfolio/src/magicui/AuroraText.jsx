import './magicui.css';

function AuroraText({ children, className = '' }) {
  return (
    <span className={`mui-aurora-text ${className}`.trim()}>{children}</span>
  );
}

export default AuroraText;
