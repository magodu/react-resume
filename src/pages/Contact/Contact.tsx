/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom"
import { Waypoint } from 'react-waypoint';
import { useTranslation } from 'react-i18next';

import { SiteContext } from 'src/store/site-context';
import { isEmptyObject } from 'src/utils';

import Spinner from 'src/components/Spinner/Spinner';
// import GoogleMapComponent from 'src/components/GoogleMap/GoogleMap';
import ContactForm from 'src/components/ContactForm/ContactForm';

import classes from './Contact.module.scss';

import CV_MarioGonzalez_es from 'src/assets/contents/Mario_Gonzalez_Duarte_CV_es.pdf';
import resume_MarioGonzalez_en from 'src/assets/contents/Mario_Gonzalez_Duarte_resume_en.pdf';
 
import { contactBlock } from 'src/models/appTypes';

const Contact = () => {
    const { language, data } = useContext(SiteContext);
    const [loadedData, setLoadedData] = useState<boolean>(false);
    const [sectionData, setSectionData] = useState<any>(null);
    const navigate = useNavigate();
    const [translate] = useTranslation('global');
    const [sectionAnimationClasses, setSectionAnimationClasses] = useState<string>(`section ${classes.contact}`);
    const initialContactClasses = `${classes['contact-block']} hide`;

    const contactBlockClasses: contactBlock = {
        'phone': initialContactClasses,
        'whatsapp': initialContactClasses,
        'email': initialContactClasses,
        'downloadLink': initialContactClasses,
        'social': initialContactClasses
    };

    const [contactAnimationClasses, setContactAnimationClasses] = useState<contactBlock>(contactBlockClasses);

    useEffect(() => {
        if (!isEmptyObject(data)) {
            setLoadedData(true);

            setSectionData({
                personalData: data.aboutMe.personalData,
                socialProfiles: data.aboutMe.socialProfiles,
                maps: {
                    zoom: data.contact.maps.zoom,
                    position: {
                        lat: data.contact.maps.latitude,
                        lng: data.contact.maps.longitude
                    }
                }
            });
        }
    }, [data]);

    const addRouteAnimationSectionClass = () => {
        setSectionAnimationClasses(`section ${classes.contact} fadeInUp animated`);
        navigate('#contact');
    };

    const addAnimationBlockClass = (blockName: string) => {
        setContactAnimationClasses((prevState) => ({ ...prevState, [blockName]: `${initialContactClasses} show fadeInLeft animated` }));
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
                {!loadedData && (<Spinner />)}
                {loadedData && (   
                    <div className="row">
                      {/*   <GoogleMapComponent zoom={sectionData.maps.zoom} position={sectionData.maps.position} /> */}
                    </div>
                )}
                <div className="row mt-3">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        {!loadedData && (<Spinner />)}
                        {loadedData && (  
                            <React.Fragment>
                                <h2>{translate('contact.details.title')}</h2>
                                <div className={contactAnimationClasses['phone']}>
                                    <Waypoint onEnter={() => addAnimationBlockClass('phone')} />
                                    <i className={`bi bi-telephone-fill ${classes['details-icons']}`} aria-hidden="true"></i>
                                    <p>
                                        <b>{translate('contact.details.phone')}: </b> {sectionData.personalData.phone}
                                    </p>
                                </div>
                                <div className={contactAnimationClasses['whatsapp']}>
                                    <Waypoint onEnter={() => addAnimationBlockClass('whatsapp')} />
                                    <i className={`bi bi-whatsapp ${classes['details-icons']}`} aria-hidden="true"></i>
                                    <p>
                                        <b>{translate('contact.details.whatsapp')}: </b> {sectionData.personalData.phone}
                                    </p>
                                </div>
                                <div className={contactAnimationClasses['email']}>
                                    <Waypoint onEnter={() => addAnimationBlockClass('email')} />
                                    <i className={`bi bi-envelope-fill ${classes['details-icons']}`} aria-hidden="true"></i>
                                    <p>
                                        <b>{translate('contact.details.email')}: </b> <a href="mailto:magodu.pral@gmail.com">{sectionData.personalData.email}</a>
                                    </p>
                                </div>
                                <div className={contactAnimationClasses['downloadLink']}>
                                    <Waypoint onEnter={() => addAnimationBlockClass('downloadLink')} />
                                    <i className={`bi bi-filetype-pdf ${classes['details-icons']}`} aria-hidden="true"></i>
                                    <p>
                                        <b>{translate('common.resume_download')}: </b>
                                        <a href={language === 'es' ? CV_MarioGonzalez_es : resume_MarioGonzalez_en} title={`${translate('contact.details.resumeDownload')}`} target="_blank" rel="noreferrer">
                                            <i className="bi bi-download" aria-hidden="true"></i>
                                        </a>
                                    </p>
                                </div>

                                <div className={contactAnimationClasses['social']}>
                                    <Waypoint onEnter={() => addAnimationBlockClass('social')} />
                                    <div className={classes['social-profiles']}>
                                        <a className="hvr-pulse-grow linkedin" href={sectionData.socialProfiles.linkedIn} target="_blank" title={`${translate('common.social_title_linkedin')}`} rel="noreferrer">
                                            <i className="bi bi-linkedin" aria-hidden="true"></i>
                                        </a>
                                        <a className="hvr-pulse-grow github" href={sectionData.socialProfiles.github} target="_blank" title={`${translate('common.social_title_github')}`} rel="noreferrer">
                                            <i className="bi bi-github" aria-hidden="true"></i>
                                        </a>
                                    </div>
                                </div>
                            </React.Fragment> 
                        )}
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
