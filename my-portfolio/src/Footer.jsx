import './Footer.css';

function Footer() {
  return (
    <footer className="site-footer">
      <p className="site-footer__text">
        © {new Date().getFullYear()} Sameer Dhanda. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
