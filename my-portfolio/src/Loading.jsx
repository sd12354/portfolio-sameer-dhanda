import { useState, useEffect } from 'react';

function Loading({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
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
    <div className="loading-screen">
      <div className="loading-screen__content">
        <div className="loading-screen__spinner" />
        <p className="loading-screen__text">{progress}%</p>
      </div>
      <style>{`
        @keyframes loading-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .loading-screen {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8fafc;
          z-index: 9999;
        }
        .loading-screen__content {
          text-align: center;
        }
        .loading-screen__spinner {
          width: 48px;
          height: 48px;
          margin: 0 auto 1.25rem;
          border: 3px solid rgba(37, 99, 235, 0.2);
          border-top-color: #2563eb;
          border-radius: 50%;
          animation: loading-spin 0.9s linear infinite;
        }
        .loading-screen__text {
          margin: 0;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: #64748b;
        }
      `}</style>
    </div>
  );
}

export default Loading;
