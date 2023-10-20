import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationsInHindi from '../locales/hi/translation.json';
import translationsInEng from '../locales/en/translation.json'
import translationsInChinese from '../locales/cn/translation.json'

const resources = {
    en: {
        translation: translationsInEng
    },
    hi: {
        translation: translationsInHindi
    },
    cn: {
        translation: translationsInChinese
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources, // resources are important to load translations for the languages.
        // lng: , // It acts as default language. When the site loads, content is shown in this language.  
        debug: true,
        lng: localStorage.getItem("lang") === undefined || localStorage.getItem("lang") === null ? "en" : localStorage.getItem("lang"), // It acts as default language. When the site loads, content is shown in this language.  ,
        fallbackLng: "en", // use de if selected language is not available
        interpolation: {
            escapeValue: false
        },
        ns: "translation", // namespaces help to divide huge translations into multiple small files.
        defaultNS: "translation"
    });

export default i18n;