'use client';

import { useTranslations } from 'next-intl';
import GlassCard from '../ui/GlassCard';
import FadeIn from '../ui/FadeIn';
import SlideInTitle from '../ui/SlideInTitle';
import styles from './Skills.module.css';

const TECHNOLOGIES = [
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'Supabase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg' },
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
];

export default function Skills() {
  const t = useTranslations('skills');

  return (
    <section className={`section ${styles.skills}`}>
      <div className="container">
        <SlideInTitle className={styles.header}>
          <span className="section-label">{t('label')}</span>
          <h2 className="section-title">{t('title')}</h2>
        </SlideInTitle>

        <FadeIn delay={0.2}>
          <div className={styles.marqueeWrapper}>
            <div className={styles.marqueeTrack}>
              {/* Duplicate the list to create a seamless loop */}
              {[...TECHNOLOGIES, ...TECHNOLOGIES].map((tech, index) => (
                <div key={index} className={styles.techItem}>
                  <img src={tech.icon} alt={tech.name} className={styles.techIcon} />
                  <span className={styles.techName}>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
