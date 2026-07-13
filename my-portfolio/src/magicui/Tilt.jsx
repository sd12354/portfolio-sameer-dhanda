import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { useCallback } from 'react';

/* Glass tilt toward the cursor — same spring feel as the bento cards.
   Springs compose with framer's own variant/hover transforms without conflicts. */
export function useTilt(max = 3) {
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 220, damping: 20 });
  const rotateY = useSpring(tiltY, { stiffness: 220, damping: 20 });
  const reduce = useReducedMotion();

  const onTiltMove = useCallback(
    (e) => {
      if (reduce) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      tiltX.set((py - 0.5) * -2 * max);
      tiltY.set((px - 0.5) * 2 * max);
    },
    [reduce, max, tiltX, tiltY]
  );

  const onTiltLeave = useCallback(() => {
    tiltX.set(0);
    tiltY.set(0);
  }, [tiltX, tiltY]);

  return {
    onTiltMove,
    onTiltLeave,
    tiltStyle: { rotateX, rotateY, transformPerspective: 900 },
  };
}

function Tilt({ as: Component = motion.div, children, style, max = 3, ...props }) {
  const { onTiltMove, onTiltLeave, tiltStyle } = useTilt(max);

  return (
    <Component
      onMouseMove={onTiltMove}
      onMouseLeave={onTiltLeave}
      style={{ ...tiltStyle, ...style }}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Tilt;
