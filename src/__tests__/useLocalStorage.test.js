import { renderHook, act } from '@testing-library/react';
import useLocalStorage from 'src/hooks/useLocalStorage';
import '@testing-library/jest-dom/extend-expect';

describe('useLocalStorage', () => {
    test('should return the initial value from localStorage if it exists', () => {
        localStorage.setItem('testKey', JSON.stringify('testValue'));
        const { result } = renderHook(() => useLocalStorage('testKey', 'defaultValue'));

        expect(result.current[0]).toBe('testValue');
    });

    test('should return the default value if the key does not exist in localStorage', () => {
        const { result } = renderHook(() => useLocalStorage('nonExistentKey', 'defaultValue'));

        expect(result.current[0]).toBe('defaultValue');
    });

    test('should update the value in localStorage when setValue is called', () => {
        const { result } = renderHook(() => useLocalStorage('testKey', 'defaultValue'));

        act(() => {
            result.current[1]('newValue');
        });

        expect(localStorage.getItem('testKey')).toBe(JSON.stringify('newValue'));
    });

    test('should remove the value from localStorage when removeValue is called', () => {
        localStorage.setItem('testKey', JSON.stringify('testValue'));
        const { result } = renderHook(() => useLocalStorage('testKey', 'defaultValue'));

        act(() => {
            result.current[2]();
        });

        expect(localStorage.getItem('testKey')).toBe(null);
    });
});
