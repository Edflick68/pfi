import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import fr from './fr.json';
import en from './en.json';

const deviceLanguage = RNLocalize.getLocales()[0].languageCode;

i18n.use(initReactI18next)
    .init({
        compatibilityJSON: 'v4',
        lng: deviceLanguage,
        fallbackLng: 'en',
        resources: {
            fr: {translation: fr},
            en: {translation: en}
        },
        interpolation:{
            escapeValue: false
        }
    });

export const setAppLanguage = (lang: 'fr' | 'en' | 'auto') => {
    if(lang = 'auto'){
        const autoLang = RNLocalize.getLocales()[0].languageCode;
        i18n.changeLanguage(autoLang);
    } else {
        i18n.changeLanguage(lang);
    }
};

export default i18n;