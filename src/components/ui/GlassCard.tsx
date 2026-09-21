import React, { ReactNode } from 'react';
import styles from './GlassCard.module.css';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export default function GlassCard({ children, className = '', hoverEffect = false }: GlassCardProps) {
  return (
    <div className={`${styles.glassCard} ${hoverEffect ? styles.hoverEffect : ''} ${className}`}>
      {children}
    </div>
  );
}
