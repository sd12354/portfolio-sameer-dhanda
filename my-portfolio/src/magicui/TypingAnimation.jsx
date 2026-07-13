import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import './magicui.css';

function TypingAnimation({ children, className = '', speed = 42, delay = 400 }) {
  const text = String(children);
  const [typed, setTyped] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || !isInView) return undefined;
    let i = 0;
    let interval;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setTyped(i);
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, delay);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [isInView, reduceMotion, text, speed, delay]);

  if (reduceMotion) {
    return <span className={className}>{text}</span>;
  }

  const done = typed >= text.length;

  return (
    <span ref={ref} className={`mui-typing ${className}`.trim()} aria-label={text}>
      <span aria-hidden>{text.slice(0, typed)}</span>
      <span className={done ? 'mui-typing__caret mui-typing__caret--done' : 'mui-typing__caret'} aria-hidden />
    </span>
  );
}

export default TypingAnimation;
