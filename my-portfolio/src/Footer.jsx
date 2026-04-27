import './Footer.css';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__text">
          © {new Date().getFullYear()} Sameer Dhanda. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
