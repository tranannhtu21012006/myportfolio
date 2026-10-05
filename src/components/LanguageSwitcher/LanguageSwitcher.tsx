import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import styles from './LanguageSwitcher.module.css';

export default function LanguageSwitcher() {
  const t = useTranslations('language');
  const pathname = usePathname();
  const currentLocale = useLocale();
  
  const nextLocale = currentLocale === 'vi' ? 'en' : 'vi';

  return (
    <Link href={pathname} locale={nextLocale} className={styles.switcher}>
      <span className={styles.icon}>🌐</span>
      <span className={styles.text}>{t(nextLocale)}</span>
    </Link>
  );
}
