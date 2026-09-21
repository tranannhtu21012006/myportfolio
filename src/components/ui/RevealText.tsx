'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function RevealText({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // We create a specific context for this component to avoid conflicts
    const ctx = gsap.context(() => {
      gsap.fromTo(el.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, el);

    return () => {
      ctx.revert(); // Automatically kills the animation and scroll trigger when unmounted
    };
  }, []);

  return (
    <div ref={el} className={className}>
      {children}
    </div>
  );
}
