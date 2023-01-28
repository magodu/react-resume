import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';

import App from './App';
import SiteContextProvider from './store/site-context';

import global_es from './assets/i18n/es/global.json';
import global_en from './assets/i18n/en/global.json';

import './style.scss';



i18next.init( {
    interpolation: { escapeValue: false },
    lng: 'es',
    supportedLngs: ['es', 'en'],
    resources: {
        es: {
            global: global_es
        },
        en: {
            global: global_en
        }
    }
});

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
