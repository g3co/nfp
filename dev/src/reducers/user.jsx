import {
    GET_USER_SESSION_TOKEN
} from '../constants.jsx';

const initialState = {
    session: null
};

export default function user(state = initialState, action) {
    switch(action.type) {
        case GET_USER_SESSION_TOKEN:
            return {...state,
                session: action.payload
            };
            break;
        default:
            return state;
            break;
    }
}