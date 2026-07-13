import { useEffect, useState } from 'react';
import { animate } from 'motion/react';
import AuroraText from './magicui/AuroraText';
import './Loading.css';

/* Total exit choreography: content lifts, then the two curtain panels follow */
const EXIT_MS = 1100;

function Loading({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Users who prefer reduced motion skip the intro entirely
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onLoadingComplete();
      return undefined;
    }

    const controls = animate(0, 100, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setProgress(Math.round(v)),
      onComplete: () => {
        setExiting(true);
        window.setTimeout(onLoadingComplete, EXIT_MS);
      },
    });
    return () => controls.stop();
  }, [onLoadingComplete]);

  // The page is mounted (and animating) behind the curtain — keep it unscrollable
  useEffect(() => {
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, []);

  return (
    <div
      className={exiting ? 'loading-intro loading-intro--exit' : 'loading-intro'}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-label="Loading portfolio"
    >
      <div className="loading-intro__panel loading-intro__panel--accent" aria-hidden />
      <div className="loading-intro__panel loading-intro__panel--main">
        <div className="loading-intro__aura" aria-hidden />
        <div className="loading-intro__content">
          <h1 className="loading-intro__name">
            <AuroraText>Sameer Dhanda</AuroraText>
          </h1>
          <p className="loading-intro__role">Software Engineer · Portfolio</p>
        </div>
        <div className="loading-intro__counter" aria-hidden>
          {progress}
          <span className="loading-intro__percent">%</span>
        </div>
        <div
          className="loading-intro__bar"
          style={{ transform: `scaleX(${progress / 100})` }}
          aria-hidden
        />
      </div>
    </div>
  );
}

export default Loading;
