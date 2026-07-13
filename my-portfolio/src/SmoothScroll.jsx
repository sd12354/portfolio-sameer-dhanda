import Lenis from 'lenis';
import { useEffect } from 'react';

/* Buttery smooth scrolling via Lenis, plus eased anchor navigation.
   Skipped entirely for reduced-motion users (native jumps instead). */
function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    });

    const onClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute('href');
      if (hash.length < 2 || !document.querySelector(hash)) return;
      e.preventDefault();
      // Lenis honors each section's scroll-margin-top (navbar clearance)
      lenis.scrollTo(hash, { duration: 1.25 });
      window.history.pushState(null, '', hash);
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}

export default SmoothScroll;
