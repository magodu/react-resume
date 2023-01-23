import React, { useState } from 'react';
import { Waypoint } from 'react-waypoint';

import classes from './ContactForm.module.scss';


interface formBlock {
    inputName: string,
    inputEmail: string,
    inputPhone: string,
    inputMessage: string,
    inputButton: string
};

const ContactForm = () => {
    const [formSuccess, setFormSuccess] = useState<boolean>(false);
    const [formError, setFormError] = useState<boolean>(false);

    const formClasses: formBlock = {
        'inputName': '',
        'inputEmail': '',
        'inputPhone': '',
        'inputMessage': '',
        'inputButton': 'btn btn-primary float-right'
    };

    const [formAnimationClasses, setFormAnimationClasses] = useState<formBlock>(formClasses);

    const addAnimationBlockClass = (blockName: string) => {
        let classes = '';
        if (blockName === 'inputButton') {
            classes = 'btn btn-primary float-right fadeInRight animated';
        } else {
            classes = 'fadeInRight animated';
        }

        setFormAnimationClasses((prevState) => ({ ...prevState, [blockName]: classes }));
    };


    return (
        <React.Fragment>
            <h2>Write me</h2>
            {formError && (
                <div id="show_contact_msg">
                    <div className={classes.error}>
                        <i className="bi bi-emoji-frown" aria-hidden="true"></i> Please enter a valid SHOW FIELD
                    </div>
                </div>
            )}
            {formSuccess && (
                <div id="show_contact_msg">
                    <div className={classes.success}>
                        <i className="bi bi-emoji-smile" aria-hidden="true"></i> Message has sent succesfully. I will contact you back ASAP.
                    </div>
                </div>
            )}
            <form method="post" id="contact_form" action="http://mariogonzalezduarte.es/api/email.php">
                <Waypoint onEnter={() => addAnimationBlockClass('inputName')} />
                <input type="text" name="name" id="contact_name" placeholder="Your Name" className={formAnimationClasses['inputName']} />
                <Waypoint onEnter={() => addAnimationBlockClass('inputEmail')} />
                <input type="text" name="email" id="contact_email" placeholder="Email" className={formAnimationClasses['inputEmail']} />
                <Waypoint onEnter={() => addAnimationBlockClass('inputPhone')} />
                <input type="text" name="phone" id="contact_phone" placeholder="Phone" className={formAnimationClasses['inputPhone']} />
                <Waypoint onEnter={() => addAnimationBlockClass('inputMessage')} />
                <textarea name="message" id="contact_text" placeholder="Your Message" className={formAnimationClasses['inputMessage']}></textarea>
                <Waypoint onEnter={() => addAnimationBlockClass('inputButton')} />
                <button className={formAnimationClasses['inputButton']} type="submit" value="Send Now">
                    Send Now
                </button>
            </form>
        </React.Fragment>
    );
};

export default ContactForm;
