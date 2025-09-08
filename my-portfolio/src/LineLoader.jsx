import React from 'react';
import './LineLoader.css';

const LineLoader = ({ color = '#4f46e5', speed = 1.5, width = '200px' }) => {
  return (
    <div className="line-loader-container">
      <div 
        className="line-loader" 
        style={{
          '--loader-color': color,
          '--animation-speed': `${speed}s`,
          '--loader-width': width
        }}
      >
        <div className="line-loader-bar"></div>
      </div>
    </div>
  );
};

export default LineLoader;