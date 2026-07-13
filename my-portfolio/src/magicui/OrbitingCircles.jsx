import { Children } from 'react';
import './magicui.css';

function OrbitingCircles({
  children,
  radius = 120,
  duration = 24,
  reverse = false,
  iconSize = 44,
  className = '',
}) {
  const items = Children.toArray(children);

  return items.map((child, index) => {
    const angle = (360 / items.length) * index;
    return (
      <div
        key={index}
        className={`mui-orbit-item ${className}`.trim()}
        style={{
          '--mui-orbit-radius': `${radius}px`,
          '--mui-orbit-duration': `${duration}s`,
          '--mui-orbit-angle': `${angle}deg`,
          '--mui-orbit-icon-size': `${iconSize}px`,
          '--mui-orbit-direction': reverse ? 'reverse' : 'normal',
        }}
      >
        {child}
      </div>
    );
  });
}

export default OrbitingCircles;
