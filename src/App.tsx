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

import useHttp from './hooks/useHttp';
import useLocalStorage from './hooks/useLocalStorage';

import { SiteContext } from './store/site-context'
import { localStorageDataType } from './models/appTypes';



const localStorageData: localStorageDataType = {
    language: 'es'
};

function App() {
    const context = useContext(SiteContext);
    const { i18n } = useTranslation('global');
    const [ localStorageConfig, setLocalStorageConfig ] = useLocalStorage('mgdResume');
    const { isLoading, error, sendRequest: fetchResumeData } = useHttp();
    const navigate = useNavigate();

    const modifyContext = ((languageSelected: string) => {
        context.setLanguage(languageSelected);
    })

    const setLanguage = useCallback(() => {
        let languageSelected = 'es';
        if (localStorageConfig && localStorageConfig.language) {
            languageSelected = localStorageConfig.language;
        } else {
            localStorage.setItem('mgdResume', JSON.stringify(localStorageData));
        }

        i18n.changeLanguage(languageSelected);
        modifyContext(languageSelected);

        return languageSelected;

    }, [i18n, localStorageConfig]);

    const getData = useCallback((languageSelected: string) => {
        const transformData = (response: any) => {
            console.log('response', languageSelected, response.data);
            context.setData(response.data);
        };

        fetchResumeData( {
                url: `https://react-resume-data-default-rtdb.europe-west1.firebasedatabase.app/${languageSelected}.json`
            },
            transformData
        );
    }, [fetchResumeData]);

    useEffect(() => {
        const languageSelected = setLanguage();
        getData(languageSelected);

    }, [getData, setLanguage]);

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
    };

    return (
        <React.Fragment>  
            { error && <h2>Error retrieving data. Put notification</h2> }
            <div>
                { isLoading && <Loading /> }
                <Home onChangeLanguage={changeLanguageHandler} />
                <AboutMe/>
                <Experience />
                <Skills />
                <Training />
                <Contact />
                <Footer />
            </div>
            
        </React.Fragment>
    );
}

export default App;
