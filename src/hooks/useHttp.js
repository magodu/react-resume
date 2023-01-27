import { useState, useCallback } from 'react';

// interface requestConfigType {
//     url: RequestInfo | URL;
//     method: string | undefined;
//     headers: HeadersInit | undefined;
//     body: any;
// }

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async (requestConfig, applyData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(requestConfig.url, {
                method: requestConfig.method ? requestConfig.method : 'GET',
                headers: requestConfig.headers ? requestConfig.headers : {},
                body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
            });

            if (!response.ok) {
                throw new Error('Request failed!');
            }

            const data = await response.json();
            applyData(data);

        } catch (error) {
            setError(error.message || 'Something went wrong!');
        }
        setIsLoading(false);
    }, []);


    return {
        isLoading: isLoading,
        error: error,
        sendRequest
    };
};

export default useHttp;