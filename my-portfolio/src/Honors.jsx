import './Honors.css';
import { FaBasketballBall, FaGraduationCap, FaAward } from 'react-icons/fa';
import { BiLogoAdobe } from 'react-icons/bi';

const honors = [
  {
    id: 'nba-fellow',
    icon: FaBasketballBall,
    title: '2025 NBA HBCU Fellow',
    subtitle: 'Selected from 10,000+ applicants',
    variant: 'lavender',
  },
  {
    id: 'founders',
    icon: FaGraduationCap,
    title: 'Howard University Founders Scholarship',
    subtitle: 'Merit-based scholarship recipient',
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
    subtitle: "John D. O'Bryant School of Mathematics and Science",
    variant: 'sky',
  },
];

function Honors() {
  return (
    <section id="honors" className="honors-section">
      <div className="honors-inner">
        <h2 className="section-title honors-title">Honors & Recognition</h2>
        <div className="honors-grid">
          {honors.map(({ id, icon: Icon, title, subtitle, variant }) => (
            <article key={id} className={`honors-card honors-card--${variant}`}>
              <Icon className="honors-icon" aria-hidden />
              <div>
                <h3 className="honors-card-title">{title}</h3>
                <p className="honors-card-subtitle">{subtitle}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Honors;
