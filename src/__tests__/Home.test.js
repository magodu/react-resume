import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
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
        renderComponentWithContext(mockContextData);

        await waitFor(() => {
            expect(screen.getByText('Open to work')).toBeInTheDocument();
        });
    });

    test('loads a random background image', async () => {
        const { container } = renderComponentWithContext();
    
        // Wait for the background image to load
        await new Promise((resolve) => setTimeout(resolve, 1000));
    
        const backgroundImage = container.querySelector('.background')?.style.backgroundImage;
    
        // Check that the background image URL is not empty
        expect(backgroundImage).not.toBe('');
      });
});

