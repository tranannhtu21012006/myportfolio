import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import styles from './LanguageSwitcher.module.css';
import { usePathname } from 'next/navigation';

export default function LanguageSwitcher() {
  const t = useTranslations('language');
  const pathname = usePathname();
  
  // Extract current locale from pathname, default to 'vi' if not found
  const currentLocale = pathname.startsWith('/en') ? 'en' : 'vi';
  const nextLocale = currentLocale === 'vi' ? 'en' : 'vi';

  return (
    <Link href="/" locale={nextLocale} className={styles.switcher}>
      <span className={styles.icon}>🌐</span>
      <span className={styles.text}>{t(nextLocale)}</span>
    </Link>
  );
}
