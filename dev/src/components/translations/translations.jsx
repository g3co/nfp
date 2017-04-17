import ru from './i18n/ru';
import en from './i18n/en';

const Translations = {
    ru,
    en
};

export default function i18n (lang) {
    return Translations[lang]
}