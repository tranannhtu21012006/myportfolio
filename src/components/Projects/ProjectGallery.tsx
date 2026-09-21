'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import GlassCard from '../ui/GlassCard';
import FadeIn from '../ui/FadeIn';
import SlideInTitle from '../ui/SlideInTitle';
import styles from './Projects.module.css';

// Placeholder data based on user's input
type Project = {
  id: number;
  key: string;
  techStack: string[];
  image: string;
  demoUrl: string;
  githubUrl: string;
};

const PROJECT_DATA: Project[] = [
  {
    id: 1,
    key: 'clothes',
    techStack: ['React', 'Next.js', 'Tailwind', 'Supabase'],
    image: '/clothes-dashboard.png',
    demoUrl: '#',
    githubUrl: 'https://github.com/tranannhtu21012006'
  },
  {
    id: 2,
    key: 'coffee',
    techStack: ['React', 'Vite', 'CSS Modules', 'Chart.js'],
    image: '/coffee-pos.png',
    demoUrl: '#',
    githubUrl: 'https://github.com/tranannhtu21012006'
  },
  {
    id: 3,
    key: 'parker',
    techStack: ['Next.js', 'TypeScript', 'Supabase', 'Framer Motion'],
    image: '/parker.png',
    demoUrl: '#',
    githubUrl: 'https://github.com/tranannhtu21012006'
  }
];

export default function ProjectGallery() {
  const t = useTranslations('projects');
  const [selectedProjectKey, setSelectedProjectKey] = useState<string | null>(null);

  const selectedProject = selectedProjectKey 
    ? PROJECT_DATA.find(p => p.key === selectedProjectKey) 
    : null;

  return (
    <section id="projects" className={`section ${styles.projects}`}>
      <div className="container">
        <SlideInTitle className={styles.header}>
          <span className="section-label">{t('label')}</span>
          <h2 className="section-title">{t('title')}</h2>
        </SlideInTitle>

        <div className={styles.gallery}>
          {PROJECT_DATA.map((project, index) => (
            <FadeIn 
              key={project.id}
              className={styles.projectCard}
              style={{ top: `${100 + index * 40}px` }}
              delay={0.2}
            >
              <div className={styles.projectHeader}>
                <h3 className={styles.projectTitle}>{t(`items.${project.key}.title`)}</h3>
                <button onClick={() => setSelectedProjectKey(project.key)} className={styles.projectLink} aria-label="View project details">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </button>
              </div>
              <div className={styles.imageContainer}>
                <div 
                  className={styles.image} 
                  style={{ backgroundImage: `url(${project.image})` }}
                />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <div className={styles.modalOverlay} onClick={() => setSelectedProjectKey(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setSelectedProjectKey(null)} aria-label="Close modal">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className={styles.modalImageContainer}>
              <img src={selectedProject.image} alt={t(`items.${selectedProject.key}.title`)} className={styles.modalImage} />
            </div>
            <div className={styles.modalBody}>
              <h3 className={styles.modalTitle}>{t(`items.${selectedProject.key}.title`)}</h3>
              <p className={styles.modalDescription}>{t(`items.${selectedProject.key}.description`)}</p>
              
              <div className={styles.modalResultSection}>
                <h4 className={styles.modalResultTitle}>RESULT</h4>
                <p className={styles.modalResultText}>{t(`items.${selectedProject.key}.result`)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
