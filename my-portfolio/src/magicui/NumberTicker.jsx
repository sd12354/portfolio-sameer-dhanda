import { useInView, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useRef } from 'react';
import './magicui.css';

function NumberTicker({ value, decimalPlaces = 0, className = '' }) {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 55, stiffness: 120 });
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(
    () =>
      springValue.on('change', (latest) => {
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat('en-US', {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces,
          }).format(latest);
        }
      }),
    [springValue, decimalPlaces]
  );

  return (
    <span ref={ref} className={`mui-number-ticker ${className}`.trim()}>
      0
    </span>
  );
}

export default NumberTicker;
