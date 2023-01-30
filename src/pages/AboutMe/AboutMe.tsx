/* eslint-disable jsx-a11y/anchor-is-valid */

import { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Waypoint } from 'react-waypoint';
import { useTranslation } from 'react-i18next';

import { SiteContext } from '../../store/site-context';
import { isEmptyObject } from '../../utils';

import Spinner from '../../components/Spinner/Spinner';

import classes from './AboutMe.module.scss';
import resumePhoto from '../../assets/images/resume-photo.jpg';
import signatureImage from '../../assets/images/signature.jpg';

import { aboutBlocks } from '../../models/appTypes';


const AboutMe = () => {
    const { data } = useContext(SiteContext);
    const [loadedData, setLoadedData] = useState<boolean>(false);
    const [sectionData, setSectionData] = useState<any>(null);
    const navigate = useNavigate();
    const [translate] = useTranslation('global');

    const sectionAnimationClasses = `section ${classes['top-margin']}`;
    const initialClasses = `col-sm-6 ${classes['info-block']} hide`;
    const blocks = {
        name: initialClasses,
        email: initialClasses,
        phone: initialClasses,
        birthDate: initialClasses,
        address: initialClasses,
        nationality: initialClasses,
    };

    useEffect(() => {
        if (!isEmptyObject(data)) {
            setLoadedData(true);
            setSectionData(data.aboutMe);
        }
    }, [data, sectionData]);

    const [blockAnimationClasses, setBlockAnimationClasses] = useState<aboutBlocks>(blocks);

    const navigateHash = () => {
        navigate('#aboutMe');
    };

    const addAnimationClass = (blockName: string) => {
        setBlockAnimationClasses((prevState) => ({ ...prevState, [blockName]: `col-sm-6 ${classes['info-block']} show fadeInRight animated` }));
    };

    return (
        <section id="aboutMe" className={sectionAnimationClasses}>
            <Waypoint onEnter={() => navigateHash()} />
            <div className="container-section">
                <div className="title">
                    <div className="section-title">
                        <h4>{translate('common.title_aboutMe')}</h4>
                    </div>
                </div>
                {!loadedData && (<Spinner />)}
                {loadedData && (
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
                                        {sectionData.personalData.name}
                                    </div>
                                </div>
                                <Waypoint onEnter={() => addAnimationClass('email')} />
                                <div className={blockAnimationClasses['email']}>
                                    <div className={`${classes['info-icon']} ${classes['hvr-trim']}`}>
                                        <i className="bi bi-envelope-fill" aria-hidden="true"></i>
                                    </div>
                                    <div className={classes['info-text']}>
                                        <span>{translate('aboutMe.email')}</span>
                                        {sectionData.personalData.email}
                                    </div>
                                </div>
                                <Waypoint onEnter={() => addAnimationClass('phone')} />
                                <div className={blockAnimationClasses['phone']}>
                                    <div className={`${classes['info-icon']} ${classes['hvr-trim']}`}>
                                        <i className="bi bi-telephone-fill" aria-hidden="true"></i>
                                    </div>
                                    <div className={classes['info-text']}>
                                        <span>{translate('aboutMe.phone')}</span>
                                        {sectionData.personalData.phone}
                                    </div>
                                </div>
                                <Waypoint onEnter={() => addAnimationClass('birthDate')} />
                                <div className={blockAnimationClasses['birthDate']}>
                                    <div className={`${classes['info-icon']} ${classes['hvr-trim']}`}>
                                        <i className="bi bi-calendar-week" aria-hidden="true"></i>
                                    </div>
                                    <div className={classes['info-text']}>
                                        <span>{translate('aboutMe.birthDate')}</span>
                                        {sectionData.personalData.birthDate}
                                    </div>
                                </div>
                                <Waypoint onEnter={() => addAnimationClass('address')} />
                                <div className={blockAnimationClasses['address']}>
                                    <div className={`${classes['info-icon']} ${classes['hvr-trim']}`}>
                                        <i className="bi bi-geo-alt-fill" aria-hidden="true"></i>
                                    </div>
                                    <div className={classes['info-text']}>
                                        <span>{translate('aboutMe.address')}</span>
                                        {sectionData.personalData.address.city}, {sectionData.personalData.address.country}
                                    </div>
                                </div>
                                <Waypoint onEnter={() => addAnimationClass('nationality')} />
                                <div className={blockAnimationClasses['nationality']}>
                                    <div className={`${classes['info-icon']} ${classes['hvr-trim']}`}>
                                        <i className="bi bi-flag-fill" aria-hidden="true"></i>
                                    </div>
                                    <div className={classes['info-text']}>
                                        <span>{translate('aboutMe.nationality')}</span>
                                        {sectionData.personalData.nationality}
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
                                    { sectionData.myself.map((item: any, i: number) => (
                                        <p key={i}>{item.text}</p>
                                    )) }

                                    <p className={classes.twke3}>
                                        <span>{translate('aboutMe.farewell')}</span>
                                        <img src={signatureImage} className={classes['img-responsive']} alt={`${translate('home.signature')}`} />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </section>
    );
};

export default AboutMe;
