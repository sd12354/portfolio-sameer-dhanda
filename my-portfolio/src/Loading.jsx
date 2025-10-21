import { useState, useEffect } from 'react';
import './App.css';

function Loading({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onLoadingComplete(), 400);
          return 100;
        }
        return prev + 5;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.spinner}></div>
        <h2 style={styles.text}>{progress}%</h2>
      </div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(to bottom right, #151515 0%, #0e0e0e 50%)',
    zIndex: 9999,
  },
  content: {
    textAlign: 'center',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '2px solid rgba(205, 205, 205, 0.096)',
    borderTop: '2px solid #4dffb5',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 30px',
    background: "transparent"
  },
  text: {
    color: '#4dffb5',
    fontSize: '1.25rem',
    background: 'transparent',
    border: 'none',
  },
};

export default Loading;