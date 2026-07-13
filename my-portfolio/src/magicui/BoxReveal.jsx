import { motion, useReducedMotion } from 'motion/react';
import './magicui.css';

/* A solid box sweeps across, revealing the content behind it. */
function BoxReveal({ children, boxColor = 'var(--accent)', delay = 0 }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return children;
  }

  return (
    <motion.div
      className="mui-box-reveal"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 14 },
          show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, delay: delay + 0.25, ease: 'easeOut' },
          },
        }}
      >
        {children}
      </motion.div>
      <motion.div
        className="mui-box-reveal__box"
        style={{ background: boxColor }}
        variants={{
          hidden: { x: '0%' },
          show: {
            x: '104%',
            transition: { duration: 0.55, delay, ease: [0.85, 0, 0.15, 1] },
          },
        }}
        aria-hidden
      />
    </motion.div>
  );
}

export default BoxReveal;
