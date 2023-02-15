import { act, renderHook } from '@testing-library/react';
import useInput from '../hooks/useInput';

describe('useInput', () => {
    const mockValidator = (value) => value.trim() !== '';

    test('should initialize with correct default values', () => {
        const { result } = renderHook(() => useInput(mockValidator));
        expect(result.current.value).toBe('');
        expect(result.current.isValid).toBe(false);
        expect(result.current.hasError).toBe(false);
    });

    test('should update input value correctly', () => {
        const { result } = renderHook(() => useInput(mockValidator));
        const testValue = 'test input value';
        act(() => {
            result.current.valueChangeHandler({ target: { value: testValue } });
        });
        expect(result.current.value).toBe(testValue);
        expect(result.current.isValid).toBe(true);
        expect(result.current.hasError).toBe(false);
    });

    test('should set isTouched to true on input blur', () => {
        const { result } = renderHook(() => useInput(mockValidator));
        const testValue = 'test input value';
        act(() => {
            result.current.inputBlurHandler({ target: { value: testValue } });
        });
        expect(result.current.hasError).toBe(true);
        expect(result.current.value).toBe('');
    });

    test('should reset state to default', () => {
        const { result } = renderHook(() => useInput(mockValidator));
        const testValue = 'test input value';
        act(() => {
            result.current.valueChangeHandler({ target: { value: testValue } });
        });
        expect(result.current.value).toBe(testValue);
        act(() => {
            result.current.reset();
        });
        expect(result.current.value).toBe('');
        expect(result.current.isValid).toBe(false);
        expect(result.current.hasError).toBe(false);
    });
});
