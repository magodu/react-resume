/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import { Waypoint } from 'react-waypoint';
import { useTranslation } from 'react-i18next';

import GoogleMapComponent from '../../components/GoogleMap/GoogleMap';
import ContactForm from '../../components/ContactForm/ContactForm';

import classes from './Contact.module.scss';

interface contactBlock {
    phone: string,
    whatsapp: string,
    email: string,
    downloadLink: string,
    social: string
};

const Contact = () => {
    const navigate = useNavigate();
    const [translate] = useTranslation('global');
    const [sectionAnimationClasses, setSectionAnimationClasses] = useState<string>(`section ${classes.contact}`);
    const initialContactClasses = classes['contact-block'];
    const googleMapZoom = 13;
    const googleMapPosition = { lat: 40.408004, lng: -3.678024 };

    const contactBlockClasses: contactBlock = {
        'phone': initialContactClasses,
        'whatsapp': initialContactClasses,
        'email': initialContactClasses,
        'downloadLink': initialContactClasses,
        'social': initialContactClasses
    };

    const [contactAnimationClasses, setContactAnimationClasses] = useState<contactBlock>(contactBlockClasses);

    const addRouteAnimationSectionClass = () => {
        setSectionAnimationClasses(`section ${classes.contact} fadeInUp animated`);
        navigate('#contact');
    };

    const addAnimationBlockClass = (blockName: string) => {
        setContactAnimationClasses((prevState) => ({ ...prevState, [blockName]: `${initialContactClasses} fadeInLeft animated` }));
    };

    return (
        <section id="contact" className={sectionAnimationClasses}>
            <Waypoint onEnter={() => addRouteAnimationSectionClass()} />
            <div className="container-section">
                <div className="title">
                    <div className="section-title">
                        <h4>{translate('common.title_contact')}</h4>
                    </div>
                </div>
                <div className="row">
                    <GoogleMapComponent zoom={googleMapZoom} position={googleMapPosition} />
                </div>
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <h2>{translate('contact.details.title')}</h2>
                        <div className={contactAnimationClasses['phone']}>
                            <Waypoint onEnter={() => addAnimationBlockClass('phone')} />
                            <i className={`bi bi-telephone-fill ${classes['details-icons']}`} aria-hidden="true"></i>
                            <p>
                                <b>{translate('contact.details.phone')}: </b> +34 679 84 97 84
                            </p>
                        </div>
                        <div className={contactAnimationClasses['whatsapp']}>
                            <Waypoint onEnter={() => addAnimationBlockClass('whatsapp')} />
                            <i className={`bi bi-whatsapp ${classes['details-icons']}`} aria-hidden="true"></i>
                            <p>
                                <b>{translate('contact.details.whatsapp')}: </b> +34 679 84 97 84
                            </p>
                        </div>
                        <div className={contactAnimationClasses['email']}>
                            <Waypoint onEnter={() => addAnimationBlockClass('email')} />
                            <i className={`bi bi-envelope-fill ${classes['details-icons']}`} aria-hidden="true"></i>
                            <p>
                                <b>{translate('contact.details.email')}: </b> <a href="mailto:magodu.pral@gmail.com">magodu.pral@gmail.com</a>
                            </p>
                        </div>
                        <div className={contactAnimationClasses['downloadLink']}>
                            <Waypoint onEnter={() => addAnimationBlockClass('downloadLink')} />
                            <i className={`bi bi-filetype-pdf ${classes['details-icons']}`} aria-hidden="true"></i>
                            <p>
                                <b>{translate('common.resume_download')}: </b>
                                <a href="#" title={`${translate('contact.details.resumeDownload')}`}>
                                    <i className="bi bi-download" aria-hidden="true"></i>
                                </a>
                            </p>
                        </div>
                        <div className={contactAnimationClasses['social']}>
                            <Waypoint onEnter={() => addAnimationBlockClass('social')} />
                            <div className={classes['social-profiles']}>
                                <a className="hvr-pulse-grow linkedin" href="#" title={`${translate('common.social_title_linkedin')}`}>
                                    <i className="bi bi-linkedin" aria-hidden="true"></i>
                                </a>
                                <a className="hvr-pulse-grow github" href="#" title={`${translate('common.social_title_github')}`}>
                                    <i className="bi bi-github" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
