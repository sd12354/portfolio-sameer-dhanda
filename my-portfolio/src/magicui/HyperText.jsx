import { useCallback, useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import './magicui.css';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

/* Scramble-decode: characters cycle randomly, locking in left to right.
   Plays once on first view and again on hover. */
function HyperText({ children, className = '' }) {
  const text = String(children);
  const [display, setDisplay] = useState(text);
  const ref = useRef(null);
  const intervalRef = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.8 });
  const reduceMotion = useReducedMotion();

  const scramble = useCallback(() => {
    if (reduceMotion) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    let step = 0;
    intervalRef.current = setInterval(() => {
      step += 1;
      const locked = Math.floor(step / 2.4);
      setDisplay(
        text
          .split('')
          .map((ch, i) => {
            if (i < locked || !/[a-zA-Z]/.test(ch)) return ch;
            const rand = LETTERS[Math.floor(Math.random() * LETTERS.length)];
            return ch === ch.toLowerCase() ? rand.toLowerCase() : rand;
          })
          .join('')
      );
      if (locked >= text.length) {
        clearInterval(intervalRef.current);
        setDisplay(text);
      }
    }, 28);
  }, [text, reduceMotion]);

  useEffect(() => {
    if (isInView) scramble();
  }, [isInView, scramble]);

  useEffect(() => () => clearInterval(intervalRef.current), []);

  return (
    <span
      ref={ref}
      className={`mui-hyper-text ${className}`.trim()}
      onMouseEnter={scramble}
      aria-label={text}
    >
      <span aria-hidden>{display}</span>
    </span>
  );
}

export default HyperText;
