import React, { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number; // Distance in pixels to slide
  duration?: number; // In milliseconds
  delay?: number;    // In milliseconds
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  distance = 40,
  duration = 1000,
  delay = 0,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasRevealed, setHasRevealed] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || hasRevealed) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasRevealed(true); // Prevent repeating the animation
          observer.unobserve(element);

          // Determine starting offsets
          let startX = 0;
          let startY = 0;
          switch (direction) {
            case 'up':
              startY = distance;
              break;
            case 'down':
              startY = -distance;
              break;
            case 'left':
              startX = distance;
              break;
            case 'right':
              startX = -distance;
              break;
          }

          // Trigger Anime.js animation
          animate(element, {
            opacity: [0, 1],
            x: [startX, 0],
            y: [startY, 0],
            duration: duration,
            delay: delay,
            ease: 'outExpo',
          });
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px', // Trigger slightly before it enters fully
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [direction, distance, duration, delay, hasRevealed]);

  return (
    <div ref={elementRef} style={{ opacity: 0, width: '100%', height: '100%' }}>
      {children}
    </div>
  );
};

export default ScrollReveal;
