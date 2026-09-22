'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import FadeIn from '../ui/FadeIn';
import SlideInTitle from '../ui/SlideInTitle';
import { 
  Code2, Server, Search, 
  Atom, BookOpen, Orbit, Zap, Palette, Link as LinkIcon,
  Globe, Database, CreditCard, Building, Ruler, Monitor,
  Shield, Microscope, FileSearch, PenTool, GraduationCap
} from 'lucide-react';
import styles from './About.module.css';

const COURSES = ['DSA', 'OOP', 'Database Administration', 'Security Research', 'Technical Writing'];

const COMPETENCIES = [
  {
    key: 'fullstack',
    icon: <Code2 size={24} />,
    skillIcons: [<Atom size={14} key="1"/>, <BookOpen size={14} key="2"/>, <Orbit size={14} key="3"/>, <Zap size={14} key="4"/>, <Palette size={14} key="5"/>, <LinkIcon size={14} key="6"/>],
  },
  {
    key: 'architecture',
    icon: <Server size={24} />,
    skillIcons: [<Globe size={14} key="1"/>, <Database size={14} key="2"/>, <CreditCard size={14} key="3"/>, <Building size={14} key="4"/>, <Ruler size={14} key="5"/>, <Monitor size={14} key="6"/>],
  },
  {
    key: 'research',
    icon: <Search size={24} />,
    skillIcons: [<Shield size={14} key="1"/>, <Microscope size={14} key="2"/>, <FileSearch size={14} key="3"/>, <PenTool size={14} key="4"/>, <GraduationCap size={14} key="5"/>],
  },
];

export default function About() {
  const t = useTranslations('about');

  return (
    <section id="about" className={`section ${styles.about}`}>
      <div className="container">
        <SlideInTitle className={styles.header}>
          <span className="section-label">{t('label')}</span>
          <h2 className="section-title">{t('title')}</h2>
        </SlideInTitle>

        {/* ============ PROFILE GRID ============ */}
        <div className={styles.profileGrid}>

          {/* --- Left: Education --- */}
          <div className={styles.educationCol}>
            <FadeIn>
              <div className={styles.eduCard}>
                <div className={styles.eduIconWrapper}>
                  <Image src="/ueh-logo.png" alt="UEH Logo" width={32} height={32} className={styles.schoolLogo} unoptimized />
                </div>
                <h3 className={styles.eduTitle}>{t('education.university')}</h3>
                <div className={styles.eduMeta}>
                  <span className={styles.eduPeriod}>{t('education.period')}</span>
                  <span className={styles.eduDivider}>•</span>
                  <span className={styles.eduMajor}>{t('education.major')}</span>
                </div>
                <div className={styles.gpaRow}>
                  <span className={styles.gpaLabel}>GPA</span>
                  <span className={styles.gpaValue}>{t('education.gpa')}</span>
                </div>
                <div className={styles.courseList}>
                  {COURSES.map((course) => (
                    <span key={course} className={styles.courseTag}>{course}</span>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className={`${styles.eduCard} ${styles.hsCard}`}>
                <div className={styles.eduIconWrapper}>
                  <Image src="/tc1-logo.png" alt="TC1 Logo" width={32} height={32} className={styles.schoolLogo} unoptimized />
                </div>
                <h3 className={styles.eduTitle}>{t('education.highschool')}</h3>
                <span className={styles.eduPeriod}>{t('education.highschoolPeriod')}</span>
                <div className={styles.achievements}>
                  <div className={styles.achieveItem}>
                    <span className={styles.achieveIcon}>🏐</span>
                    <span>Volleyball Champion</span>
                  </div>
                  <div className={styles.achieveItem}>
                    <span className={styles.achieveIcon}>⚽</span>
                    <span>2× Football Silver Medal</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* --- Center: Avatar --- */}
          <FadeIn className={styles.avatarCol}>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatarFloat}>
                <Image
                  src="/avatar-cutout.png"
                  alt="Tran Anh Tu"
                  width={340}
                  height={480}
                  className={styles.avatarImage}
                  unoptimized
                  priority
                />
              </div>
              <div className={styles.avatarGlow} />
              <div className={styles.avatarRing} />
            </div>
          </FadeIn>

          {/* --- Right: Description --- */}
          <FadeIn delay={0.25} className={styles.descriptionCol}>
            <p className={styles.descriptionText}>
              {t('description')}
            </p>
          </FadeIn>
        </div>

        {/* ============ CORE COMPETENCIES ============ */}
        <div className={styles.competenciesSection}>
          <FadeIn>
            <h3 className={styles.competenciesTitle}>
              {t('competencies.sectionTitle')}
            </h3>
          </FadeIn>

          <div className={styles.cardFan}>
            {COMPETENCIES.map((comp, index) => (
              <FadeIn key={comp.key} delay={0.12 * (index + 1)}>
                <div
                  className={`${styles.compCard} ${styles[`compCard${index + 1}`]}`}
                >
                  <div className={styles.compCardInner}>
                    {/* Gradient overlay */}
                    <div className={styles.compGradient} />

                    <div className={styles.compHeader}>
                      <div className={styles.compIconWrapper}>
                        {comp.icon}
                      </div>
                      <h4 className={styles.compTitle}>
                        {t(`competencies.${comp.key}.title`)}
                      </h4>
                    </div>

                    <p className={styles.compDesc}>
                      {t(`competencies.${comp.key}.description`)}
                    </p>

                    <div className={styles.compDivider} />

                    <div className={styles.skillGrid}>
                      {t(`competencies.${comp.key}.skills`).split(', ').map((skill, i) => (
                        <div key={skill} className={styles.skillItem}>
                          <span className={styles.skillIcon}>{comp.skillIcons[i]}</span>
                          <span className={styles.skillName}>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
