import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Waypoint } from 'react-waypoint';
import { useTranslation } from 'react-i18next';

import { SiteContext } from 'src/store/site-context';
import { isEmptyObject } from 'src/utils';
import { colorThemeType } from 'src/models/appTypes';

import Spinner from 'src/components/Spinner/Spinner';
import NavBar from 'src/components/NavBar/NavBar';
import useTypingText from 'src/hooks/useTypingText';
import classes from './Home.module.scss';

import CV_MarioGonzalez_es from 'src/assets/contents/Mario_Gonzalez_Duarte_CV_es.pdf';
import resume_MarioGonzalez_en from 'src/assets/contents/Mario_Gonzalez_Duarte_resume_en.pdf';

const Home: React.FC<{ onChangeLanguage: (language: string) => void, onChangeTheme: (color: colorThemeType) => void }> = ({ onChangeLanguage, onChangeTheme }) => {
    const { language, data } = useContext(SiteContext);
    const [loadedData, setLoadedData] = useState<boolean>(false);
    const [openToWork, setOpenToWork] = useState<any>(false);
    const navigate = useNavigate();
    const [homeNavBarFixed, setHomeNavBarFixed] = useState<boolean>(false);
    const [translate] = useTranslation('global');
    const { word } = useTypingText([translate('home.positions.architect'), translate('home.positions.jsDeveloper'), translate('home.positions.developer')], 130, 20, false);
    const backgroundImage = useRef<any>(null);

    const loadBackgroundImages = (imageName: string) => {
        return new Promise((resolve, reject) => {
            const bgImageUrl: string = require(`src/assets/images/backgrounds/${imageName}`);
            const image = new Image();
            image.src = bgImageUrl;
            
            image.onload = () =>
                resolve(bgImageUrl);
           image.onerror = (error) => reject(error);
        });
    };

    const randomizeBgImage = useCallback(() => {
        const bgImages = ['background1.jpg', 'background2.jpg'];
        const num = Math.floor(Math.random() * bgImages.length);
        const randomBgImage = bgImages[num];

        loadBackgroundImages(randomBgImage).then((response: any) => {
            backgroundImage.current = response;
        })
        .catch((error) => {
            console.error('Failed to load background image', error);
        });
    }, []);

    useEffect(() => {
        randomizeBgImage();
    }, [randomizeBgImage]);

    useEffect(() => {
        if (!isEmptyObject(data)) {
            setLoadedData(true);
            setOpenToWork(data.openToWork);
        }
    }, [data]);

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
            <Waypoint onEnter={() => changeRoute()} />
            <header id="home" className={`${classes.header} pagewidth`}>
                { loadedData ? (
                    openToWork && (<div className={classes.ribbon}><span>Open to work</span></div>))
                    : <Spinner /> 
                }
                <div className={classes.background} style={{backgroundImage: `url(${backgroundImage.current})` }}></div>
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
                            <a href ={language === 'es' ? CV_MarioGonzalez_es : resume_MarioGonzalez_en} className={classes['download-link']} target="_blank" rel="noreferrer">
                                {translate('common.resume_download')}
                            </a>
                        </div>
                    </div>
                </div>
                <div>
                    <span className={classes['scroll-down']} title={`${translate('home.scroll')}`}>
                        <i className="bi bi-dot" aria-hidden="true"></i>
                    </span>
                </div>
                <NavBar fixedBar={homeNavBarFixed} onChangeLanguage={changeLanguageHandler} onChangeTheme={changeThemeHandler}/>
            </header>
            <Waypoint onEnter={() => setHomeNavBarFixed(false)} onLeave={() => setHomeNavBarFixed(true)} />
        </React.Fragment>
    );
};

export default Home;
