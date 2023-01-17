/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect } from 'react';
import { Waypoint } from 'react-waypoint';

import classes from './NavBar.module.scss';

const NavBar: React.FC<{ fixedBar: boolean }> = ({ fixedBar }) => {
    const initialClasses = `${classes['nav-bar']} ${classes.clearfix} no-select`;

    const [ navBarClasses, setNavBarClasses ] = useState<string>(initialClasses);
    const [ navBarFixed, setNavBarFixed ] = useState<boolean>(false);

    useEffect(() => {
        if (fixedBar) {
            setNavBarClasses(`${initialClasses} ${classes['fixed-nav-bar']}`);
            setNavBarFixed(true);

        } else {
            setNavBarClasses(initialClasses);
            setNavBarFixed(false);
        }
    }, [initialClasses, fixedBar]);

    const setFixedClass = () => {
        if (!navBarFixed) {
            setNavBarClasses(initialClasses);
            setNavBarFixed(true);
        }
    }

    return (
        
        <div className={navBarClasses}>
            <Waypoint onEnter={setFixedClass} onLeave={() => {}} />
            <nav>
                <div className={classes['mobile-button']}>
                    <div className={classes['mobile-wrapper']}>
                        <i className="bi bi-list text-white" style={{ fontSize: 25 }}></i>
                        <span>Menú</span>
                    </div>
                </div>
                <ul className={`${classes['main-nav']} pagewidth`}>
                    {/* show-menu */}
                    <li id="menuItemMain" className={`menu-item ${classes.active}`}>
                        <a>Inicio</a>
                    </li>
                    <li id="menuItemAboutMe" className="menu-item">
                        <a>Sobre Mi</a>
                    </li>
                    <li id="menuItemExperience" className="menu-item">
                        <a>Experiencia</a>
                    </li>
                    <li id="menuItemSkills" className="menu-item">
                        <a>Conocimientos</a>
                    </li>
                    <li id="menuItemLanguages" className="menu-item">
                        <a>Idiomas</a>
                    </li>
                    <li id="menuItemTraining" className="menu-item">
                        <a>Formación</a>
                    </li>
                    <li id="menuItemContact" className="menu-item">
                        <a>Contacto</a>
                    </li>
                    <li id="menuItemLanguage" className={classes['menu-item-language']}>
                        <a>Settings</a>
                        <ul className={classes['sub-menu']}>
                            <li className={`${classes.language} ${classes['language-selected']}`}>
                                <a>English</a>
                            </li>
                            <li className={classes.language}>
                                <a>Spanish</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
            
        </div>
    );
};

export default NavBar;
