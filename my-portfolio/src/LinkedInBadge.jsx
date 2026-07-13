import { useEffect, useRef } from 'react';
import { FaLinkedin } from 'react-icons/fa';
import { HiExternalLink } from 'react-icons/hi';

const PROFILE_URL = 'https://www.linkedin.com/in/sameer-dhanda-b97437224/';

const BADGE_MARKUP = `
  <div
    class="badge-base LI-profile-badge"
    data-locale="en_US"
    data-size="medium"
    data-theme="light"
    data-type="VERTICAL"
    data-vanity="sameer-dhanda-b97437224"
    data-version="v1"
  >
    <a
      class="badge-base__link LI-simple-link"
      href="https://www.linkedin.com/in/sameer-dhanda-b97437224?trk=profile-badge"
    >Sameer Dhanda</a>
  </div>
`;

const FALLBACK_MARKUP = `
  <a
    class="linkedin-badge__fallback"
    href="${PROFILE_URL}"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span class="linkedin-badge__fallback-name">Sameer Dhanda</span>
    <span class="linkedin-badge__fallback-cta">View LinkedIn Profile</span>
  </a>
`;

const SCRIPT_SRC = 'https://platform.linkedin.com/badges/js/profile.js';

let scriptPromise = null;

function loadBadgeScript() {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.LIRenderAll) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.type = 'text/javascript';
    script.onload = () => resolve();
    script.onerror = () => resolve();
    document.body.appendChild(script);
  });

  return scriptPromise;
}

function LinkedInBadge() {
  const containerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    if (containerRef.current) {
      containerRef.current.innerHTML = BADGE_MARKUP;
    }

    loadBadgeScript().then(() => {
      if (!cancelled && window.LIRenderAll) {
        window.LIRenderAll();
      }
    });

    const fallbackTimer = setTimeout(() => {
      const el = containerRef.current;
      if (cancelled || !el) return;
      const iframe = el.querySelector('iframe');
      if (!iframe) {
        el.innerHTML = FALLBACK_MARKUP;
      } else if (!iframe.title) {
        iframe.title = 'LinkedIn profile badge for Sameer Dhanda';
      }
    }, 4000);

    return () => {
      cancelled = true;
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <div className="linkedin-card">
      <div className="linkedin-card__header">
        <FaLinkedin className="linkedin-card__icon" aria-hidden />
        <h3 className="linkedin-card__title">LinkedIn</h3>
        <a
          href={PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="linkedin-card__profile-link"
        >
          View profile
          <HiExternalLink aria-hidden />
        </a>
      </div>
      <div ref={containerRef} className="linkedin-badge" />
    </div>
  );
}

export default LinkedInBadge;
