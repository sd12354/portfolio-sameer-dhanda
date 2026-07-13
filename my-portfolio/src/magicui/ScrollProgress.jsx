import { motion, useScroll, useSpring } from 'motion/react';
import './magicui.css';

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 50,
    restDelta: 0.001,
  });

  return <motion.div className="mui-scroll-progress" style={{ scaleX }} aria-hidden />;
}

export default ScrollProgress;
