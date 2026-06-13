import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from '@testing-library/react';
import { useAnimatePresence } from "../hooks/useAnimatePresence";

describe('useAnimatePresence Architectural Contract', () => {
    it('should delay unmounting until the exit animation promise resolves', async () => {
        let resolveExitPromise!: (value: void | PromiseLike<void>) => void;

        const mockExit = vi.fn(() => new Promise<void>((resolve) => {
            resolveExitPromise = resolve;
        }));
        const mockEnter = vi.fn();
        const { result, rerender } = renderHook(
            ({ isPresent }) => useAnimatePresence<HTMLDivElement>(
                { isPresent, onEnter: mockEnter, onExit: mockExit }
            ),
            { initialProps: { isPresent: false } }
        );

        expect(result.current.isRendered).toBe(false);
        expect(mockEnter).not.toHaveBeenCalled();
        expect(mockExit).not.toHaveBeenCalled();

        // Populate ref.current to simulate the element mounting
        result.current.ref.current = document.createElement('div');

        rerender({ isPresent: true });

        expect(mockEnter).toHaveBeenCalledTimes(1);
        expect(result.current.isRendered).toBe(true);
        expect(mockExit).not.toHaveBeenCalled();

        // Transition to false to trigger exit animation
        rerender({ isPresent: false });

        expect(mockExit).toHaveBeenCalledTimes(1);
        // Should remain rendered while the exit promise is pending
        expect(result.current.isRendered).toBe(true);

        // Resolve the exit animation promise
        await act(async () => {
            resolveExitPromise();
        });

        // Should unmount now that the exit animation is complete
        expect(result.current.isRendered).toBe(false);
    });
});
