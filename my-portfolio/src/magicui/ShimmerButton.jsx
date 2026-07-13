import './magicui.css';

function ShimmerButton({ href, onClick, children, className = '', ...props }) {
  const classes = `mui-shimmer-btn ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes} {...props}>
      {children}
    </button>
  );
}

export default ShimmerButton;
