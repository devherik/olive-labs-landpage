import React from 'react';
import { animate } from 'animejs';
import { useAnimatePresence } from '../hooks/useAnimatePresence';

interface SlideInEffectProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
}

const SlideInEffect: React.FC<SlideInEffectProps> = ({
  children,
  duration = 1,
  delay = 0,
}) => {
  // Normalize duration to milliseconds (defaulting to 1000ms if duration is invalid)
  const durationMs = (duration > 2 || duration <= 0 ? 1 : duration) * 1000;

  const { isRendered, ref } = useAnimatePresence<HTMLDivElement>({
    isPresent: true,
    onEnter: (el) => {
      animate(el, {
        opacity: [0, 1],
        y: [30, 0], // slide up
        duration: durationMs,
        delay: delay,
        ease: 'outExpo',
      });
    },
    onExit: async () => { }
  });

  if (!isRendered) return null;

  return (
    <div ref={ref}
      style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      {children}
    </div>
  );
};

export default SlideInEffect;

