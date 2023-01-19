/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';

import classes from './Footer.module.scss';


const Footer = () => {

    // const addAnimationSectionClasses = () => {
    //     setSectionAnimationClasses('section fadeInUp animated');
    // };

    return (
        <footer className={`${classes.footer} pagewidth`}>
            <div className={classes['back-top-wrapper']}>
                <p className={classes['back-top']}>
                    <i className="bi bi-chevron-up" aria-hidden="true"></i>
                    <a href="#">Back to top</a>
                </p>
            </div>
            <div className={classes['footer-text']}>
                <div className="text">
                    Mario González Duarte <i className="bi bi-dot" aria-hidden="true"></i> 2023
                </div>
            </div>
        </footer>
    );
};

export default Footer;
