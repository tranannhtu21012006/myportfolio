import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { PROJECT_DATA } from '@/data/projects';
import Navigation from '@/components/Navigation/Navigation';
import Footer from '@/components/Footer/Footer';
import { ArrowLeft, Code, Calendar, Users, Lightbulb, Target } from 'lucide-react';
import Link from 'next/link';
import ProjectSidebar from '@/components/Projects/ProjectSidebar';
import styles from './ProjectDetail.module.css';

export default async function ProjectPage({ params }: { params: Promise<{ locale: string, key: string }> }) {
  const { locale, key } = await params;
  const project = PROJECT_DATA.find(p => p.key === key);
  
  if (!project) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'projects' });

  return (
    <>
      <Navigation />
      
      <main className={styles.pageContainer}>
        <div className="container">
          <Link href={`/${locale}/#projects`} className={styles.backLink}>
            <ArrowLeft size={16} />
            {t('details.backToHome')}
          </Link>

          <div className={styles.grid}>
            {/* Left Column: Sidebar Info inside Drawer for Mobile */}
            <ProjectSidebar title={t(`items.${project.key}.title`)}>
              <div className={styles.infoGroup}>
                <span className={styles.infoLabel}>{t('details.completed')}</span>
                <div className={styles.infoValue} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calendar size={18} /> {project.date}
                </div>
              </div>

              <div className={styles.infoGroup}>
                <span className={styles.infoLabel}>{t('details.teamSize')}</span>
                <div className={styles.infoValue} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Users size={18} /> {project.teamSize} {project.teamSize > 1 ? 'Members' : 'Member'}
                </div>
              </div>

              <div className={styles.infoGroup}>
                <span className={styles.infoLabel}>{t('details.tools')}</span>
                <div className={styles.techStack}>
                  {project.techStack.map(tech => (
                    <span key={tech} className={styles.tag}>{tech}</span>
                  ))}
                </div>
              </div>

              <div className={styles.resultBox}>
                <div className={styles.infoLabel} style={{ marginBottom: '8px' }}>{t('details.result')}</div>
                <div className={styles.resultText}>
                  {t(`items.${project.key}.result`)}
                </div>
              </div>

              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.githubBtn}>
                <Code size={20} />
                {t('details.sourceCode')}
              </a>
            </ProjectSidebar>

            {/* Right Column: Main Content */}
            <div className={styles.mainContent}>
              <div className={styles.imageWrapper}>
                <img src={project.image} alt={t(`items.${project.key}.title`)} className={styles.featureImage} />
              </div>

              <div className={styles.contentBlock}>
                <h3 className={styles.contentTitle}>
                  <Lightbulb size={24} color="var(--accent-primary)" />
                  {t('details.context')}
                </h3>
                <p className={styles.contentText}>
                  {t(`items.${project.key}.context`)}
                </p>
              </div>

              <div className={styles.contentBlock}>
                <h3 className={styles.contentTitle}>
                  <Target size={24} color="var(--accent-primary)" />
                  {t('details.mainWork')}
                </h3>
                <p className={styles.contentText}>
                  {t(`items.${project.key}.mainWork`)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
