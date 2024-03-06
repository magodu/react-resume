import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, cleanup, waitFor, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { SiteContext } from 'src/store/site-context';

import Resume from 'src/pages/Resume/Resume';
import useLocalStorage from 'src/hooks/useLocalStorage';

window.scrollTo = jest.fn();

describe('Resume component', () => {
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

    function renderComponentWithContext(loading, errorLoading) {
        return render(
            <SiteContext.Provider
                value={{
                    isLoading: loading,
                    errorLoading: errorLoading,
                    data: {},
                    setLanguageHandler: jest.fn(),
                    setThemeHandler: jest.fn(),
                    setData: jest.fn(),
                    language: 'es',
                    colorTheme: {
                        color: '#06A763',
                        description: 'green',
                    },
                }}
            >
                <Router>
                    <Resume />
                </Router>
            </SiteContext.Provider>
        );
    }

    function testSectionComponentsExists() {
        const homeComp = screen.getByText('home.greeting');
        expect(homeComp).toBeInTheDocument();

        const aboutMeComp = screen.getAllByText('common.title_aboutMe');
        expect(aboutMeComp.length).toBe(2);
        expect(aboutMeComp[1]).toBeInTheDocument();

        const experienceComp = screen.getAllByText('common.title_experience');
        expect(experienceComp.length).toBe(2);
        expect(experienceComp[1]).toBeInTheDocument();

        const skillsComp = screen.getAllByText('common.title_skills');
        expect(skillsComp.length).toBe(2);
        expect(skillsComp[1]).toBeInTheDocument();

        const trainingComp = screen.getAllByText('common.title_training');
        expect(trainingComp.length).toBe(2);
        expect(trainingComp[1]).toBeInTheDocument();

        const contactComp = screen.getAllByText('common.title_contact');
        expect(contactComp.length).toBe(2);
        expect(contactComp[1]).toBeInTheDocument();

        const footerComp = screen.getByText('Mario González Duarte');
        expect(footerComp).toBeInTheDocument();
    }

    test('renders loading component when loading is true and all section components', async () => {
        const loading = true;
        const errorLoading = false;
        renderHook(() => useLocalStorage('test-key', 'test-value'));

        renderComponentWithContext(loading, errorLoading);

        await waitFor(() => {
            const loadingText = screen.getByText('common.loading');
            expect(loadingText).toBeInTheDocument();

            testSectionComponentsExists();
        });
    });

    test('renders just all section components when loading is false', async () => {
        const loading = false;
        const errorLoading = false;
        renderHook(() => useLocalStorage('test-key', 'test-value'));

        renderComponentWithContext(loading, errorLoading);

        await waitFor(() => {
            const loadingText = screen.queryByText('common.loading');
            expect(loadingText).not.toBeInTheDocument();

            testSectionComponentsExists();
        });
    });

    test('renders ErrorLoading component if an error happens', async () => {
        const loading = false;
        const errorLoading = true;
        renderHook(() => useLocalStorage('test-key', 'test-value'));

        renderComponentWithContext(loading, errorLoading);

        await waitFor(() => {
            const errorLoadingText = screen.getByText('common.loadingError');
            expect(errorLoadingText).toBeInTheDocument();

            const homeComp = screen.queryByText('home.greeting');
            // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
            expect(homeComp).not.toBeInTheDocument();
        });
    });
});
