'use client';

import { useTranslations } from 'next-intl';
import RevealText from '../ui/RevealText';
import styles from './Hero.module.css';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className={`section ${styles.hero}`}>
      <div className="container">
        <div className={styles.content}>
          <h1 className={styles.name}>
            TRAN ANH TU
          </h1>
          
          <div className={styles.info}>
            <h2 className={styles.role}>{t('role')}</h2>
            <RevealText>
              <p className={styles.intro}>{t('intro')}</p>
            </RevealText>
            
            <RevealText>
              <a href="#contact" className={styles.cta}>
                {t('cta')}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </RevealText>
          </div>
        </div>
      </div>
    </section>
  );
}
