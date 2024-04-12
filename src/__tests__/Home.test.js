import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, cleanup, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Home from 'src/pages/Home/Home';
import { SiteContext } from 'src/store/site-context';

const mockContextData = {
    colorTheme: {color: '', description: ''},
    data: {
        openToWork: true
    }
};

function renderComponentWithContext() {
    return render(
        <SiteContext.Provider value={mockContextData}>
            <Router>
                <Home />
            </Router>
        </SiteContext.Provider>
    );
}

describe('Home component', () => {

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

    test('should render Home component correctly', () => {
        render(<Router><Home /></Router>);

        const greetingText = screen.getByText('home.greeting');
        expect(greetingText).toBeInTheDocument();
    });

    test('shows openToWork ribbon if the property is true', async () => {
        await act(async () => {
            renderComponentWithContext(mockContextData);
        });

        await waitFor(() => {
            expect(screen.getByText('Open to work')).toBeInTheDocument();
        });
    });

    test('loads a random background image', async () => {
        await act(async () => {
            renderComponentWithContext();
        });
    
        await waitFor(() => {
            const backgroundImage = screen.getByTestId('background').style.backgroundImage;
            expect(backgroundImage).not.toBe('');
        });
    });
});

