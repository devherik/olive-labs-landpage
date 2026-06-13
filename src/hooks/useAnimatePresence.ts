import { useLayoutEffect, useRef, useState, type RefObject } from "react";

export interface AnimePresenceOptions {
    isPresent: boolean;
    onEnter: (element: HTMLElement, delay?: number) => void;
    onExit: (element: HTMLElement) => Promise<void>;
}

export interface AnimetePresenceResult<T extends HTMLElement> {
    isRendered: boolean;
    ref: RefObject<T | null>;
}

export function useAnimatePresence<T extends HTMLElement>(options: AnimePresenceOptions): AnimetePresenceResult<T> {
    const { isPresent, onEnter, onExit } = options;
    const [isRendered, setIsRendered] = useState(isPresent);
    const ref = useRef<T | null>(null);

    // Adjust state during render when isPresent becomes true to avoid cascading renders in effects
    if (isPresent && !isRendered) {
        setIsRendered(true);
    }

    useLayoutEffect(() => {
        if (isPresent) {
            if (ref.current) {
                onEnter(ref.current, 150);
            }
        } else {
            if (ref.current) {
                onExit(ref.current).then(() => {
                    setIsRendered(false);
                });
            } else {
                setIsRendered(false);
            }
        }
    }, [isPresent, onEnter, onExit]);

    return { isRendered, ref };
}
