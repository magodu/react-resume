import React, { useState } from 'react';

import { SiteContextObj, InputProps } from '../models/appTypes';



export const SiteContext = React.createContext<SiteContextObj>({
    language: '',
    data: {},
    isLoading: true,
    setLanguage: (language: string) => {},
    setData: (data: any) => {}
} as SiteContextObj);


const SiteContextProvider: React.FC<InputProps> = ( props ) => {
    const [language, setLanguage] = useState<string>('');
    const [ data, setData ] = useState<any>({});

    const setLanguageHandler = (language: string) => {
        setLanguage(language);
    };

    const setDataHandler = (data: any) => {
        setData(data);
    };

    const contextValue: SiteContextObj = {
        language: language,
        data: data,
        setLanguage: setLanguageHandler,
        setData: setDataHandler
    };

    return <SiteContext.Provider value={contextValue}>
        {props.children}
    </SiteContext.Provider>
};

export default SiteContextProvider;


