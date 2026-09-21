'use client';

import { useTranslations } from 'next-intl';
import styles from './Footer.module.css';

export default function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.left}>
            <span className={styles.logo}>Anh Tu.</span>
          </div>
          <div className={styles.right}>
            <p className={styles.copyright}>
              © {year} Trần Anh Tú. {t('rights')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
