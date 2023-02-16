import { act, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import useHttp from '../hooks/useHttp';

describe('useHttp', () => {
    let fetchMock;
    beforeEach(() => {
        fetchMock = jest.fn();

        global.fetch = fetchMock;
    });

    afterEach(() => {
        fetchMock.mockClear();
        delete global.fetch;
    });

    test('should set isLoading to true', async () => {
        fetchMock.mockReturnValue(
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ data: 'test' }),
            })
        );

        const { result } = renderHook(() => useHttp());
        await expect(result.current.isLoading).toBe(false);

        act(() => {
            result.current.sendRequest({ url: 'https://example.com' }, () => {});
        });

        await expect(result.current.isLoading).toBe(true);

        // await waitForNextUpdate();
        // expect(result.current.isLoading).toBe(false);
    });
});
