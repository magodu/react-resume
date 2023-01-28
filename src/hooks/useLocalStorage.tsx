import { useEffect, useState } from 'react';

export default function useLocalStorage<Type>(key: string, initialValue?: Type) {
    const [value, setValue] = useState(() => {
        const item = localStorage.getItem(key);
        if (item !== null) {
            try {
                return JSON.parse(item);
            } catch {
                return initialValue;
            }
        }
        return initialValue;
    });

    useEffect(() => {
        const rawValue = JSON.stringify(value);
        localStorage.setItem(key, rawValue);
    }, [key, value]);

    function removeValue() {
        console.log('removing value', key);
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(error);
        }
    }

    return [value, setValue, removeValue];
};
