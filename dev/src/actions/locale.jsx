import { SET_TRANSLATION } from '../constants.jsx';

export function setTranslation(lang) {
    return {
        type: SET_TRANSLATION,
        payload: lang
    }
}