import { useEffect, useState } from 'react';

const getInitialValue = (key: string, initialValue?: any) => { 
    const item = localStorage.getItem(key);
    if (item !== null) {
        try {
            return JSON.parse(item);
        } catch {
            return initialValue;
        }
    }
    return initialValue;
};


export default function useLocalStorage<Type>(key: string, initialValue?: Type) {
    const [value, setValue] = useState(() => getInitialValue(key, initialValue));

    useEffect(() => {
        const rawValue = JSON.stringify(value);
        localStorage.setItem(key, rawValue);
    }, [key, value]);

    const removeValue = () => { 
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(error);
        }
    };

    return [ value, setValue, removeValue ];
};
