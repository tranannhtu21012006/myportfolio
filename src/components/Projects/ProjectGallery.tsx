'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import FadeIn from '../ui/FadeIn';
import SlideInTitle from '../ui/SlideInTitle';
import { Users, Calendar, ArrowUpRight } from 'lucide-react';
import styles from './Projects.module.css';

type Project = {
  id: number;
  key: string;
  category: 'Work' | 'Personal' | 'Academic';
  date: string;
  teamSize: number;
  techStack: string[];
  image: string;
  demoUrl: string;
  githubUrl: string;
};

const PROJECT_DATA: Project[] = [
  {
    id: 1,
    key: 'clothes',
    category: 'Academic',
    date: 'May 2026 - Present',
    teamSize: 1,
    techStack: ['React', 'Next.js', 'Tailwind', 'Supabase'],
    image: '/clothes-dashboard.png',
    demoUrl: '#',
    githubUrl: 'https://github.com/tranannhtu21012006'
  },
  {
    id: 2,
    key: 'coffee',
    category: 'Academic',
    date: 'Apr 2026 - May 2026',
    teamSize: 7,
    techStack: ['React', 'Vite', 'CSS Modules', 'Chart.js'],
    image: '/coffee-pos.png',
    demoUrl: '#',
    githubUrl: 'https://github.com/tranannhtu21012006'
  },
  {
    id: 3,
    key: 'parker',
    category: 'Academic',
    date: 'Jun 2026 - Present',
    teamSize: 1,
    techStack: ['Next.js', 'TypeScript', 'Supabase', 'Framer Motion'],
    image: '/parker.png',
    demoUrl: '#',
    githubUrl: 'https://github.com/tranannhtu21012006'
  }
];

export default function ProjectGallery() {
  const t = useTranslations('projects');
  const [selectedProjectKey, setSelectedProjectKey] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Work' | 'Personal' | 'Academic'>('All');

  const selectedProject = selectedProjectKey 
    ? PROJECT_DATA.find(p => p.key === selectedProjectKey) 
    : null;

  const filteredProjects = activeFilter === 'All' 
    ? PROJECT_DATA 
    : PROJECT_DATA.filter(p => p.category === activeFilter);

  const getCount = (category: string) => {
    if (category === 'All') return PROJECT_DATA.length;
    return PROJECT_DATA.filter(p => p.category === category).length;
  };

  return (
    <section id="projects" className={`section ${styles.projects}`}>
      <div className="container">
        <SlideInTitle className={styles.header}>
          <span className="section-label">{t('label')}</span>
          <h2 className="section-title">{t('title')}</h2>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </SlideInTitle>

        <FadeIn delay={0.2}>
          <div className={styles.filterWrapper}>
            {(['All', 'Work', 'Personal', 'Academic'] as const).map(filter => (
              <button 
                key={filter}
                className={`${styles.filterBtn} ${activeFilter === filter ? styles.active : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
                <span className={styles.countBadge}>{getCount(filter)}</span>
              </button>
            ))}
          </div>
        </FadeIn>

        <div className={styles.grid}>
          {filteredProjects.map((project, index) => (
            <FadeIn 
              key={project.id}
              className={styles.projectCard}
              delay={0.1 * (index + 1)}
            >
              <div 
                className={styles.imageContainer}
                onClick={() => setSelectedProjectKey(project.key)}
              >
                <div 
                  className={styles.image} 
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className={styles.imageOverlay}>
                  <ArrowUpRight size={32} className={styles.overlayIcon} />
                </div>
              </div>
              
              <div className={styles.cardContent}>
                <div className={styles.metaInfo}>
                  <div className={styles.metaItem}>
                    <Calendar size={14} />
                    <span>{project.date}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <Users size={14} />
                    <span>Team: {project.teamSize}</span>
                  </div>
                </div>
                
                <h3 
                  className={styles.projectTitle}
                  onClick={() => setSelectedProjectKey(project.key)}
                >
                  {t(`items.${project.key}.title`)}
                </h3>
                
                <p className={styles.projectDesc}>
                  {t(`items.${project.key}.description`)}
                </p>
                
                <div className={styles.techTags}>
                  {project.techStack.map(tech => (
                    <span key={tech} className={styles.tag}>{tech}</span>
                  ))}
                </div>
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
