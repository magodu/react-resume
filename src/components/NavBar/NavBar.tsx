/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation } from "react-router-dom"
import { HashLink } from 'react-router-hash-link';
import { Waypoint } from 'react-waypoint';
import { useTranslation } from 'react-i18next';

import classes from './NavBar.module.scss';

interface menuLink {
    home: string,
    aboutMe: string,
    experience: string,
    skills: string,
    training: string,
    contact: string
};

interface languageMenu {
    english: boolean,
    spanish: boolean
};

const NavBar: React.FC<{ fixedBar: boolean }> = ({ fixedBar }) => {
    const initialClasses = `${classes['nav-bar']} ${classes.clearfix} no-select`;
    const location = useLocation();
    const [ navBarClasses, setNavBarClasses ] = useState<string>(initialClasses);
    const [ navBarFixed, setNavBarFixed ] = useState<boolean>(false);
    const [ menuActive, setMenuActive ] = useState<boolean>(false);

    const [translate, i18n] = useTranslation('global');

    const initialLanguageMenuClasses: languageMenu = {
        english: false,
        spanish: false
    };

    const [languageMenuActive, setLanguageMenuActive] = useState<languageMenu>(initialLanguageMenuClasses);

    const initialMenuLinkClasses: any = useMemo(() => {
        return {
            home: 'menu-item',
            aboutMe: 'menu-item',
            experience: 'menu-item',
            skills: 'menu-item',
            training: 'menu-item',
            contact: 'menu-item'
        }
    }, []);

    
    const [menuLinkClasses, setMenuLinkClasses] = useState<menuLink>(initialMenuLinkClasses);

    useEffect(() => {
        if (fixedBar) {
            setNavBarClasses(`${initialClasses} ${classes['fixed-nav-bar']}`);
            setNavBarFixed(true);

        } else {
            setNavBarClasses(initialClasses);
            setNavBarFixed(false);
        }

        setLanguageMenuActive((prevState) => ({ ...prevState, 'spanish': true }));
    }, [initialClasses, fixedBar]);

    const clearMenuLinkClasses = useCallback(() => {
        setMenuLinkClasses({ ...initialMenuLinkClasses });
    }, [initialMenuLinkClasses]);

    const setActiveClass = useCallback((hash: string) => {
        const section = hash.replace(/#/, '');
        clearMenuLinkClasses();
        setMenuLinkClasses((prevState) => ({ ...prevState, [section]: `menu-item ${classes.active}` }));
    }, [clearMenuLinkClasses]);

    useEffect(() => {
        setMenuActive(false);
        if (location.pathname === '/' && (location.hash === '' || location.hash === '#home')) {
            setActiveClass('home');
        } else {
            setActiveClass(location.hash);
        }

    }, [location, setActiveClass]);

    const setFixedClass = () => {
        if (!navBarFixed) {
            setNavBarClasses(initialClasses);
            setNavBarFixed(true);
        }
    }

    const toggleMenu = () => {
        setMenuActive((prevState) => (!prevState));
    }

    const setLanguage = (language: string) => {
        const keyCode = language === 'spanish' ? 'es' : 'en';
        i18n.changeLanguage(keyCode);
        //TODO: guardar en localStorage
        setLanguageMenuActive({ ...initialLanguageMenuClasses });
        setLanguageMenuActive((prevState) => ({ ...prevState, [language]: true }));
    }

    return (
        <div className={navBarClasses}>
            <Waypoint onEnter={setFixedClass} onLeave={() => {}} />
            <nav>
                <div className={classes['mobile-button']}>
                    <div className={classes['mobile-wrapper']} onClick={() => toggleMenu()}>
                        <i className="bi bi-list text-white" style={{ fontSize: 25 }}></i>
                        <span>{translate('home.menu')}</span>
                    </div>
                </div>
                <ul className={`${classes['main-nav']} pagewidth ${menuActive ? classes['show-menu'] : ''}`}>
                    <li id="menuItemMain" className={menuLinkClasses['home']} onClick={() => setActiveClass('home')}>
                        <HashLink smooth to="/#home">{translate('common.title_home')}</HashLink>
                    </li>
                    <li id="menuItemMain" className={menuLinkClasses['aboutMe']} onClick={() => setActiveClass('aboutMe')}>
                        <HashLink smooth to="/#aboutMe">{translate('common.title_aboutMe')}</HashLink>
                    </li>
                    <li id="menuItemMain" className={menuLinkClasses['experience']} onClick={() => setActiveClass('experience')}>
                        <HashLink smooth to="/#experience">{translate('common.title_experience')}</HashLink>
                    </li>
                    <li id="menuItemMain" className={menuLinkClasses['skills']} onClick={() => setActiveClass('skills')}>
                        <HashLink smooth to="/#skills">{translate('common.title_skills')}</HashLink>
                    </li>
                    <li id="menuItemMain" className={menuLinkClasses['training']} onClick={() => setActiveClass('training')}>
                        <HashLink smooth to="/#training">{translate('common.title_training')}</HashLink>
                    </li>
                    <li id="menuItemMain" className={menuLinkClasses['contact']} onClick={() => setActiveClass('contact')}>
                        <HashLink smooth to="/#contact">{translate('common.title_contact')}</HashLink>
                    </li>
                    <li id="menuItemLanguage" className={classes['menu-item-language']}>
                        <a>{translate('common.title_language')}</a>
                        <ul className={classes['sub-menu']}>
                            <li className={`${classes.language} ${languageMenuActive['english'] ? classes['language-selected'] : ''}`} onClick={() => setLanguage('english')}>
                                <a>{translate('home.language_english')}</a>
                            </li>
                            <li className={`${classes.language} ${languageMenuActive['spanish'] ? classes['language-selected'] : ''}`} onClick={() => setLanguage('spanish')}>
                                <a>{translate('home.language_spanish')}</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default NavBar;
