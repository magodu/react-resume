/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import { Waypoint } from 'react-waypoint';
import { useTranslation } from 'react-i18next';

import NavBar from '../../components/NavBar/NavBar';
import useTypingText from '../../hooks/useTypingText';
import classes from './Home.module.scss';

const Home = () => {
    const navigate = useNavigate();
    const [homeNavBarFixed, setHomeNavBarFixed] = useState<boolean>(false);
    const [translate] = useTranslation('global');
    const { word } = useTypingText([translate('home.positions.architect'), translate('home.positions.jsDeveloper'), translate('home.positions.developer')], 130, 20, false);
   

    const changeRoute = () => {
        navigate('#home');
    };

    return (
        <React.Fragment>
            <NavBar fixedBar={homeNavBarFixed} />
            <Waypoint onEnter={() => changeRoute()} />
            <header id="home" className={`${classes.header} pagewidth`}>
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
                            <a className={`${classes['download-link']} ${classes['hvr-shutter-out-horizontal']}`} href="#">
                                {translate('common.resume_download')}
                            </a>
                        </div>
                    </div>
                </div>
                <div>
                    <a className={`${classes['scroll-down']} ${classes['page-scroll']}`} title={`${translate('home.scroll')}`} href="#">
                        <i className="bi bi-dot" aria-hidden="true"></i>
                    </a>
                </div>
            </header>
            <Waypoint onEnter={() => setHomeNavBarFixed(false)} onLeave={() => setHomeNavBarFixed(true)} />
        </React.Fragment>
    );
};

export default Home;
