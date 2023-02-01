import React, { useEffect, useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";

import Home from './pages/Home/Home';
import AboutMe from './pages/AboutMe/AboutMe';
import Experience from './pages/Experience/Experience';
import Skills from './pages/Skills/Skills';
import Training from './pages/Training/Training';
import Contact from './pages/Contact/Contact';
import Footer from './pages/Footer/Footer';
import Loading from './components/Loading/Loading';
import ErrorLoading from './components/ErrorLoading/ErrorLoading';

import useLocalStorage from './hooks/useLocalStorage';

import { SiteContext } from './store/site-context'
import { localStorageDataType, colorThemeType } from './models/appTypes';

const localStorageData: localStorageDataType = {
    language: 'es',
    colorTheme: {
        color: '#06A763',
        description: 'green'
    }
};

function App() {
    const context = useContext(SiteContext);
    const { i18n } = useTranslation('global');
    const [ localStorageConfig, setLocalStorageConfig ] = useLocalStorage('mgdResume');
    const navigate = useNavigate();

    const setLocalStorageData = useCallback(() => {
        if (!localStorageConfig) {
            localStorage.setItem('mgdResume', JSON.stringify(localStorageData));
        } else {
            // language
            let languageSelected = localStorageConfig ? localStorageConfig.language : '';
            i18n.changeLanguage(languageSelected);
            context.setLanguageHandler(languageSelected);
    
            // theme
            const themeSelected = localStorageConfig ? localStorageConfig.colorTheme : {};
            context.setThemeHandler(themeSelected);
            document.documentElement.style.setProperty('--theme-first-color', themeSelected.color);
        }

    }, [localStorageConfig, context, i18n]);

    useEffect(() => {
        setLocalStorageData();

    }, [setLocalStorageData]);

    useEffect(() => {
        window.scrollTo(0, 0);
        navigate('#home');
    }, [navigate]);

    const changeLanguageHandler = (language: string) => {
        if (language === context.language) {
            return;
        }

        setLocalStorageConfig((oldConfig: localStorageDataType) => ({
            ...oldConfig,
            language: language
        }));

        context.setLanguageHandler(language);
        i18n.changeLanguage(language);
    };

    const changeThemeHandler = (themeSelected: colorThemeType) => {
        setLocalStorageConfig((oldConfig: localStorageDataType) => ({
            ...oldConfig,
            colorTheme: themeSelected
        }));

        context.setThemeHandler(themeSelected);
    };

    return (
        <React.Fragment>  
            { context.errorLoading && ( <ErrorLoading /> )}
            { !context.errorLoading && (
                <div>
                    { context.isLoading && <Loading /> }
                    <Home onChangeLanguage={changeLanguageHandler} onChangeTheme={changeThemeHandler} />
                    <AboutMe/>
                    <Experience />
                    <Skills />
                    <Training />
                    <Contact />
                    <Footer />
                </div>
            )}
        </React.Fragment>
    );
}

export default App;
