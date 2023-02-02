import React, { useState, useRef, useEffect, useCallback } from 'react';

import { SiteContextObj, InputProps, colorThemeType } from '../models/appTypes';

import useHttp from '../hooks/useHttp';
import useLocalStorage from '../hooks/useLocalStorage';

import { localStorageDataType } from '../models/appTypes';

const localStorageData: localStorageDataType = {
    language: 'es',
    colorTheme: {
        color: '#06A763',
        description: 'green'
    }
};

export const SiteContext = React.createContext<SiteContextObj>({
    language: '',
    colorTheme: {color: '', description: ''},
    data: {},
    isLoading: false,
    errorLoading: false,
    setLanguageHandler: (language: string) => {},
    setThemeHandler: (color: colorThemeType) => {},
    setData: (data: any) => {}
} as SiteContextObj);


const SiteContextProvider: React.FC<InputProps> = ( props ) => {
    const [ language, setLanguage ] = useState<string>('');
    const [ colorTheme, setColorTheme ] = useState<colorThemeType>({color: '', description: ''});
    const [ data, setData ] = useState<any>({});
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ errorLoading, setErrorLoading ] = useState<boolean>(false);

    const { error, sendRequest: fetchResumeData } = useHttp();
    const [ localStorageConfig ] = useLocalStorage('mgdResume');

    const languageRef = useRef<string>('');

    const getLanguage = useCallback(() => {
        let selectedLanguage = '';

        if (languageRef.current !== '') {
            selectedLanguage = languageRef.current;
        }  else if (localStorageConfig && localStorageConfig.language) {
            selectedLanguage = localStorageConfig.language;
        } else {
            localStorage.setItem('mgdResume', JSON.stringify(localStorageData));
            selectedLanguage = 'es';
        }

        languageRef.current = selectedLanguage;

    }, [localStorageConfig]);

    const getError = useCallback(() => {
        if (error) {
            console.error(error);
            setLoading(false);
            setErrorLoading(true);
        }
    }, [error]);

    const getData = useCallback(() => {
        setLoading(true);
        const transformData = (response: any) => {
            // console.log('response context', languageRef.current, response.data);
            setData(response.data);
            setLoading(false);
        };

        fetchResumeData( {
                url: `https://react-resume-data-default-rtdb.europe-west1.firebasedatabase.app/${languageRef.current}.json`
            },
            transformData
        );

    }, [fetchResumeData]);

    useEffect(() => {
       getLanguage();
       getData();
       getError();

    }, [getData, getLanguage, getError, language]);

    const setLanguageHandler = (language: string) => {
        setLanguage(language);
        languageRef.current = language;
    };

    const setThemeHandler = (color: colorThemeType) => {
        setColorTheme(color);
    };

    const setDataHandler = (data: any) => {
        setData(data);
    };

    const contextValue: SiteContextObj = {
        language: language,
        colorTheme: colorTheme,
        data: data,
        isLoading: loading,
        errorLoading: errorLoading,
        setLanguageHandler: setLanguageHandler,
        setThemeHandler: setThemeHandler,
        setData: setDataHandler
    };

    return <SiteContext.Provider value={contextValue}>
        {props.children}
    </SiteContext.Provider>
};

export default SiteContextProvider;


