import React, { useEffect, useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";

import Home from 'src/pages/Home/Home';
import AboutMe from 'src/pages/AboutMe/AboutMe';
import Experience from 'src/pages/Experience/Experience';
import Skills from 'src/pages/Skills/Skills';
import Training from 'src/pages/Training/Training';
import Contact from 'src/pages/Contact/Contact';
import Footer from 'src/components/Footer/Footer';
import Loading from 'src/components/Loading/Loading';
import ErrorLoading from 'src/components/ErrorLoading/ErrorLoading';

import useLocalStorage from 'src/hooks/useLocalStorage';

import { SiteContext } from 'src/store/site-context'
import { localStorageDataType, colorThemeType } from 'src/models/appTypes';

const localStorageData: localStorageDataType = {
    language: 'es',
    colorTheme: {
        color: '#06A763',
        description: 'green'
    }
};

const Resume: React.FC= () => {

    const context = useContext(SiteContext);
    const { i18n } = useTranslation('global');
    const [ localStorageConfig, setLocalStorageConfig ] = useLocalStorage('mgdResume');
    const navigate = useNavigate();

    const setLocalStorageData = useCallback(() => {
        if (!localStorageConfig) {
            setLocalStorageConfig(localStorageData);
            context.setLanguageHandler('es');
            context.setThemeHandler(localStorageData.colorTheme);
        } else {
            // language
            const languageSelected = localStorageConfig ? localStorageConfig.language : '';
            i18n.changeLanguage(languageSelected);
            context.setLanguageHandler(languageSelected);
    
            // theme
            const themeSelected = localStorageConfig ? localStorageConfig.colorTheme : {};
            context.setThemeHandler(themeSelected);
            document.documentElement.style.setProperty('--theme-first-color', themeSelected.color);
        }

    }, [localStorageConfig, setLocalStorageConfig, context, i18n]);

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
        if (localStorageConfig) {
            setLocalStorageConfig((oldConfig: localStorageDataType) => ({
                ...oldConfig,
                colorTheme: themeSelected
            }));
        }

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
};

export default Resume;
