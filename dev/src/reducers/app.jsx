import {
    SET_APP_PROGRESS
} from '../constants.jsx';

const initialState = {
    progress: 0,
    notification: ''
};

export default function app(state = initialState, action) {
    switch(action.type) {
        case SET_APP_PROGRESS:
            return {...state,
                progress: action.payload
            };
            break;
            break;
        default:
            return state;
            break;
    }
}