import { useState, useEffect } from 'react';

function makeStreaks(count, layerSeed) {
  /* Hues aligned with the light sky / lilac / mint backdrop */
  const colors = ['#7dd3fc', '#38bdf8', '#93c5fd', '#a5b4fc', '#c4b5fd', '#6ee7b7', '#fde68a', '#bae6fd'];
  return Array.from({ length: count }, (_, index) => {
    const n = index + layerSeed * 17;
    return {
      id: `${layerSeed}-${index}`,
      top: `${(n * 23) % 100}%`,
      delay: `${(n % 11) * 0.1}s`,
      duration: `${0.55 + (n % 8) * 0.1}s`,
      length: `${70 + (n % 9) * 42}px`,
      thickness: 1 + (n % 4),
      skew: -22 + (n % 6) * 3,
      color: colors[n % colors.length],
      opacity: layerSeed === 0 ? 0.38 + (n % 5) * 0.1 : 0.26 + (n % 5) * 0.08,
      blur: layerSeed === 0 ? 0.35 : 0.9,
    };
  });
}

function Loading({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);
  const streaksNear = makeStreaks(34, 0);
  const streaksFar = makeStreaks(26, 1);

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
      <div className="loading-screen__glow" aria-hidden />
      <div className="loading-screen__warp loading-screen__warp--far" aria-hidden>
        {streaksFar.map((streak) => (
          <span
            key={streak.id}
            className="loading-screen__streak loading-screen__streak--far"
            style={{
              top: streak.top,
              '--streak-delay': streak.delay,
              '--streak-duration': streak.duration,
              '--streak-length': streak.length,
              '--streak-thickness': `${streak.thickness}px`,
              '--streak-skew': `${streak.skew}deg`,
              '--streak-color': streak.color,
              '--streak-opacity': streak.opacity,
              '--streak-blur': `${streak.blur}px`,
            }}
          />
        ))}
      </div>
      <div className="loading-screen__warp loading-screen__warp--near" aria-hidden>
        {streaksNear.map((streak) => (
          <span
            key={streak.id}
            className="loading-screen__streak"
            style={{
              top: streak.top,
              '--streak-delay': streak.delay,
              '--streak-duration': streak.duration,
              '--streak-length': streak.length,
              '--streak-thickness': `${streak.thickness}px`,
              '--streak-skew': `${streak.skew}deg`,
              '--streak-color': streak.color,
              '--streak-opacity': streak.opacity,
              '--streak-blur': `${streak.blur}px`,
            }}
          />
        ))}
      </div>
      <div className="loading-screen__vignette" aria-hidden />
      <div className="loading-screen__content">
        <p className="loading-screen__text">{progress}%</p>
      </div>
      <style>{`
        @keyframes loading-warp {
          0% {
            transform: translate3d(-35vw, 0, 0) skewX(var(--streak-skew)) scaleX(0.2);
            opacity: 0;
          }
          12% {
            opacity: var(--streak-opacity);
          }
          100% {
            transform: translate3d(135vw, 0, 0) skewX(var(--streak-skew)) scaleX(1.85);
            opacity: 0;
          }
        }
        .loading-screen {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background:
            linear-gradient(128deg, #e0f2fe 0%, #f0f9ff 18%, #f5f3ff 42%, #ecfdf5 68%, #f8fafc 100%),
            radial-gradient(ellipse 95% 90% at 50% 42%, #f0f9ff 0%, #e0f2fe 38%, #ede9fe 72%, #f1f5f9 100%);
          z-index: 9999;
        }
        .loading-screen__glow {
          position: absolute;
          inset: -20%;
          background: radial-gradient(
            circle at 50% 45%,
            rgba(255, 255, 255, 0.55) 0%,
            rgba(186, 230, 253, 0.35) 22%,
            rgba(196, 181, 253, 0.18) 45%,
            rgba(167, 243, 208, 0.12) 62%,
            transparent 78%
          );
          pointer-events: none;
        }
        .loading-screen__warp {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .loading-screen__warp--far {
          opacity: 0.72;
          transform: scale(1.02);
        }
        .loading-screen__warp--near {
          z-index: 1;
        }
        .loading-screen__streak {
          position: absolute;
          left: -30vw;
          width: var(--streak-length);
          height: var(--streak-thickness);
          border-radius: 999px;
          opacity: 0;
          filter: blur(var(--streak-blur));
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.35) 12%,
            var(--streak-color) 46%,
            rgba(255, 255, 255, 0.95) 78%,
            rgba(248, 250, 252, 0.5) 100%
          );
          box-shadow:
            0 0 10px rgba(125, 211, 252, 0.45),
            0 0 24px rgba(165, 180, 252, 0.22);
          animation: loading-warp var(--streak-duration) linear infinite;
          animation-delay: var(--streak-delay);
        }
        .loading-screen__streak--far {
          animation-duration: calc(var(--streak-duration) * 1.35);
        }
        .loading-screen__vignette {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background: radial-gradient(
            ellipse 88% 78% at 50% 50%,
            transparent 0%,
            transparent 52%,
            rgba(148, 163, 184, 0.12) 100%
          );
        }
        .loading-screen__content {
          position: relative;
          z-index: 3;
          text-align: center;
          padding: 10px 0;
        }
        .loading-screen__text {
          margin: 0;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: clamp(1rem, 3.2vw, 1.35rem);
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #1e3a5f;
          text-shadow:
            0 0 18px rgba(255, 255, 255, 0.9),
            0 0 28px rgba(186, 230, 253, 0.8),
            0 1px 2px rgba(255, 255, 255, 0.6);
        }
      `}</style>
    </div>
  );
}

export default Loading;
