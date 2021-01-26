import i18n from "i18next";
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './english.json'
import sw from './sweeden.json'


const resources = {
    en: {
        translation: en
    },
    swe: {
        translation:sw
    }
}

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
       resources,
       fallbackLng: 'en',
       nsSeparator: '~',
       interpolation: {
           escapeValue: false,
       } 
    })

export default i18n;
