import React, { useState } from 'react';

import { SiteContextObj, InputProps, colorThemeType } from '../models/appTypes';



export const SiteContext = React.createContext<SiteContextObj>({
    language: '',
    colorTheme: {color: '', description: ''},
    data: {},
    setLanguage: (language: string) => {},
    setColorTheme: (color: colorThemeType) => {},
    setData: (data: any) => {}
} as SiteContextObj);


const SiteContextProvider: React.FC<InputProps> = ( props ) => {
    const [language, setLanguage] = useState<string>('');
    const [colorTheme, setColorTheme] = useState<colorThemeType>({color: '', description: ''});
    const [ data, setData ] = useState<any>({});

    const setLanguageHandler = (language: string) => {
        setLanguage(language);
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
        setLanguage: setLanguageHandler,
        setColorTheme: setThemeHandler,
        setData: setDataHandler
    };

    return <SiteContext.Provider value={contextValue}>
        {props.children}
    </SiteContext.Provider>
};

export default SiteContextProvider;


