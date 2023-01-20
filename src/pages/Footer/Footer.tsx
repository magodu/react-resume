/* eslint-disable jsx-a11y/anchor-is-valid */

import { HashLink } from 'react-router-hash-link';

import classes from './Footer.module.scss';


const Footer = () => {

    return (
        <footer className={`${classes.footer} pagewidth`}>
            <div className={classes['footer-content']}>
                <div className={classes['back-top-wrapper']}>
                    <p className={classes['back-top']}>
                        <HashLink smooth to="/#home">
                            <i className="bi bi-chevron-up" aria-hidden="true"></i>
                            <span>Back to top</span>
                        </HashLink>
                    </p>
                    {/* <HashLink smooth to="/#home">
                        <p className={classes['back-top']}>
                            <i className="bi bi-chevron-up" aria-hidden="true"></i>
                            <a href="#">Back to top</a> 
                        </p>
                    </HashLink> */}
                </div>
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
