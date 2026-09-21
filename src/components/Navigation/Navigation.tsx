'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import styles from './Navigation.module.css';

export default function Navigation() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.navContainer}>
        <a href="#" className={styles.logo}>
          Anh Tu.
        </a>
        
        <nav className={styles.nav}>
          <a href="#projects" className={styles.link}>{t('projects')}</a>
          <a href="#contact" className={styles.link}>{t('contact')}</a>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
