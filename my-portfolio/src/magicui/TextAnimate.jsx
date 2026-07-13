import { motion, useReducedMotion } from 'motion/react';

/* MagicUI text-animate (blurInUp by word): each word blurs and rises into
   place with a stagger when the element scrolls into view. */
function TextAnimate({ children, as = 'h2', className = '', delay = 0 }) {
  const MotionTag = motion[as] ?? motion.h2;
  const reduceMotion = useReducedMotion();
  const words = String(children).split(' ');

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
          variants={{
            hidden: { opacity: 0, y: 18, filter: 'blur(10px)' },
            show: {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          {i < words.length - 1 ? `${word} ` : word}
        </motion.span>
      ))}
    </MotionTag>
  );
}

export default TextAnimate;
