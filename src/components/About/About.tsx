'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import GlassCard from '../ui/GlassCard';
import FadeIn from '../ui/FadeIn';
import SlideInTitle from '../ui/SlideInTitle';
import styles from './About.module.css';

export default function About() {
  const t = useTranslations('about');

  return (
    <section id="about" className={`section ${styles.about}`}>
      <div className="container">
        <SlideInTitle className={styles.header}>
          <span className="section-label">{t('label')}</span>
          <h2 className="section-title">{t('title')}</h2>
        </SlideInTitle>

        <div className={styles.grid}>
          <FadeIn className={styles.imageCol}>
            <div className={styles.imageWrapper}>
              <Image 
                src="/avatar-about.jpg"
                alt="Avatar"
                fill
                className={styles.image}
                unoptimized
              />
            </div>
          </FadeIn>

          <div className={styles.infoCol}>
            <GlassCard className={styles.card}>
              <FadeIn>
                <div className={styles.education}>
                  <h3 className={styles.uni}>{t('university')}</h3>
                  <div className={styles.meta}>
                    <span className={styles.major}>{t('major')}</span>
                    <span className={styles.dot}>•</span>
                    <span className={styles.year}>{t('year')}</span>
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className={styles.description}>{t('description')}</p>
              </FadeIn>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
