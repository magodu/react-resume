import React, { useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation, Link } from "react-router-dom"
import { HashLink } from 'react-router-hash-link';
import { useTranslation } from 'react-i18next';

import { SiteContext } from '../../store/site-context';
import { colorThemeType } from '../../models/appTypes';

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
    en: boolean,
    es: boolean
};

interface colorThemeMenu {
    green: boolean,
    blue: boolean,
    aquamarine: boolean,
    grey: boolean,
    coral: boolean,
    orange: boolean,
    red: boolean,
    pink: boolean
};


const NavBar: React.FC<{ fixedBar: boolean, onChangeLanguage: (language: string) => void, onChangeTheme: (color: colorThemeType) => void }> = ({ fixedBar, onChangeLanguage, onChangeTheme }) => {
    const { language, colorTheme } = useContext(SiteContext);
    const location = useLocation();
    const initialClasses = `${classes['nav-bar']} ${classes.clearfix} no-select`;
    const [ navBarClasses, setNavBarClasses ] = useState<string>(initialClasses);
    const [ menuActive, setMenuActive ] = useState<boolean>(false);
    const [ translate ] = useTranslation('global');

    const initialLanguageMenuClasses: languageMenu = {
        en: false,
        es: false
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

    const initialcolorThemeClasses: colorThemeMenu = useMemo(() => {
        return { 
            green: false,
            blue: false,
            aquamarine: false,
            grey: false,
            coral: false,
            orange: false,
            red: false,
            pink: false 
        }
    }, []);

    const [colorThemeActive, setColorThemeActive] = useState<colorThemeMenu>(initialcolorThemeClasses);

    useEffect(() => {
        if (fixedBar) {
            setNavBarClasses(`${initialClasses} ${classes['fixed-nav-bar']}`);
        } else {
            setNavBarClasses(initialClasses);
        }

        const languageSelected = language;
        setLanguageMenuActive((prevState) => ({ ...prevState, [languageSelected]: true }));

        const colorThemeSelected = colorTheme;
        setColorThemeActive({ ...initialcolorThemeClasses });
        setColorThemeActive((prevState) => ({ ...prevState, [colorThemeSelected.description]: true }));

    }, [initialClasses, initialcolorThemeClasses, fixedBar, language, colorTheme]);

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

    const toggleMenu = () => {
        setMenuActive((prevState) => (!prevState));
    }

    const setLanguage = (event: React.FormEvent, language: string) => {
        event.preventDefault();

        setLanguageMenuActive({ ...initialLanguageMenuClasses });
        setLanguageMenuActive((prevState) => ({ ...prevState, [language]: true }));
        onChangeLanguage(language); 
    }

    const changeThemeColor = (color: string, description: string) => {
        const colorData = {
            description: description,
            color: color
        }
        onChangeTheme(colorData); 
    };

    return (
        <div className={navBarClasses}>
            <nav>
                <div className={classes['mobile-button']}>
                    <div className={classes['mobile-wrapper']} onClick={() => toggleMenu()}>
                        <i className="bi bi-list text-white" style={{ fontSize: 25 }}></i>
                        <span>{translate('home.menu')}</span>
                    </div>
                </div>
                <ul className={`${classes['main-nav']} pagewidth ${menuActive ? classes['show-menu'] : ''}`}>
                    <li id="menuItemMain" className={menuLinkClasses['home']}>
                        <HashLink smooth to="/resume#home">{translate('common.title_home')}</HashLink>
                    </li>
                    <li id="menuItemMain" className={menuLinkClasses['aboutMe']}>
                        <HashLink smooth to="/resume#aboutMe">{translate('common.title_aboutMe')}</HashLink>
                    </li>
                    <li id="menuItemMain" className={menuLinkClasses['experience']}>
                        <HashLink smooth to="/resume#experience">{translate('common.title_experience')}</HashLink>
                    </li>
                    <li id="menuItemMain" className={menuLinkClasses['skills']}>
                        <HashLink smooth to="/resume#skills">{translate('common.title_skills')}</HashLink>
                    </li>
                    <li id="menuItemMain" className={menuLinkClasses['training']}>
                        <HashLink smooth to="/resume#training">{translate('common.title_training')}</HashLink>
                    </li>
                    <li id="menuItemMain" className={menuLinkClasses['contact']}>
                        <HashLink smooth to="/resume#contact">{translate('common.title_contact')}</HashLink>
                    </li>
                    <li id="menuItemLanguage" className={classes['menu-item-language']}>
                        <span className="title">{translate('common.title_language')}</span>
                        <ul className={classes['sub-menu']}>
                            <li className={`${classes.language} ${languageMenuActive['en'] ? classes['language-selected'] : ''}`} onClick={(e) => setLanguage(e, 'en')}>
                                <Link to="">{translate('home.language_english')}</Link>
                            </li>
                            <li className={`${classes.language} ${languageMenuActive['es'] ? classes['language-selected'] : ''}`} onClick={(e) => setLanguage(e, 'es')}>
                                <Link to="">{translate('home.language_spanish')}</Link>
                            </li>
                        </ul>
                    </li>
                </ul>
                <div className={classes.theme}>
                    <div className={`${classes.wrapper} ${classes.colors} text-center`}>
                        <p>{translate('home.colorTheme')}</p>
                        <ul>
                            <li id="green" className={`${classes.green} ${colorThemeActive['green'] ? classes['color-selected'] : ''}`} onClick={changeThemeColor.bind(null, '#06A763', 'green')}></li>
                            <li id="blue" className={`${classes.blue} ${colorThemeActive['blue'] ? classes['color-selected'] : ''}`} onClick={changeThemeColor.bind(null, '#1F5694', 'blue')}></li>
                            <li id="coral" className={`${classes.coral} ${colorThemeActive['coral'] ? classes['color-selected'] : ''}`} onClick={changeThemeColor.bind(null, '#ff7f50', 'coral')}></li>
                            <li id="grey" className={`${classes.grey} ${colorThemeActive['grey'] ? classes['color-selected'] : ''}`} onClick={changeThemeColor.bind(null, '#616161', 'grey')}></li>
                            <li id="aquamarine" className={`${classes.aquamarine} ${colorThemeActive['aquamarine'] ? classes['color-selected'] : ''}`} onClick={changeThemeColor.bind(null, '#038175', 'aquamarine')}></li>
                            <li id="orange" className={`${classes.orange} ${colorThemeActive['orange'] ? classes['color-selected'] : ''}`} onClick={changeThemeColor.bind(null, '#fe8026', 'orange')}></li>
                            <li id="red" className={`${classes.red} ${colorThemeActive['red'] ? classes['color-selected'] : ''}`} onClick={changeThemeColor.bind(null, '#e42444', 'red')}></li>
                            <li id="pink" className={`${classes.pink} ${colorThemeActive['pink'] ? classes['color-selected'] : ''}`} onClick={changeThemeColor.bind(null, '#cf2b7e', 'pink')}></li>
                        </ul>
                    </div>
                    <div className={`${classes.wrapper} ${classes.icon} `}>
                        <i className="bi bi-gear-fill"></i>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;

