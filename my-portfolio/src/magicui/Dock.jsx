import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { createContext, useContext, useRef } from 'react';
import './magicui.css';

const DockContext = createContext({
  mouseX: null,
  magnification: 66,
  distance: 130,
  baseSize: 44,
});

export function Dock({
  children,
  className = '',
  magnification = 66,
  distance = 130,
  baseSize = 44,
}) {
  const mouseX = useMotionValue(Infinity);

  return (
    <div
      className={`mui-dock ${className}`.trim()}
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      <DockContext.Provider value={{ mouseX, magnification, distance, baseSize }}>
        {children}
      </DockContext.Provider>
    </div>
  );
}

export function DockIcon({ href, label, external = false, children }) {
  const ref = useRef(null);
  const { mouseX, magnification, distance, baseSize } = useContext(DockContext);

  const distanceFromCursor = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const sizeTransform = useTransform(
    distanceFromCursor,
    [-distance, 0, distance],
    [baseSize, magnification, baseSize]
  );
  const size = useSpring(sizeTransform, { mass: 0.1, stiffness: 160, damping: 13 });

  return (
    <motion.a
      ref={ref}
      href={href}
      aria-label={label}
      title={label}
      className="mui-dock__icon"
      style={{ width: size, height: size }}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </motion.a>
  );
}
