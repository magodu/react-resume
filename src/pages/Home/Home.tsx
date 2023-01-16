/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import NavBar from '../../components/NavBar/NavBar';

import classes from './Home.module.scss';

const Home = () => {
    return (
        <header className={`${classes.header} pagewidth`}>
            <div className={classes.background}></div>
            <div className={classes['home-overlay']}>
                <div className={classes['home-intro']}>
                    <div className={classes.name}>
                        <h2>Hello I'm</h2>
                        <h1>Mario González Duarte</h1>
                        <div className={classes['type-wrap']}>
                            <div id="typed-strings">
                                <span>Frontend Developer</span>
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

            <NavBar />
        </header>
    );
};

export default Home;
