/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState } from 'react';
import { Waypoint } from 'react-waypoint';

import GoogleMapComponent from '../../components/GoogleMap/GoogleMap';

import classes from './Contact.module.scss';

interface contactBlock {
    phone: string,
    whatsapp: string,
    email: string,
    downloadLink: string,
    social: string,
    inputName: string,
    inputEmail: string,
    inputPhone: string,
    inputMessage: string,
    inputButton: string
};

const Contact = () => {
    const googleMapZoom = 13;
    const googleMapPosition = { lat: 40.408004, lng: -3.678024 };
    const [formSuccess, setFormSuccess] = useState<boolean>(false);
    const [formError, setFormError] = useState<boolean>(false);

    const [sectionAnimationClasses, setSectionAnimationClasses] = useState<string>(`section ${classes.contact}`);
    const initialContactClasses = classes['contact-block'];

    const contactBlockClasses: contactBlock = {
        'phone': initialContactClasses,
        'whatsapp': initialContactClasses,
        'email': initialContactClasses,
        'downloadLink': initialContactClasses,
        'social': initialContactClasses,
        'inputName': '',
        'inputEmail': '',
        'inputPhone': '',
        'inputMessage': '',
        'inputButton': 'btn btn-primary float-right'
    };

    const [contactAnimationClasses, setContactAnimationClasses] = useState<contactBlock>(contactBlockClasses);

    const addAnimationSectionClasses = () => {
        setSectionAnimationClasses(`section ${classes.contact} fadeInUp animated`);
    };

    const addAnimationBlockClass = (blockName: string, direction: string) => {
        let classes = '';
        if (direction === 'left') {
            classes = `${initialContactClasses} fadeInLeft animated`;
        } else if (direction === 'right' && blockName === 'inputButton') {
            classes = 'btn btn-primary float-right fadeInRight animated';
        } else if (direction === 'right') {
            classes = 'fadeInRight animated';
        }

        setContactAnimationClasses((prevState) => ({ ...prevState, [blockName]: classes }));

        console.log(contactAnimationClasses, classes)
    };

    return (
        <section className={sectionAnimationClasses}>
            <Waypoint onEnter={() => addAnimationSectionClasses()} />
            <div className="container-section">
                <div className="title">
                    <div className="section-title">
                        <h4>Contact</h4>
                    </div>
                </div>
                <div className="row">
                    <GoogleMapComponent zoom={googleMapZoom} position={googleMapPosition} />
                </div>
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <h2>Contact Details</h2>
                        <div className={contactAnimationClasses['phone']}>
                            <Waypoint onEnter={() => addAnimationBlockClass('phone', 'left')} />
                            <i className={`bi bi-telephone-fill ${classes['details-icons']}`} aria-hidden="true"></i>
                            <p>
                                <b>Phone: </b> +34 679 84 97 84
                            </p>
                        </div>
                        <div className={contactAnimationClasses['whatsapp']}>
                            <Waypoint onEnter={() => addAnimationBlockClass('whatsapp', 'left')} />
                            <i className={`bi bi-whatsapp ${classes['details-icons']}`} aria-hidden="true"></i>
                            <p>
                                <b>Whatsapp: </b> +34 679 84 97 84
                            </p>
                        </div>
                        <div className={contactAnimationClasses['email']}>
                            <Waypoint onEnter={() => addAnimationBlockClass('email', 'left')} />
                            <i className={`bi bi-envelope-fill ${classes['details-icons']}`} aria-hidden="true"></i>
                            <p>
                                <b>Email: </b> <a href="mailto:magodu.pral@gmail.com">magodu.pral@gmail.com</a>
                            </p>
                        </div>
                        <div className={contactAnimationClasses['downloadLink']}>
                            <Waypoint onEnter={() => addAnimationBlockClass('downloadLink', 'left')} />
                            <i className={`bi bi-filetype-pdf ${classes['details-icons']}`} aria-hidden="true"></i>
                            <p>
                                <b>Download my Resume: </b>{' '}
                                <a href="#" title="Download my resume">
                                    <i className="bi bi-download" aria-hidden="true"></i>
                                </a>
                            </p>
                        </div>
                        <div className={contactAnimationClasses['social']}>
                            <Waypoint onEnter={() => addAnimationBlockClass('social', 'left')} />
                            <div className={classes['social-profiles']}>
                                <a className="hvr-pulse-grow linkedin" href="#" title="Link to my Linkedin profile">
                                    <i className="bi bi-linkedin" aria-hidden="true"></i>
                                </a>
                                <a className="hvr-pulse-grow github" href="#" title="Link to my Github repos">
                                    <i className="bi bi-github" aria-hidden="true"></i>
                                </a>
                                <a className="hvr-pulse-grow adobe" href="#" title="Download my resume">
                                    <i className="bi bi-filetype-pdf" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <h2>Write me</h2>
                        {formError && <div id="show_contact_msg">
                            <div className={classes.error}>
                                <i className="bi bi-emoji-frown" aria-hidden="true"></i> Please enter a valid SHOW FIELD
                            </div>
                        </div>}
                        {formSuccess && <div id="show_contact_msg">
                            <div className={classes.success}>
                                <i className="bi bi-emoji-smile" aria-hidden="true"></i> Message has sent succesfully. I will contact you back ASAP.
                            </div>
                        </div>}
                        <form method="post" id="contact_form" action="https://elmanawy.info/demo/moraco/layout2/contact.php">
                            <Waypoint onEnter={() => addAnimationBlockClass('inputName', 'right')} />
                            <input type="text" name="name" id="contact_name" placeholder="Your Name" className={contactAnimationClasses['inputName']} />
                            <Waypoint onEnter={() => addAnimationBlockClass('inputEmail', 'right')} />
                            <input type="text" name="email" id="contact_email" placeholder="Email" className={contactAnimationClasses['inputEmail']} />
                            <Waypoint onEnter={() => addAnimationBlockClass('inputPhone', 'right')} />
                            <input type="text" name="phone" id="contact_phone" placeholder="Phone" className={contactAnimationClasses['inputPhone']} />
                            <Waypoint onEnter={() => addAnimationBlockClass('inputMessage', 'right')} />
                            <textarea name="message" id="contact_text" placeholder="Your Message" className={contactAnimationClasses['inputMessage']}></textarea>
                            <Waypoint onEnter={() => addAnimationBlockClass('inputButton', 'right')} />
                            <button className={contactAnimationClasses['inputButton']} type="submit" value="Send Now">
                                Send Now
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
