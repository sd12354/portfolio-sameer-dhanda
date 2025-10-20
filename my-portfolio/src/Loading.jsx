import { useState, useEffect } from 'react';
import './App.css';

function Loading({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Wait a bit for the DOM to fully render with all images
    const checkImages = () => {
      const images = document.querySelectorAll('img');
      const totalImages = images.length;

      if (totalImages === 0) {
        // No images found, wait a bit longer or complete
        setTimeout(checkImages, 100);
        return;
      }

      let loadedImages = 0;

      const updateProgress = () => {
        loadedImages++;
        const currentProgress = Math.round((loadedImages / totalImages) * 100);
        setProgress(currentProgress);

        if (loadedImages === totalImages) {
          setTimeout(() => onLoadingComplete(), 400);
        }
      };

      const imagePromises = Array.from(images).map(img => {
        return new Promise((resolve) => {
          if (img.complete && img.naturalWidth !== 0) {
            // Image already loaded successfully
            resolve();
          } else {
            // Wait for image to load
            img.addEventListener('load', () => resolve());
            img.addEventListener('error', () => resolve()); // Resolve on error to prevent hanging
            
            // Force reload if src is set but not loading
            if (img.src && !img.complete) {
              const src = img.src;
              img.src = '';
              img.src = src;
            }
          }
        });
      });

      // Track progress as each promise resolves
      imagePromises.forEach(promise => {
        promise.then(updateProgress);
      });
    };

    // Start checking after a small delay to ensure DOM is ready
    const initTimer = setTimeout(checkImages, 100);

    return () => clearTimeout(initTimer);
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