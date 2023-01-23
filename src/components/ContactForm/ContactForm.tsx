import React, { useState, useEffect, FormEvent } from 'react';
import { Waypoint } from 'react-waypoint';

import useInput from '../../hooks/useInput';

import classes from './ContactForm.module.scss';


interface formAnimationBlock {
    inputName: string,
    inputEmail: string,
    inputPhone: string,
    inputMessage: string,
    inputButton: string
};

const ContactForm = () => {
    const [formSuccess, setFormSuccess] = useState<boolean>(false);
    const [formError, setFormError] = useState<boolean>(false);
    const [formIsValid, setFormIsValid] = useState<boolean>(true);


    const { 
        value: enteredName,
        isValid: enteredNameIsValid,
        hasError: nameInputHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        reset: resetNameInput
    } = useInput((value: string) => value.trim() !== '' );

    const { 
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmailInput
    } = useInput((value: string) => {
        const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        return emailRegex.test(value);
    });

    const { 
        value: enteredPhone,
        valueChangeHandler: phoneChangeHandler,
        inputBlurHandler: phoneBlurHandler,
        reset: resetPhoneInput
    } = useInput((value: string) => true );

    const { 
        value: enteredMessage,
        isValid: enteredMessageIsValid,
        hasError: messageInputHasError,
        valueChangeHandler: messageChangeHandler,
        inputBlurHandler: messageBlurHandler,
        reset: resetMessageInput
    } = useInput((value: string) => value.trim() !== '' );



    const initialformClasses: formAnimationBlock = {
        'inputName': '',
        'inputEmail': '',
        'inputPhone': '',
        'inputMessage': '',
        'inputButton': 'btn btn-primary float-right'
    };

    const [formAnimationClasses, setFormAnimationClasses] = useState<formAnimationBlock>(initialformClasses);

    useEffect(() => {
        if (enteredNameIsValid && enteredEmailIsValid && enteredMessageIsValid) {
            setFormIsValid(true);
            setFormError(false);
        } else {
            setFormIsValid(false);
        }
    }, [enteredNameIsValid, enteredEmailIsValid, enteredMessageIsValid]);

    const addAnimationBlockClasses = (blockName: string) => {
        let classes = '';
        if (blockName === 'inputButton') {
            classes = 'btn btn-primary float-right fadeInRight animated';
        } else {
            classes = 'fadeInRight animated';
        }

        setFormAnimationClasses((prevState) => ({ ...prevState, [blockName]: classes }));
    };

    const inputNameClasses = nameInputHasError ? 'invalid' : '';
    const inputEmailClasses = emailInputHasError ? 'invalid' : '';
    const inputMessageClasses = messageInputHasError ? 'invalid' : '';


    const submitHandler = (event: FormEvent) => {
        event.preventDefault();

        if (!formIsValid) {
            setFormError(true);
            setFormSuccess(false);
            return;
        }

        const submitData = {
            name: enteredName,
            email: enteredEmail,
            phone: enteredPhone,
            message: enteredMessage
        }

        console.log('Submitting....', submitData);
        setFormError(false);
        setFormSuccess(true);

        resetNameInput();
        resetEmailInput();
        resetPhoneInput();
        resetMessageInput();
    };


    return (
        <React.Fragment>
            <h2>Write me</h2>
            {formError && (
                <div className={`${classes.message} ${classes.error}`}>
                    <i className="bi bi-emoji-frown" aria-hidden="true"></i> Please review the wrong fields
                </div>
            )}
            {formSuccess && (
                <div className={`${classes.message} ${classes.success}`}>
                    <i className="bi bi-emoji-smile" aria-hidden="true"></i> Message has sent succesfully. I will contact you back ASAP.
                </div>
            )}
            <form onSubmit={submitHandler} noValidate>
                <div className={inputNameClasses}>
                    <Waypoint onEnter={() => addAnimationBlockClasses('inputName')} />
                    <input 
                        type="text"
                        id="name"
                        placeholder="Your Name"
                        value={enteredName}
                        className={formAnimationClasses['inputName']}
                        onChange={nameChangeHandler}
                        onBlur={nameBlurHandler}
                    />
                    {formError && nameInputHasError && (
                        <p className={`${classes['error-text']} no-select`}>Name must not be empty.</p>
                    )}
                </div>                
                <div className={inputEmailClasses}>
                    <Waypoint onEnter={() => addAnimationBlockClasses('inputEmail')} />
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={enteredEmail}
                        className={formAnimationClasses['inputEmail']}
                        onChange={emailChangeHandler}
                        onBlur={emailBlurHandler}
                    />
                    {formError && emailInputHasError && (
                        <p className={`${classes['error-text']} no-select`}>Please enter a valid email.</p>
                    )}
                </div>
                <div>
                    <Waypoint onEnter={() => addAnimationBlockClasses('inputPhone')} />
                    <input
                        type="text"
                        id="phone"
                        placeholder="Phone (optional)"
                        value={enteredPhone}
                        className={formAnimationClasses['inputPhone']}
                        onChange={phoneChangeHandler}
                        onBlur={phoneBlurHandler}
                    />
                </div>
                <div className={inputMessageClasses}>
                    <Waypoint onEnter={() => addAnimationBlockClasses('inputMessage')} />
                    <textarea
                        id="message"
                        placeholder="Your Message"
                        value={enteredMessage}
                        className={formAnimationClasses['inputMessage']}
                        onChange={messageChangeHandler}
                        onBlur={messageBlurHandler}
                    />
                    {formError && messageInputHasError && (
                        <p className={`${classes['error-text']} no-select`}>Please enter a message</p>
                    )}
                </div>
                <Waypoint onEnter={() => addAnimationBlockClasses('inputButton')} />
                <button className={formAnimationClasses['inputButton']} type="submit" value="Send Now">
                    Send Now
                </button>
            </form>
        </React.Fragment>
    );
};

export default ContactForm;