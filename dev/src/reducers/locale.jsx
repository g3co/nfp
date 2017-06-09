import {
    SET_TRANSLATION
} from '../constants.jsx';

import i18n from '../containers/translations';

const initialState = {
    language: 'ru',
    translations: i18n('ru')
};

export default function locale(state = initialState, action) {
    switch(action.type) {
        case SET_TRANSLATION:
            return {...state,
                language: action.payload,
                translations: i18n(action.payload)
            };
            break;
        default:
            return state;
            break;
    }
}