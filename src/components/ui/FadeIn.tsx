'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function FadeIn({ children, className = '', delay = 0, style }: { children: React.ReactNode, className?: string, delay?: number, style?: React.CSSProperties }) {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      gsap.fromTo(el.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.5,
          delay: delay,
          ease: 'power2.inOut',
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
    <div ref={el} className={className} style={style}>
      {children}
    </div>
  );
}
