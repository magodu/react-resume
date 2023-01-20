/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect } from 'react';
//import { matchRoutes, useLocation } from "react-router-dom"
import { HashLink } from 'react-router-hash-link';
import { Waypoint } from 'react-waypoint';

import classes from './NavBar.module.scss';

const NavBar: React.FC<{ fixedBar: boolean }> = ({ fixedBar }) => {
    const initialClasses = `${classes['nav-bar']} ${classes.clearfix} no-select`;
   // const location = useLocation();
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

    const setActiveClass = () => {
        console.log('setActiveClass');
        // const routes = [{ path: "/#home" }];
        // const [{ route }] = matchRoutes(routes, location); 
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
                    <li id="menuItemMain" className={`menu-item ${classes.active}`} onClick={() => setActiveClass()}>
                        <HashLink smooth to="/#home">Home</HashLink>
                    </li>
                    <li id="menuItemMain" className="menu-item">
                        <HashLink smooth to="/#aboutMe">About Me</HashLink>
                    </li>
                    <li id="menuItemMain" className="menu-item">
                        <HashLink smooth to="/#experience">Experience</HashLink>
                    </li>
                    <li id="menuItemMain" className="menu-item">
                        <HashLink smooth to="/#skills">Skills</HashLink>
                    </li>
                    <li id="menuItemMain" className="menu-item">
                        <HashLink smooth to="/#training">Training</HashLink>
                    </li>
                    <li id="menuItemMain" className="menu-item">
                        <HashLink smooth to="/#contact">Contact</HashLink>
                    </li>
                    <li id="menuItemLanguage" className={classes['menu-item-language']}>
                        <a>Language</a>
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
