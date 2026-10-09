'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import styles from './ProjectSidebar.module.css';

export default function ProjectSidebar({ children, title }: { children: React.ReactNode, title: string }) {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent body scroll when drawer is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className={styles.mobileHeader}>
        <h1 className={styles.mobileTitle}>{title}</h1>
        <button className={styles.toggleBtn} onClick={() => setIsOpen(true)}>
          <Menu size={20} />
          <span>Details</span>
        </button>
      </div>

      {/* Overlay */}
      <div 
        className={`${styles.overlay} ${isOpen ? styles.open : ''}`} 
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar / Drawer */}
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.drawerHeader}>
          <span className={styles.drawerTitle}>Project Details</span>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>
        
        <div className={styles.sidebarContent}>
          <h1 className={styles.desktopTitle}>{title}</h1>
          {children}
        </div>
      </div>
    </>
  );
}
