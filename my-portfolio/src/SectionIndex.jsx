import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useEffect } from 'react';
import {
  HiOutlineUser,
  HiOutlineBriefcase,
  HiOutlineSparkles,
  HiOutlineFolder,
  HiOutlineStar,
  HiOutlineMail,
  HiX,
} from 'react-icons/hi';
import './SectionIndex.css';

const SECTIONS = [
  {
    id: 'about',
    label: 'About',
    desc: 'Who I am, what I do, where I’m based.',
    Icon: HiOutlineUser,
  },
  {
    id: 'experience',
    label: 'Experience',
    desc: 'Internships, roles, and what I built.',
    Icon: HiOutlineBriefcase,
  },
  {
    id: 'skills',
    label: 'Skills',
    desc: 'Languages, frameworks, and tooling.',
    Icon: HiOutlineSparkles,
  },
  {
    id: 'projects',
    label: 'Projects',
    desc: 'Apps, tools, and side experiments.',
    Icon: HiOutlineFolder,
  },
  {
    id: 'honors',
    label: 'Honors',
    desc: 'Awards, scholarships, and recognition.',
    Icon: HiOutlineStar,
  },
  {
    id: 'contact',
    label: 'Contact',
    desc: 'Get in touch — email, social, GitHub activity.',
    Icon: HiOutlineMail,
  },
];

export default function SectionIndex({ open, onClose }) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const go = (id) => {
    onClose();
    requestAnimationFrame(() => {
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 220);
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="section-index-backdrop"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          role="dialog"
          aria-modal="true"
          aria-label="All sections"
        >
          <motion.div
            className="section-index-modal"
            onClick={(e) => e.stopPropagation()}
            initial={reduce ? false : { opacity: 0, y: 14, scale: 0.97 }}
            animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="section-index-header">
              <div>
                <p className="section-index-eyebrow">Browse</p>
                <h2 className="section-index-title">All Sections</h2>
              </div>
              <button
                type="button"
                className="section-index-close"
                onClick={onClose}
                aria-label="Close section browser"
              >
                <HiX />
              </button>
            </div>

            <div className="section-index-grid">
              {SECTIONS.map(({ id, label, desc, Icon }) => (
                <button
                  key={id}
                  type="button"
                  className="section-index-card"
                  onClick={() => go(id)}
                >
                  <span className="section-index-card-icon">
                    <Icon />
                  </span>
                  <span className="section-index-card-body">
                    <span className="section-index-card-label">{label}</span>
                    <span className="section-index-card-desc">{desc}</span>
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
