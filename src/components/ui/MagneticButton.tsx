'use client';

import React, { useEffect, useRef } from 'react';
import { gsap as gsapCore } from 'gsap';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function MagneticButton({ children, className = '', onClick }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = button.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      gsapCore.to(button, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 1,
        ease: 'power3.out'
      });
    };

    const handleMouseLeave = () => {
      gsapCore.to(button, {
        x: 0,
        y: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.3)'
      });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <button ref={buttonRef} className={className} onClick={onClick}>
      {children}
    </button>
  );
}
