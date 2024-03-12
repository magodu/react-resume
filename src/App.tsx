import { Routes, Route, Navigate } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';

import SiteContextProvider from 'src/store/site-context';
import Resume from 'src/pages/Resume/Resume';

import 'src/i18n';

function App() {   
    return (
        <I18nextProvider i18n={i18next}>
        <BrowserRouter basename="/resume">
            <SiteContextProvider>
                <Routes>
                    <Route path='/' element={<Resume />} />
                    <Route path='*' element={<Navigate replace to='/' />} />
                </Routes>
            </SiteContextProvider>
        </BrowserRouter>
    </I18nextProvider>

    );
}

export default App;
