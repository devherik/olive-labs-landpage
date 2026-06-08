import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';

interface SlideFadeProps {
    children: React.ReactNode;
    duration?: number;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
    distance?: number; // Distance in pixels to slide
}

const SlideFade: React.FC<SlideFadeProps> = ({
    children,
    duration = 800,
    delay = 0,
    direction = 'up',
    distance = 30,
}) => {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        // Determine starting offsets based on direction
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

        // Initialize the animation instance using Anime.js v4 API
        const anim = animate(element, {
            opacity: [0, 1],
            x: [startX, 0],
            y: [startY, 0],
            duration: duration,
            delay: delay,
            ease: 'outQuad',
        });

        // Clean up: stop the animation if the component unmounts mid-animation
        return () => {
            anim.pause();
        };
    }, [duration, delay, direction, distance]);

    return (
        <div ref={elementRef} style={{ opacity: 0, width: '100%' }}>
            {children}
        </div>
    );
};

export default SlideFade;
