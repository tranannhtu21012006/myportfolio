'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import FadeIn from '../ui/FadeIn';
import SlideInTitle from '../ui/SlideInTitle';
import { Users, Calendar, ArrowUpRight } from 'lucide-react';
import styles from './Projects.module.css';
import { PROJECT_DATA } from '@/data/projects';

export default function ProjectGallery() {
  const t = useTranslations('projects');
  const locale = useLocale();
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<'All' | 'Work' | 'Personal' | 'Academic'>('All');

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
                onClick={() => router.push(`/${locale}/project/${project.key}`)}
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
                  onClick={() => router.push(`/${locale}/project/${project.key}`)}
                >
                  {t(`items.${project.key}.title`)}
                </h3>
                
                <p className={styles.projectDesc}>
                  {t(`items.${project.key}.description`)}
                </p>

                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.githubLink}>
                  Github Repository <ArrowUpRight size={16} />
                </a>
                
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


    </section>
  );
}
