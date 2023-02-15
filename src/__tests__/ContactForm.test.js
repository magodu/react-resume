/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

import ContactForm from '../components/ContactForm/ContactForm';

describe('ContactForm component', () => {
    const renderComponent = () =>
        render(
            <Router>
                <ContactForm />
            </Router>
        );

    beforeEach(() => {
        jest.mock('react-i18next', () => ({
            // this mock makes sure any components using the translate hook can use it without a warning being shown
            useTranslation: () => {
                return {
                    t: jest.fn((str) => str),
                    i18n: {
                        changeLanguage: () => new Promise(() => {}),
                    },
                };
            },
            initReactI18next: {
                type: '3rdParty',
                init: () => {},
            },
        }));
    });

    afterEach(cleanup);

    test('should render ContactForm component correctly', () => {
        renderComponent();

        const titleText = screen.getByText('contact.contactForm.title');

        expect(titleText).toBeInTheDocument();
    });

    test('renders form inputs and button', () => {
        renderComponent();
        const nameInput = screen.getByPlaceholderText('contact.contactForm.placeholder_name');
        const emailInput = screen.getByPlaceholderText('contact.contactForm.placeholder_email');
        const phoneInput = screen.getByPlaceholderText('contact.contactForm.placeholder_phone');
        const messageTextarea = screen.getByPlaceholderText('contact.contactForm.placeholder_message');
        const submitButton = screen.getByText('contact.contactForm.submit_button');
        expect(nameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(phoneInput).toBeInTheDocument();
        expect(messageTextarea).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });

    test('shows validation errors when form fields are invalid', async () => {
        renderComponent();

        const nameInput = screen.getByPlaceholderText('contact.contactForm.placeholder_name');
        const emailInput = screen.getByPlaceholderText('contact.contactForm.placeholder_email');
        const messageTextarea = screen.getByPlaceholderText('contact.contactForm.placeholder_message');
        const submitButton = screen.getByText('contact.contactForm.submit_button');

        await userEvent.type(nameInput, '   ');
        await userEvent.type(emailInput, 'invalid-email');
        await userEvent.type(messageTextarea, ' ');
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('contact.contactForm.error_banner')).toBeInTheDocument();
            expect(screen.getByText('contact.contactForm.error_name')).toBeInTheDocument();
            expect(screen.getByText('contact.contactForm.error_email')).toBeInTheDocument();
            // expect(screen.getByText('contact.contactForm.error_message')).toBeInTheDocument();
        });
    });

    test('submitting the form sends a request to the API', async () => {
        renderComponent();

        const sendFormSpy = jest.spyOn(global, 'fetch').mockResolvedValueOnce({ json: jest.fn() });
        const url = 'http://mariogonzalezduarte.es/api/email.php';
        const submitData = {
            subject: 'Mensaje desde curriculum online',
            name: 'Mario',
            email: 'mario@example.com',
            phone: '',
            message: 'Hello, world',
        };
        const body = `noise=''&fsubject=${submitData.subject}&fname=${submitData.name}&email=${submitData.email}&phone=${submitData.phone}&message=${submitData.message}`;

        const nameInput = screen.getByPlaceholderText('contact.contactForm.placeholder_name');
        const emailInput = screen.getByPlaceholderText('contact.contactForm.placeholder_email');
        const messageTextarea = screen.getByPlaceholderText('contact.contactForm.placeholder_message');
        const submitButton = screen.getByText('contact.contactForm.submit_button');

        await userEvent.type(nameInput, submitData.name);
        await userEvent.type(emailInput, submitData.email);
        await userEvent.type(messageTextarea, submitData.message);
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(sendFormSpy).toHaveBeenCalledTimes(1);
            expect(sendFormSpy).toHaveBeenCalledWith(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(body),
            });
        });

        sendFormSpy.mockRestore();
    });

    test('sends form data when form is valid', async () => {
        renderComponent();

        const sendFormSpy = jest.spyOn(global, 'fetch').mockResolvedValueOnce({ json: jest.fn() });
        const url = 'http://mariogonzalezduarte.es/api/email.php';
        const submitData = {
            subject: 'Mensaje desde curriculum online',
            name: 'Mario',
            email: 'mario@example.com',
            phone: '',
            message: 'Hello, world',
        };
        const body = `noise=''&fsubject=${submitData.subject}&fname=${submitData.name}&email=${submitData.email}&phone=${submitData.phone}&message=${submitData.message}`;

        const nameInput = screen.getByPlaceholderText('contact.contactForm.placeholder_name');
        const emailInput = screen.getByPlaceholderText('contact.contactForm.placeholder_email');
        const messageTextarea = screen.getByPlaceholderText('contact.contactForm.placeholder_message');
        const submitButton = screen.getByText('contact.contactForm.submit_button');

        await userEvent.type(nameInput, submitData.name);
        await userEvent.type(emailInput, submitData.email);
        await userEvent.type(messageTextarea, submitData.message);
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(sendFormSpy).toHaveBeenCalledTimes(1);
            expect(sendFormSpy).toHaveBeenCalledWith(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(body),
            });
        });

        setTimeout(async () => {
            expect(await screen.findByText('contact.contactForm.success_banner')).toBeInTheDocument();
        }, 1000);

        sendFormSpy.mockRestore();
    });

    test('post request fails and shows an error', async () => {
        renderComponent();

        const sendFormSpy = jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Async error message'));
        const url = 'http://mariogonzalezduarte.es/api/email.php';
        const submitData = {
            subject: 'Mensaje desde curriculum online',
            name: 'Mario',
            email: 'mario@example.com',
            phone: '',
            message: 'Hello, world',
        };
        const body = `noise=''&fsubject=${submitData.subject}&fname=${submitData.name}&email=${submitData.email}&phone=${submitData.phone}&message=${submitData.message}`;

        const nameInput = screen.getByPlaceholderText('contact.contactForm.placeholder_name');
        const emailInput = screen.getByPlaceholderText('contact.contactForm.placeholder_email');
        const messageTextarea = screen.getByPlaceholderText('contact.contactForm.placeholder_message');
        const submitButton = screen.getByText('contact.contactForm.submit_button');

        await userEvent.type(nameInput, submitData.name);
        await userEvent.type(emailInput, submitData.email);
        await userEvent.type(messageTextarea, submitData.message);
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(sendFormSpy).toHaveBeenCalledTimes(1);
            expect(sendFormSpy).toHaveBeenCalledWith(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(body),
            });
        });

        setTimeout(async () => {
            expect(await screen.findByText('contact.contactForm.error_banner')).toBeInTheDocument();
        }, 1000);

        sendFormSpy.mockRestore();
    });
});
