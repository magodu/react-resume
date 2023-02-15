import { Routes, Route, Navigate } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';

import SiteContextProvider from './store/site-context';
import Resume from './pages/Resume/Resume';

import './i18n';

function App() {   
    return (
        <I18nextProvider i18n={i18next}>
        <BrowserRouter>
            <SiteContextProvider>
                <Routes>
                    <Route path='/' element={<Navigate replace to='/resume' />} />
                    <Route path='/resume' element={<Resume />} />
                </Routes>
            </SiteContextProvider>
        </BrowserRouter>
    </I18nextProvider>

    );
}

export default App;
