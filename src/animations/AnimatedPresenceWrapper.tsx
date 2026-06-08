import React from 'react';
import { animate } from 'animejs';
import { useAnimatePresence } from '../hooks/useAnimatePresence';

interface AnimePresenceWrapperProps {
	isPresent: boolean;
	children: React.ReactNode;
}

const AnimatedPresenceWrapper: React.FC<AnimePresenceWrapperProps> = ({ isPresent, children }: AnimePresenceWrapperProps) => {
	const { isRendered, ref } = useAnimatePresence<HTMLDivElement>({
		isPresent,
		onEnter: (el) => {
			animate(el, {
				opacity: [0, 1],
				y: [-15, 0],
				scale: [0.8, 1],
				duration: 200,
				ease: 'outQuad',
			});
		},
		onExit: async (el) => {
			const anim = animate(el, {
				opacity: [1, 0],
				y: [0, -15],
				scale: [1, 0.8],
				duration: 200,
				ease: 'outQuad',
			});
			await anim;
		}
	});

	if (!isRendered) return null;

	return (
		<div ref={ref} style={{ display: 'inline', alignItems: 'center', justifyContent: 'center', position: isPresent ? 'relative' : 'absolute' }}>
			{children}
		</div>
	);
};

export default AnimatedPresenceWrapper;