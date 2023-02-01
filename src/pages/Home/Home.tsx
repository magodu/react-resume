import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Waypoint } from 'react-waypoint';
import { useTranslation } from 'react-i18next';

import { SiteContext } from '../../store/site-context';
import { isEmptyObject } from '../../utils';
import { colorThemeType } from '../../models/appTypes';

import Spinner from '../../components/Spinner/Spinner';
import NavBar from '../../components/NavBar/NavBar';
import useTypingText from '../../hooks/useTypingText';
import classes from './Home.module.scss';

import CV_MarioGonzalez_es from '../../assets/contents/CV_MarioGonzalez_es.pdf';
import resume_MarioGonzalez_en from '../../assets/contents/CV_MarioGonzalez_en.pdf';

const Home: React.FC<{ onChangeLanguage: (language: string) => void, onChangeTheme: (color: colorThemeType) => void }> = ({ onChangeLanguage, onChangeTheme }) => {
    const { language, data } = useContext(SiteContext);
    const [loadedData, setLoadedData] = useState<boolean>(false);
    const [sectionData, setSectionData] = useState<any>(null);
    const navigate = useNavigate();
    const [homeNavBarFixed, setHomeNavBarFixed] = useState<boolean>(false);
    const [translate] = useTranslation('global');
    const { word } = useTypingText([translate('home.positions.architect'), translate('home.positions.jsDeveloper'), translate('home.positions.developer')], 130, 20, false);

    useEffect(() => {
        if (!isEmptyObject(data)) {
            setLoadedData(true);
            setSectionData(data.openToWork);
        }
    }, [data, sectionData]);

    const changeLanguageHandler = (language: string) => {
        onChangeLanguage(language);
    };

    const changeThemeHandler = (color: colorThemeType) => {
        onChangeTheme(color);
    };

    const changeRoute = () => {
        navigate('#home');
    };

    return (
        <React.Fragment>
            <NavBar fixedBar={homeNavBarFixed} onChangeLanguage={changeLanguageHandler} onChangeTheme={changeThemeHandler}/>
            <Waypoint onEnter={() => changeRoute()} />
            <header id="home" className={`${classes.header} pagewidth`}>
                { loadedData ? (
                    sectionData.openToWork && (<div className={classes.ribbon}><span>Open to work</span></div>) ) 
                    : <Spinner />
                }
                <div className={classes.background}></div>
                <div className={classes['home-overlay']}>
                    <div className={classes['home-intro']}>
                        <div className={classes.name}>
                            <h2>{translate('home.greeting')}</h2>
                            <h1>Mario González Duarte</h1>
                            <div className={classes['type-wrap']}>
                                <div>
                                    <span>{word}</span>
                                </div>
                            </div>
                            <Link to={language === 'es' ? CV_MarioGonzalez_es : resume_MarioGonzalez_en} className={classes['download-link']} target="_blank" rel="noreferrer">
                                {translate('common.resume_download')}
                            </Link>
                        </div>
                    </div>
                </div>
                <div>
                    <Link to="" className={`${classes['scroll-down']} ${classes['page-scroll']}`} title={`${translate('home.scroll')}`}>
                        <i className="bi bi-dot" aria-hidden="true"></i>
                    </Link>
                </div>
            </header>
            <Waypoint onEnter={() => setHomeNavBarFixed(false)} onLeave={() => setHomeNavBarFixed(true)} />
        </React.Fragment>
    );
};

export default Home;
