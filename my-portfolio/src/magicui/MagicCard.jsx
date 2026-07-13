import { motion, useMotionTemplate, useMotionValue } from 'motion/react';
import { useCallback, useRef } from 'react';
import { useTilt } from './Tilt';
import './magicui.css';

function MagicCard({
  children,
  className = '',
  gradientSize = 220,
  gradientFrom = '#9e7aff',
  gradientTo = '#fe8bbb',
  spotlightColor = 'var(--accent-soft)',
}) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);
  const { onTiltMove, onTiltLeave, tiltStyle } = useTilt(2.5);

  const handleMouseMove = useCallback(
    (e) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
      onTiltMove(e);
    },
    [mouseX, mouseY, onTiltMove]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
    onTiltLeave();
  }, [mouseX, mouseY, gradientSize, onTiltLeave]);

  const borderBackground = useMotionTemplate`
    radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
      ${gradientFrom}, ${gradientTo}, transparent 100%)
  `;
  const spotlightBackground = useMotionTemplate`
    radial-gradient(${gradientSize * 1.4}px circle at ${mouseX}px ${mouseY}px,
      ${spotlightColor}, transparent 100%)
  `;

  return (
    <motion.div
      ref={cardRef}
      className={`mui-magic-card ${className}`.trim()}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
    >
      <motion.div
        className="mui-magic-card__border"
        style={{ background: borderBackground }}
        aria-hidden
      />
      <div className="mui-magic-card__bg" aria-hidden />
      <motion.div
        className="mui-magic-card__spotlight"
        style={{ background: spotlightBackground }}
        aria-hidden
      />
      <div className="mui-magic-card__content">{children}</div>
    </motion.div>
  );
}

export default MagicCard;
