import { animate } from 'animejs';
import { useAnimatePresence } from '../hooks/useAnimatePresence';


interface FadeInEffectProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
}

const FadeInEffect: React.FC<FadeInEffectProps> = ({
  children,
  duration = 5000,
  delay = 0
}) => {
  const { isRendered, ref } = useAnimatePresence<HTMLDivElement>({
    isPresent: true,
    onEnter: (el) => {
      animate(el, {
        opacity: [0, 1],
        duration: duration,
        delay: delay,
        ease: 'outExpo',
      });
    },
    onExit: async () => { }
  });

  if (!isRendered) return null;

  return (
    <div ref={ref} style={{ width: '100%', height: '100%' }}>
      {children}
    </div>
  );
};

export default FadeInEffect;
