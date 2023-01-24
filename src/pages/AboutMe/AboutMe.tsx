/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import { Waypoint } from 'react-waypoint';
import { useTranslation } from 'react-i18next';

import classes from './AboutMe.module.scss';
import resumePhoto from '../../assets/images/resume-photo.jpg';
import signatureImage from '../../assets/images/signature.jpg';

interface aboutBlocks {
    name: string;
    email: string;
    phone: string;
    birthDate: string;
    address: string;
    nationality: string;
}

const AboutMe = () => {
    const navigate = useNavigate();
    const [sectionAnimationClasses, setSectionAnimationClasses] = useState<string>(`section ${classes['top-margin']}`);
    const [translate] = useTranslation('global');

    const initialClasses = `col-sm-6 ${classes['info-block']}`;
    const blocks = {
        name: initialClasses,
        email: initialClasses,
        phone: initialClasses,
        birthDate: initialClasses,
        address: initialClasses,
        nationality: initialClasses,
    };

    const [blockAnimationClasses, setBlockAnimationClasses] = useState<aboutBlocks>(blocks);

    const addRouteAnimationSectionClass = () => {
        setSectionAnimationClasses(`section ${classes['top-margin']} fadeInUp animated`);
        navigate('#aboutMe');
    };

    const addAnimationClass = (blockName: string) => {
        setBlockAnimationClasses((prevState) => ({ ...prevState, [blockName]: `col-sm-6 ${classes['info-block']} fadeInRight animated` }));
    };

    return (
        <section id="aboutMe" className={sectionAnimationClasses}>
            <Waypoint onEnter={() => addRouteAnimationSectionClass()} />
            <div className="container-section">
                <div className="title">
                    <div className="section-title">
                        <h4>{translate('common.title_aboutMe')}</h4>
                    </div>
                </div>
                <div className="row">
                    <div className={`col-md-3 col-sm-12 ${classes['profile-picture']}`}>
                        <a className={classes['profile-img']}>
                            <img src={resumePhoto} alt="Profile photograph" />
                        </a>
                        <h3 className={classes['info-position']}>{translate('aboutMe.position')}</h3>
                    </div>
                    <div className="col-md-9 col-sm-12">
                        <div className="row">
                            <Waypoint onEnter={() => addAnimationClass('name')} />
                            <div className={blockAnimationClasses['name']}>
                                <div className={`${classes['info-icon']} ${classes['hvr-trim']}`}>
                                    <i className="bi bi-person-fill" aria-hidden="true"></i>
                                </div>
                                <div className={classes['info-text']}>
                                    <span>{translate('aboutMe.name')}</span>
                                    Mario González Duarte
                                </div>
                            </div>
                            <Waypoint onEnter={() => addAnimationClass('email')} />
                            <div className={blockAnimationClasses['email']}>
                                <div className={`${classes['info-icon']} ${classes['hvr-trim']}`}>
                                    <i className="bi bi-envelope-fill" aria-hidden="true"></i>
                                </div>
                                <div className={classes['info-text']}>
                                    <span>{translate('aboutMe.email')}</span>
                                    magodu.pral@gmail.com
                                </div>
                            </div>
                            <Waypoint onEnter={() => addAnimationClass('phone')} />
                            <div className={blockAnimationClasses['phone']}>
                                <div className={`${classes['info-icon']} ${classes['hvr-trim']}`}>
                                    <i className="bi bi-telephone-fill" aria-hidden="true"></i>
                                </div>
                                <div className={classes['info-text']}>
                                    <span>{translate('aboutMe.phone')}</span>
                                    +34 679 84 97 84
                                </div>
                            </div>
                            <Waypoint onEnter={() => addAnimationClass('birthDate')} />
                            <div className={blockAnimationClasses['birthDate']}>
                                <div className={`${classes['info-icon']} ${classes['hvr-trim']}`}>
                                    <i className="bi bi-calendar-week" aria-hidden="true"></i>
                                </div>
                                <div className={classes['info-text']}>
                                    <span>{translate('aboutMe.birthDate')}</span>
                                    26 September 1982
                                </div>
                            </div>
                            <Waypoint onEnter={() => addAnimationClass('address')} />
                            <div className={blockAnimationClasses['address']}>
                                <div className={`${classes['info-icon']} ${classes['hvr-trim']}`}>
                                    <i className="bi bi-geo-alt-fill" aria-hidden="true"></i>
                                </div>
                                <div className={classes['info-text']}>
                                    <span>{translate('aboutMe.address')}</span>
                                    Madrid, Spain
                                </div>
                            </div>
                            <Waypoint onEnter={() => addAnimationClass('nationality')} />
                            <div className={blockAnimationClasses['nationality']}>
                                <div className={`${classes['info-icon']} ${classes['hvr-trim']}`}>
                                    <i className="bi bi-flag-fill" aria-hidden="true"></i>
                                </div>
                                <div className={classes['info-text']}>
                                    <span>{translate('aboutMe.nationality')}</span>
                                    Spanish
                                </div>
                            </div>

                            <div className={`col-sm-12 ${classes['social-profiles']}`}>
                                <span>{translate('aboutMe.socialProfiles')} </span>
                                <a className="hvr-pulse-grow linkedin" href="#" title={`${translate('common.social_title_linkedin')}`}>
                                    <i className="bi bi-linkedin" aria-hidden="true"></i>
                                </a>
                                <a className="hvr-pulse-grow github" href="#" title={`${translate('common.social_title_github')}`}>
                                    <i className="bi bi-github" aria-hidden="true"></i>
                                </a>
                            </div>

                            <div className={`col-sm-12 ${classes['about-content']}`}>
                                <p>
                                    I have more than <b>10 years of experience</b> in the field of <b>Graphic Design</b> , <b>Web Design</b>, <b>Web Development</b> and <b>Mobile Application</b>. Specialized in Adobe web &amp; graphic designing tools
                                    and also in others tools. Professional in Corporate branding, Graphic designing, Web Designing, visualization, GUI, graphics &amp; animations for e-learning, illustrations, web icons, flash web banner, flash intro
                                    animations, logos, brochures, posters etc.
                                </p>
                                <p>
                                    <b> My objectives</b> are increasing my knowledge in computer science fields and new technologies especially, web development and web Design field. Always looking forward to learn new technologies and be a part of
                                    a huge change in the world.
                                </p>
                                <p className={classes.twke3}>
                                    <span>{translate('aboutMe.farewell')}</span>
                                    <img src={signatureImage} className={classes['img-responsive']} alt={`${translate('home.signature')}`} />
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
