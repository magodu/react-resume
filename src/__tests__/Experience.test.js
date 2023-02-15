/* eslint-disable testing-library/no-node-access */
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, cleanup, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Experience from '../pages/Experience/Experience';

import { SiteContext } from '../store/site-context';

const mockContextNoData = {
    data: {},
};

const mockContextData = {
    data: {
        experience: [
            {
                company: 'testCompany',
                description: [
                    {
                        text: 'Some description text',
                    },
                ],
            },
        ],
    },
};

jest.mock('../components/DateFormattedText/DateFormattedText');

describe('Experience component', () => {
    const renderComponent = () =>
        render(
            <Router>
                <Experience />
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

    test('should render Experience component correctly', () => {
        renderComponent();

        const menuText = screen.getByText('common.title_experience');

        expect(menuText).toBeInTheDocument();
    });


    function renderComponentWithContext(contextValue) {
        return render(
            <SiteContext.Provider value={contextValue}>
                <Router>
                    <Experience />
                </Router>
            </SiteContext.Provider>
        );
      }
      

    test('should be initially loading', () => {
        renderComponentWithContext(mockContextNoData);
        expect(screen.getByTestId('loading')).toBeDefined();
    });

    test('renders experience section when data is available', async () => {
        renderComponentWithContext(mockContextData);

        await waitFor(() => {
            expect(screen.getByTitle('experience.showMoreAlt')).toBeInTheDocument();
        });
    });

    test('After click in Show more a div should be showed adding expanded class', async () => {
        renderComponentWithContext(mockContextData);

        await waitFor(() => {
            expect(screen.getByTitle('experience.showMoreAlt')).toBeInTheDocument();
        });

        const clicableElemList = await screen.findAllByTitle('experience.showMoreAlt');
        fireEvent.click(clicableElemList[0]);
            

        // verify that class expanded is added to div with timeline-content class
        const timelineContentEl = screen.getByText('testCompany').closest('div')
        expect(timelineContentEl).toHaveClass('expanded');
       
    });

    test('After click in a expanded Show more the div should be showed removing expanded class', async () => {
        renderComponentWithContext(mockContextData);

        await waitFor(() => {
            expect(screen.getByTitle('experience.showMoreAlt')).toBeInTheDocument();
        });

        const clicableElemList = await screen.findAllByTitle('experience.showMoreAlt');
        fireEvent.click(clicableElemList[0]);

        // verify that class expanded is added to div with timeline-content class
        const timelineContentEl = screen.getByText('testCompany').closest('div')
        expect(timelineContentEl).toHaveClass('expanded');


        // click again and verify that class expanded is removed from div with timeline-content class
        fireEvent.click(clicableElemList[0]);
        expect(timelineContentEl).not.toHaveClass('expanded');
       
    });

    
});
