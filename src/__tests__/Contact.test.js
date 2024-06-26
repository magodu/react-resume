import { MemoryRouter } from 'react-router-dom';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Contact from '../pages/Contact/Contact';


describe('Contact component', () => {
    const renderComponent = () => render(<MemoryRouter><Contact /></MemoryRouter>);

    beforeEach(() => {
        jest.mock('react-i18next', () => ({
            // this mock makes sure any components using the translate hook can use it without a warning being shown
            useTranslation: () => {
                return {
                    t: jest.fn((str) => str),
                    i18n: {
                        changeLanguage: () => new Promise(() => {})
                    }
                };
            },
            initReactI18next: {
                type: '3rdParty',
                init: () => {},
            },
        }));
    });

    afterEach(cleanup);

    test('should render Contact component correctly', () => {
        renderComponent();

        const menuText = screen.getByText('common.title_contact');

        expect(menuText).toBeInTheDocument();
    });
});

