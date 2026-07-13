import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useRef } from 'react';
import './magicui.css';

function SmoothCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const rotation = useMotionValue(0);
  const scale = useMotionValue(1);

  const smoothX = useSpring(cursorX, { damping: 45, stiffness: 400, mass: 1 });
  const smoothY = useSpring(cursorY, { damping: 45, stiffness: 400, mass: 1 });
  const smoothRotation = useSpring(rotation, { damping: 60, stiffness: 300 });
  const smoothScale = useSpring(scale, { damping: 35, stiffness: 500 });

  const lastPos = useRef({ x: 0, y: 0, time: 0 });
  const prevAngle = useRef(0);
  const accumulated = useRef(0);
  const moveTimeout = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      const now = performance.now();
      const dt = now - lastPos.current.time;
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;

      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      if (dt > 0 && dt < 120) {
        const speed = Math.hypot(dx, dy) / dt;
        if (speed > 0.18) {
          // Unwrap the angle so 359° → 1° doesn't spin the long way round
          const angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
          let diff = angle - prevAngle.current;
          if (diff > 180) diff -= 360;
          if (diff < -180) diff += 360;
          accumulated.current += diff;
          prevAngle.current = angle;
          rotation.set(accumulated.current);
          scale.set(0.92);

          if (moveTimeout.current) clearTimeout(moveTimeout.current);
          moveTimeout.current = setTimeout(() => {
            scale.set(1);
            rotation.set(Math.round(accumulated.current / 360) * 360);
            accumulated.current = Math.round(accumulated.current / 360) * 360;
          }, 140);
        }
      }

      lastPos.current = { x: e.clientX, y: e.clientY, time: now };
    };

    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (moveTimeout.current) clearTimeout(moveTimeout.current);
    };
  }, [cursorX, cursorY, rotation, scale]);

  return (
    <motion.div
      className="mui-smooth-cursor"
      style={{
        x: smoothX,
        y: smoothY,
        rotate: smoothRotation,
        scale: smoothScale,
      }}
      aria-hidden
    >
      <svg width="22" height="24" viewBox="0 0 50 54" fill="none">
        <path
          d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.2039L24.3757 39.2694C24.8829 39.0846 25.4385 39.0846 25.9422 39.2694L39.8121 44.2039C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
          className="mui-smooth-cursor__fill"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}

export default SmoothCursor;
