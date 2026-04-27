import './Projects.css';
import { HiChevronLeft, HiChevronRight, HiExternalLink } from 'react-icons/hi';
import { motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';

const projects = [
  {
    id: 'translateme-ios',
    title: 'TranslateMe (iOS)',
    description:
      'SwiftUI iOS app that translates user-entered text via the MyMemory REST API and stores translation history in Firebase Firestore with real-time updates.',
    tags: ['SwiftUI', 'iOS 16+', 'Firebase Firestore', 'REST API', 'Async/Await'],
    liveUrl: 'https://youtube.com/shorts/mmScV6eegjE',
    ctaLabel: 'Watch Demo',
    previewVideoPath: '/translateme-preview.mov',
  },
  {
    id: 'treasure-seeker',
    title: 'Treasure Seeker',
    description:
      'Group project for my Software Engineering class: a React + Firebase treasure-hunt platform with auth, scene creation, gameplay, and leaderboard features.',
    tags: ['React', 'TypeScript', 'Firebase', 'Tailwind', 'CI/CD'],
    links: [
      { url: 'https://treasure-seeker-a771e.web.app/', label: 'Visit Site' },
      { url: 'https://github.com/giliaddawite/riddle-quest-maker', label: 'GitHub Repo' },
    ],
    screenshots: [
      '/treasure-seeker-3.png', // Landing
      '/treasure-seeker-2.png', // Home (Welcome, Explorer)
      '/treasure-seeker-5.png', // Browse Scenes
      '/treasure-seeker-4.png', // Gameplay / See it in action
      '/treasure-seeker-1.png', // Leaderboard
    ],
  },
  {
    id: 'applyflow',
    title: 'ApplyFlow',
    description:
      'Full-stack app that turns job-search emails into a Kanban application pipeline — connects Gmail via OAuth, syncs and classifies emails, and lets you manage applications with drag-and-drop and edits.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Google OAuth'],
    links: [
      { url: 'https://apply-flow-93wa.vercel.app/landing', label: 'Visit Site' },
      { url: 'https://github.com/sd12354/ApplyFlow', label: 'GitHub Repo' },
    ],
    screenshots: ['/applyflow-1.png', '/applyflow-2.png', '/applyflow-3.png'],
  },
  {
    id: 'studysync',
    title: 'StudySync (iOS)',
    developmentLabel: 'Still in development',
    description:
      'Campus-focused iOS app that helps students create, discover, and join in-person study sessions with Firebase Authentication and Firestore-powered real-time session updates.',
    tags: ['SwiftUI', 'iOS', 'Firebase Auth', 'Firestore', 'MVVM'],
    links: [{ url: 'https://github.com/sd12354/Unit-7-Group-Milestone-1', label: 'GitHub Repo' }],
    previewVideoPath: '/studysync-demo.mov',
  },
];

function ProjectMediaCarousel({ projectTitle, screenshots }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = screenshots.length;

  const goPrev = () => setActiveIndex((prev) => (prev - 1 + total) % total);
  const goNext = () => setActiveIndex((prev) => (prev + 1) % total);

  return (
    <div className="project-carousel">
      <div className="project-carousel__viewport">
        <img
          src={screenshots[activeIndex]}
          alt={`${projectTitle} screenshot ${activeIndex + 1}`}
          loading="lazy"
        />
      </div>
      <button type="button" className="project-carousel__nav project-carousel__nav--left" onClick={goPrev}>
        <HiChevronLeft aria-hidden />
      </button>
      <button
        type="button"
        className="project-carousel__nav project-carousel__nav--right"
        onClick={goNext}
      >
        <HiChevronRight aria-hidden />
      </button>
      <div className="project-carousel__dots">
        {screenshots.map((shot, index) => (
          <button
            key={shot}
            type="button"
            className={index === activeIndex ? 'project-carousel__dot project-carousel__dot--active' : 'project-carousel__dot'}
            aria-label={`Go to screenshot ${index + 1}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

function Projects() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="projects" className="projects-section">
      <div className="projects-section__bg" aria-hidden />
      <div className="projects-inner">
        <motion.h2
          className="section-title projects-title"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Featured Projects
        </motion.h2>
        <motion.ul
          className="projects-list"
          initial={reduceMotion ? false : 'hidden'}
          whileInView={reduceMotion ? undefined : 'show'}
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {projects.map((project) => (
            <motion.li
              key={project.id}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.45 }}
            >
              <motion.article
                className="project-card"
                whileHover={reduceMotion ? undefined : { y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <header className="project-card__header">
                  <div className="project-card__title-block">
                    <h3 className="project-card__title">{project.title}</h3>
                    {project.developmentLabel ? (
                      <span className="project-card__dev-badge" role="status">
                        {project.developmentLabel}
                      </span>
                    ) : null}
                  </div>
                  {project.links?.length ? (
                    <div className="project-card__actions">
                      {project.links.map((link) => (
                        <motion.a
                          key={link.url}
                          href={link.url}
                          className="project-card__cta"
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                        >
                          <HiExternalLink aria-hidden />
                          {link.label}
                        </motion.a>
                      ))}
                    </div>
                  ) : project.liveUrl ? (
                    <motion.a
                      href={project.liveUrl}
                      className="project-card__cta"
                      {...(String(project.liveUrl).startsWith('http')
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                    >
                      <HiExternalLink aria-hidden />
                      {project.ctaLabel ?? 'View Live'}
                    </motion.a>
                  ) : (
                    <span className="project-card__cta-placeholder" />
                  )}
                </header>
                <p className="project-card__desc">{project.description}</p>
                {project.screenshots?.length ? (
                  <ProjectMediaCarousel projectTitle={project.title} screenshots={project.screenshots} />
                ) : project.previewVideoPath ? (
                  <div className="project-card__media">
                    <video
                      src={project.previewVideoPath}
                      className="project-card__video"
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls
                      preload="metadata"
                    />
                  </div>
                ) : project.previewPath ? (
                  <div className="project-card__media">
                    <img src={project.previewPath} alt={`${project.title} preview`} loading="lazy" />
                  </div>
                ) : null}
                <ul className="project-card__tags">
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </motion.article>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

export default Projects;
