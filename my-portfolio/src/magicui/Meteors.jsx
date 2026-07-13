import { useState } from 'react';
import './magicui.css';

function Meteors({ number = 18 }) {
  // Random values generated once per mount so meteors don't jump on re-render
  const [meteors] = useState(() =>
    Array.from({ length: number }, (_, idx) => ({
      id: idx,
      left: `${Math.round(Math.random() * 100)}%`,
      top: `${Math.round(Math.random() * 45)}%`,
      delay: `${(Math.random() * 6).toFixed(2)}s`,
      duration: `${(Math.random() * 6 + 4).toFixed(2)}s`,
      angle: '215deg',
    }))
  );

  return (
    <div className="mui-meteors" aria-hidden>
      {meteors.map((meteor) => (
        <span
          key={meteor.id}
          className="mui-meteor"
          style={{
            left: meteor.left,
            top: meteor.top,
            '--mui-meteor-angle': meteor.angle,
            '--mui-meteor-delay': meteor.delay,
            '--mui-meteor-duration': meteor.duration,
          }}
        />
      ))}
    </div>
  );
}

export default Meteors;
