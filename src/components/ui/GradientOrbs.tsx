'use client';
import { useEffect, useRef } from 'react';
import styles from './GradientOrbs.module.css';

export default function GradientOrbs() {
  return (
    <div className={styles.container}>
      <div className={styles.orb1}></div>
      <div className={styles.orb2}></div>
      <div className={styles.orb3}></div>
    </div>
  );
}
