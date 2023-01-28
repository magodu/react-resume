import React, { useState } from 'react';


export const SiteContext = React.createContext({
    language: 'es',
    data: {},
    setLanguage: (language) => {},
    setData: (data) => {}
});


const SiteContextProvider = (props) => {
    const [language, setLanguage] = useState('es');
    const [ data, setData ] = useState({});

    const setLanguageHandler = (language) => {
        setLanguage(language);
    };

    const setDataHandler = (data) => {
        setData(data);
    };

    const contextValue = {
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
