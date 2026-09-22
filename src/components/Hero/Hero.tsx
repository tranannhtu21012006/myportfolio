'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import RevealText from '../ui/RevealText';
import styles from './Hero.module.css';

const ROLES = [
  "DevOps Engineering",
  "Research-Driven Developer"
];

export default function Hero() {
  const t = useTranslations('hero');
  
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = ROLES[currentRoleIndex];

      if (isDeleting) {
        setCurrentText((prev) => fullText.substring(0, prev.length - 1));
        setTypingSpeed(50); // Faster when deleting
      } else {
        setCurrentText((prev) => fullText.substring(0, prev.length + 1));
        setTypingSpeed(100); // Normal typing speed
      }

      if (!isDeleting && currentText === fullText) {
        // Pause at the end of typing before deleting
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === '') {
        // Move to the next word and start typing
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
      }
    };

    const typingTimer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(typingTimer);
  }, [currentText, isDeleting, currentRoleIndex, typingSpeed]);

  return (
    <section className={`section ${styles.hero}`}>
      <div className="container">
        <div className={styles.content}>
          <h1 className={styles.name}>
            TRAN ANH TU
          </h1>
          
          <div className={styles.info}>
            <h2 className={styles.role}>
              {currentText}
              <span className={styles.cursor}>|</span>
            </h2>
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
