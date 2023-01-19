/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState } from 'react';
import { Waypoint } from 'react-waypoint';

import NavBar from '../../components/NavBar/NavBar';
import useTypingText from '../../hooks/useTypingText';
import classes from './Home.module.scss';

const Home = () => {
    const [homeNavBarFixed, setHomeNavBarFixed] = useState<boolean>(false);
    const { word } = useTypingText(['Front end architech', 'Javascript developer', 'Front end developer'], 130, 20, false);

    return (
        <React.Fragment>
            <NavBar fixedBar={homeNavBarFixed} />
            <header className={`${classes.header} pagewidth`}>
                <div className={classes.background}></div>
                <div className={classes['home-overlay']}>
                    <div className={classes['home-intro']}>
                        <div className={classes.name}>
                            <h2>Hello I'm</h2>
                            <h1>Mario González Duarte</h1>
                            <div className={classes['type-wrap']}>
                                <div>
                                    <span>{word}</span>
                                </div>
                            </div>
                            <a className={`${classes['download-link']} ${classes['hvr-shutter-out-horizontal']}`} href="#">
                                Download my CV
                            </a>
                        </div>
                    </div>
                </div>
                <div>
                    <a className={`${classes['scroll-down']} ${classes['page-scroll']}`} title="Scroll Down" href="#">
                        <i className="bi bi-dot" aria-hidden="true"></i>
                    </a>
                </div>
            </header>
            <Waypoint onEnter={() => setHomeNavBarFixed(false)} onLeave={() => setHomeNavBarFixed(true)} />
        </React.Fragment>
    );
};

export default Home;
