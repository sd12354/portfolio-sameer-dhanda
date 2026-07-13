import { motion, useReducedMotion } from 'motion/react';
import './magicui.css';

const supportsOffsetPathRect =
  typeof CSS !== 'undefined' && CSS.supports('offset-path', 'rect(0 auto auto 0)');

function BorderBeam({
  size = 60,
  duration = 6,
  delay = 0,
  colorFrom = '#ffaa40',
  colorTo = '#9c40ff',
  reverse = false,
  borderWidth = 1.5,
}) {
  const reduceMotion = useReducedMotion();

  if (!supportsOffsetPathRect || reduceMotion) return null;

  return (
    <div
      className="mui-border-beam-wrap"
      style={{ '--mui-beam-width': `${borderWidth}px` }}
      aria-hidden
    >
      <motion.div
        className="mui-border-beam"
        style={{
          width: size,
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          '--mui-beam-from': colorFrom,
          '--mui-beam-to': colorTo,
        }}
        initial={{ offsetDistance: reverse ? '100%' : '0%' }}
        animate={{ offsetDistance: reverse ? ['100%', '0%'] : ['0%', '100%'] }}
        transition={{ repeat: Infinity, ease: 'linear', duration, delay: -delay }}
      />
    </div>
  );
}

export default BorderBeam;
