import './Honors.css';
import { FaBasketballBall, FaGraduationCap, FaAward } from 'react-icons/fa';
import { BiLogoAdobe } from 'react-icons/bi';
import { motion, useReducedMotion } from 'motion/react';
import { HiExternalLink } from 'react-icons/hi';

const honors = [
  {
    id: 'bisonbytes-double-edge',
    icon: FaAward,
    title: 'BisonBytes 2024 · 2nd Place Winner (Fintech Track)',
    subtitle:
      'Built Double Edge, a data-driven web app focused on housing and wildfire impact insights, and placed 2nd for product execution, technical depth, and presentation.',
    variant: 'sky',
  },
  {
    id: 'nba-fellow',
    icon: FaBasketballBall,
    title: '2025 NBA x HBCU Fellow',
    subtitle: 'One of 70 fellows selected from 10,000+ applicants',
    variant: 'lavender',
  },
  {
    id: 'founders',
    icon: FaGraduationCap,
    title: 'Howard University Founders Scholarship',
    subtitle: 'Merit-based scholarship recipient — must maintain a 3.5 GPA to retain',
    variant: 'cream',
  },
  {
    id: 'adobe',
    icon: BiLogoAdobe,
    title: 'Howard University Adobe Ambassador',
    subtitle: 'Campus ambassador for Adobe programs and creative tools',
    variant: 'mint',
  },
  {
    id: 'obryant',
    icon: FaAward,
    title: "John D. O'Bryant Scholarship",
    subtitle:
      "John D. O'Bryant School of Mathematics and Science — maintained 4.3 weighted / 3.93 unweighted GPA",
    variant: 'sky',
  },
];

function Honors() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="honors" className="honors-section">
      <div className="honors-inner">
        <motion.h2
          className="section-title honors-title"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5 }}
        >
          Honors & Recognition
        </motion.h2>
        <motion.div
          className="honors-grid"
          initial={reduceMotion ? false : 'hidden'}
          whileInView={reduceMotion ? undefined : 'show'}
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {honors.map(({ id, icon: Icon, title, subtitle, variant, url, urlLabel }) => (
            <motion.article
              key={id}
              className={`honors-card honors-card--${variant}`}
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.42 }}
              whileHover={reduceMotion ? undefined : { y: -2 }}
            >
              <Icon className="honors-icon" aria-hidden />
              <div>
                <h3 className="honors-card-title">{title}</h3>
                <p className="honors-card-subtitle">{subtitle}</p>
                {url ? (
                  <a
                    className="honors-card-link"
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${title} — ${urlLabel ?? 'View'}`}
                  >
                    <HiExternalLink aria-hidden />
                    {urlLabel ?? 'View'}
                  </a>
                ) : null}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Honors;
