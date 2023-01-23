/* eslint-disable jsx-a11y/anchor-is-valid */

import { HashLink } from 'react-router-hash-link';
import { useTranslation } from 'react-i18next';

import classes from './Footer.module.scss';


const Footer = () => {
    const [translate] = useTranslation('global');

    const getCurrentYear = (): number => {
        const currentDate = new Date();
        return currentDate.getFullYear();
    };

    return (
        <footer className={`${classes.footer} pagewidth`}>
            <div className={classes['footer-content']}>
                <div className={classes['back-top-wrapper']}>
                    <p className={classes['back-top']}>
                        <HashLink smooth to="/#home">
                            <i className="bi bi-chevron-up" aria-hidden="true"></i>
                            <span>{translate('footer.buttonToTop')}</span>
                        </HashLink>
                    </p>
                </div>
            </div>
            <div className={classes['footer-text']}>
                <div className="text">
                    Mario González Duarte <i className="bi bi-dot" aria-hidden="true"></i> {getCurrentYear()}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
