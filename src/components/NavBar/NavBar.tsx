/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';

import classes from './NavBar.module.scss';

const NavBar = () => {
    return (
        <div id="navBar" className={`${classes['nav-bar']} ${classes.clearfix} ${classes['no-select']}`}>
        <nav>
            <div className={classes['mobile-button']}>
                <div className={classes['mobile-wrapper']}>
                    <i className="bi bi-list text-white" style={{ fontSize: 25 }}></i>
                    <span>Menú</span>
                </div>
            </div>
            <ul className={`${classes['main-nav']} pagewidth`}>
                {/* show-menu */}
                <li id="menuItemMain" className={`${classes['menu-item']} ${classes.active}`}>
                    <a>Inicio</a>
                </li>
                <li id="menuItemAboutMe" className={classes['menu-item']}>
                    <a>Sobre Mi</a>
                </li>
                <li id="menuItemExperience" className={classes['menu-item']}>
                    <a>Experiencia</a>
                </li>
                <li id="menuItemSkills" className={classes['menu-item']}>
                    <a>Conocimientos</a>
                </li>
                <li id="menuItemLanguages" className={classes['menu-item']}>
                    <a>Idiomas</a>
                </li>
                <li id="menuItemTraining" className={classes['menu-item']}>
                    <a>Formación</a>
                </li>
                <li id="menuItemContact" className={classes['menu-item']}>
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
