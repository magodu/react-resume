import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Skills from '../pages/Skills/Skills';


describe('Skills component', () => {
    const renderComponent = () => render(<Router><Skills /></Router>);

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

    test('should render Skills component correctly', () => {
        renderComponent();

        const menuText = screen.getByText('common.title_skills');

        expect(menuText).toBeInTheDocument();
    });
});

