import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import global_es from './assets/i18n/es/global.json';
import global_en from './assets/i18n/en/global.json';

i18next
.use(initReactI18next)
.init( {
    interpolation: { escapeValue: false },
    lng: 'es',
    fallbackLng: 'es',
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
