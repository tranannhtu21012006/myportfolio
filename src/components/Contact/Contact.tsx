'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import GlassCard from '../ui/GlassCard';
import FadeIn from '../ui/FadeIn';
import styles from './Contact.module.css';

export default function Contact() {
  const t = useTranslations('contact');
  const [copied, setCopied] = useState(false);
  const email = 'trananhtu21012000@gmail.com';

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className={`section ${styles.contact}`}>
      <div className="container">
        <FadeIn>
          <GlassCard className={styles.card}>
            <div className={styles.content}>
              <h2 className={styles.title}>GET IN TOUCH</h2>
              <FadeIn delay={0.2}>
                <p className={styles.subtitle}>{t('subtitle')}</p>
              </FadeIn>
              
              <FadeIn delay={0.4} className={styles.emailWrapper}>
                <button onClick={handleCopy} className={styles.emailBtn}>
                  <span className={styles.email}>{email}</span>
                  <span className={styles.copyIcon}>
                    {copied ? (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00d4aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                    )}
                  </span>
                </button>
                {copied && <span className={styles.copiedText}>{t('copied')}</span>}
              </FadeIn>

              <FadeIn delay={0.6} className={styles.social}>
                <a href="https://github.com/tranannhtu21012006" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  GitHub
                </a>
                <a href="https://www.instagram.com/dnexq__/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  Instagram
                </a>
              </FadeIn>
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </section>
  );
}
