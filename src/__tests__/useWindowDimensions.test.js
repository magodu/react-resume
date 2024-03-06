import { act, renderHook } from '@testing-library/react';
import useWindowDimensions from 'src/hooks/useWindowDimensions';

describe('useWindowDimensions', () => {
    test('should return the initial window dimensions', async () => {
        const { result } = renderHook(() => useWindowDimensions());
        await expect(result.current).toEqual({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    });

    test('should update the window dimensions on resize', async () => {
        const { result } = renderHook(() => useWindowDimensions());
        const width = 600;
        const height = 800;

        act(() => {
            window.innerWidth = width;
            window.innerHeight = height;
            window.dispatchEvent(new Event('resize'));
        });

        await expect(result.current).toEqual({ width, height });
    });
});
