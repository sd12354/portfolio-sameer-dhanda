function FooterModern() {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>
        <div style={styles.footerTop}>
          <div>
            <h3 style={styles.name}>Sameer Dhanda</h3>
            <p style={styles.tagline}>Full Stack Developer</p>
          </div>
          <div style={styles.socialIcons}>
            <a href="https://linkedin.com/in/your-profile" style={styles.socialIcon}>
              LinkedIn
            </a>
            <a href="https://github.com/sd12354" style={styles.socialIcon}>
              GitHub
            </a>
            <a href="mailto:your-email@example.com" style={styles.socialIcon}>
              Email
            </a>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <p style={styles.footerText}>
            © 2024 All rights reserved · Crafted with <span style={styles.heart}>❤️</span> and passion
          </p>
        </div>
      </div>
      
      <style>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.2); }
          50% { transform: scale(1); }
        }
      `}</style>
    </footer>
  );
}

const styles = {
  footer: {
    padding: '60px 20px 30px',
    background: 'rgba(16, 185, 129, 0.03)',
    borderTop: '1px solid rgba(16, 185, 129, 0.2)',
    marginTop: 'auto',
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  footerTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '40px',
    flexWrap: 'wrap',
    gap: '30px',
  },
  name: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#10b981',
    margin: '0 0 5px 0',
  },
  tagline: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0,
  },
  socialIcons: {
    display: 'flex',
    gap: '20px',
  },
  socialIcon: {
    color: '#9ca3af',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  footerBottom: {
    paddingTop: '20px',
    borderTop: '1px solid rgba(156, 163, 175, 0.1)',
    textAlign: 'center',
  },
  footerText: {
    color: '#6b7280',
    fontSize: '13px',
    margin: 0,
  },
  heart: {
    display: 'inline-block',
    color: '#ef4444',
    animation: 'heartbeat 1.5s ease-in-out infinite',
    margin: '0 3px',
  },
};

export default FooterModern;