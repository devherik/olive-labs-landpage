import { useEffect, useRef } from 'react';
import { animate } from 'animejs';

interface FadeInEffectProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
}

/**
 * FadeInEffect component provides a subtle fade-in and slight slide-up animation
 * to its children when it mounts, using anime.js.
 * 
 * Adheres to "The Sanctuary" design system: calm, focused, and intentional.
 */
const FadeInEffect: React.FC<FadeInEffectProps> = ({
  children,
  duration = 5000,
  delay = 0
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (elementRef.current) {
      animate(elementRef.current, {
        opacity: [0, 1],
        duration: duration,
        delay: delay,
        ease: 'outExpo',
      });
    }
  }, [duration, delay]);

  return (
    <div ref={elementRef} style={{ width: '100%', height: '100%' }}>
      {children}
    </div>
  );
};

export default FadeInEffect;
