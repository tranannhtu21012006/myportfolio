'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SlideInTitle({ children, className = '', delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(el.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.5,
          delay: delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={el} className={className}>
      {children}
    </div>
  );
}
