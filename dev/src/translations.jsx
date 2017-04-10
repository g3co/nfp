import ru from './i18n/ru';
import en from './i18n/en';

const Translations = {
    ru,
    en
};

function i18n (lang) {
    return Translations[lang]
};

module.exports = i18n;

export default i18n;