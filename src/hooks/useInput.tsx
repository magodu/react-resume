import React, { useReducer } from 'react';

enum InputActionKind {
    INPUT = 'INPUT',
    BLUR = 'BLUR',
    RESET = 'RESET',
}

type HTMLFormElementsTypes = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLButtonElement;

interface InputState {
    value: string;
    isTouched: boolean;
}

type ActionType = { type: InputActionKind.INPUT; value: string } | { type: InputActionKind.BLUR; value: string } | { type: InputActionKind.RESET; value: string };

const initialInputState = {
    value: '',
    isTouched: false,
};

const inputStateReducer = (state: InputState, action: ActionType) => {
    const { type } = action;
    switch (type) {
        case InputActionKind.INPUT:
            return { value: action.value, isTouched: state.isTouched };
        case InputActionKind.BLUR:
            return { isTouched: true, value: state.value };
        case InputActionKind.RESET:
            return { isTouched: false, value: '' };
    }
};

const useInput = (validateValue: any) => {
    const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState);
    const valueIsValid = validateValue(inputState.value);
    const hasError = !valueIsValid && inputState.isTouched;

    const valueChangeHandler = (event: React.ChangeEvent<HTMLFormElementsTypes>) => {
        const target = event.target as HTMLFormElementsTypes;
        dispatch({ type: InputActionKind.INPUT, value: target.value });
    };

    const inputBlurHandler = (event: React.ChangeEvent<HTMLFormElementsTypes>) => {
        dispatch({ type: InputActionKind.BLUR, value: '' });
    };

    const reset = () => {
        dispatch({ type: InputActionKind.RESET, value: '' });
    };

    return {
        value: inputState.value,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset,
    };
};

export default useInput;
