import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';

import App from './App';
import SiteContextProvider from './store/site-context';

import './i18n';
import './style.scss';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <I18nextProvider i18n={i18next}>
        <BrowserRouter>
            <SiteContextProvider>
                <App />
            </SiteContextProvider>
        </BrowserRouter>
    </I18nextProvider>
);
