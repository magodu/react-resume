/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';

import classes from './AboutMe.module.scss';
import resumePhoto from '../../assets/images/resume-photo.jpg';
import signatureImage from '../../assets/images/signature.jpg';

const AboutMe = () => {
    return (
        <section id="about" className="section">
            <div className="container-section">
                <div className="title">
                    <div className="section-title">
                        <h4>About Me</h4>
                    </div>
                </div>
                <div className="row">
                    <div className={`col-md-3 col-sm-12 ${classes['profile-picture']}`}>
                        <a className={classes['profile-img']}>
                            <img src={resumePhoto} alt="Profile photograph" />
                        </a>
                        <h3 className={classes['info-position']}>UX / UI Developer</h3>
                    </div>
                    <div className="col-md-9 col-sm-12">
                        <div className={`${classes['about-info']} row`}>
                            <div className={`col-sm-6 ${classes['info-block']}`}>
                                <div className={`${classes['info-icon']} ${classes['hvr-trim']}`}>
                                    <i className="bi bi-person-fill" aria-hidden="true"></i>
                                </div>
                                <div className={classes['info-text']}>
                                    <span>Name</span>
                                    Mario González Duarte
                                </div>
                            </div>
                            <div className={`col-sm-6 ${classes['info-block']}`}>
                                <div className={`${classes['info-icon']} ${classes['hvr-trim']}`}>
                                    <i className="bi bi-person-fill" aria-hidden="true"></i>
                                </div>
                                <div className={classes['info-text']}>
                                    <span>Email</span>
                                    magodu.pral@gmail.com
                                </div>
                            </div>
                            <div className={`col-sm-6 ${classes['info-block']}`}>
                                <div className={`${classes['info-icon']} ${classes['hvr-trim']}`}>
                                    <i className="bi bi-telephone-fill" aria-hidden="true"></i>
                                </div>
                                <div className={classes['info-text']}>
                                    <span>Phone</span>
                                    +34 679 84 97 84
                                </div>
                            </div>

                            <div className={`col-sm-6 ${classes['info-block']}`}>
                                <div className={`${classes['info-icon']} ${classes['hvr-trim']}`}>
                                    <i className="bi bi-calendar-week" aria-hidden="true"></i>
                                </div>
                                <div className={classes['info-text']}>
                                    <span>Date of Birth</span>
                                    26 September 1982
                                </div>
                            </div>

                            <div className={`col-sm-6 ${classes['info-block']}`}>
                                <div className={`${classes['info-icon']} ${classes['hvr-trim']}`}>
                                    <i className="bi bi-geo-alt-fill" aria-hidden="true"></i>
                                </div>
                                <div className={classes['info-text']}>
                                    <span>Address</span>
                                    Madrid, Spain
                                </div>
                            </div>

                            <div className={`col-sm-6 ${classes['info-block']}`}>
                                <div className={`${classes['info-icon']} ${classes['hvr-trim']}`}>
                                    <i className="bi bi-flag-fill" aria-hidden="true"></i>
                                </div>
                                <div className={classes['info-text']}>
                                    <span>Nationality</span>
                                    Spanish
                                </div>
                            </div>

                            <div className={`col-sm-12 ${classes['social-profiles']}`}>
                                <span>Social Profiles </span>
                                <a className="hvr-pulse-grow linkedin" href="#" title="Link to my Linkedin profile">
                                    <i className="bi bi-linkedin" aria-hidden="true"></i>
                                </a>
                                <a className="hvr-pulse-grow github" href="#" title="Link to my Github repositories">
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
                                    <span>Yours sincerely,</span>
                                    <img src={signatureImage} className={classes['img-responsive']} alt="signature" />
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