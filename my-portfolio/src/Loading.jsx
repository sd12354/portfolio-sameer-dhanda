import { useState, useEffect } from 'react';

function Loading({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);
  const streaks = Array.from({ length: 28 }, (_, index) => ({
    id: index,
    top: `${(index * 17) % 100}%`,
    delay: `${(index % 8) * 0.22}s`,
    duration: `${1.1 + (index % 5) * 0.22}s`,
    length: `${45 + (index % 6) * 25}px`,
    color: ['#7dd3fc', '#c4b5fd', '#fde68a', '#a7f3d0', '#e9d5ff'][index % 5],
    opacity: 0.28 + (index % 4) * 0.16,
  }));

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
      <div className="loading-screen__stars" aria-hidden>
        {streaks.map((streak) => (
          <span
            key={streak.id}
            className="loading-screen__streak"
            style={{
              top: streak.top,
              '--streak-delay': streak.delay,
              '--streak-duration': streak.duration,
              '--streak-length': streak.length,
              '--streak-color': streak.color,
              '--streak-opacity': streak.opacity,
            }}
          />
        ))}
      </div>
      <div className="loading-screen__content">
        <div className="loading-screen__rocket-pad" aria-hidden>
          <img
            src="/loading-rocket.png"
            alt=""
            className="loading-screen__rocket-img"
            width={280}
            height={280}
          />
        </div>
        <p className="loading-screen__text">{progress}%</p>
      </div>
      <style>{`
        @keyframes loading-warp {
          0% {
            transform: translateX(-20vw) scaleX(0.35);
            opacity: 0;
          }
          20% {
            opacity: var(--streak-opacity);
          }
          100% {
            transform: translateX(120vw) scaleX(1.4);
            opacity: 0;
          }
        }
        @keyframes rocket-float {
          0%, 100% { transform: rotate(-36deg) translateY(0); }
          25% { transform: rotate(-36deg) translateY(-2px); }
          75% { transform: rotate(-36deg) translateY(2px); }
        }
        .loading-screen {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: linear-gradient(125deg, #e0f2fe 0%, #f0f9ff 22%, #faf5ff 52%, #ecfdf5 78%, #f8fafc 100%);
          z-index: 9999;
        }
        .loading-screen__stars {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        .loading-screen__streak {
          position: absolute;
          left: -25vw;
          width: var(--streak-length);
          height: 2px;
          background: linear-gradient(90deg, transparent 0%, var(--streak-color) 45%, rgba(255,255,255,0.96) 100%);
          border-radius: 999px;
          opacity: 0;
          filter: blur(0.2px);
          animation: loading-warp var(--streak-duration) linear infinite;
          animation-delay: var(--streak-delay);
        }
        .loading-screen__content {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: 10px 0;
        }
        .loading-screen__rocket-pad {
          margin: 0 auto 1.1rem;
          width: min(200px, 56vw);
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.65rem 0.85rem;
          background: #0a0f18;
          border-radius: 22px;
          box-shadow:
            0 14px 36px rgba(30, 58, 95, 0.22),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
        }
        .loading-screen__rocket-img {
          width: 92%;
          height: auto;
          object-fit: contain;
          display: block;
          animation: rocket-float 0.3s ease-in-out infinite;
        }
        .loading-screen__text {
          margin: 0;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.03em;
          color: #1e3a5f;
          text-shadow: 0 1px 10px rgba(255, 255, 255, 0.75);
        }
      `}</style>
    </div>
  );
}

export default Loading;
