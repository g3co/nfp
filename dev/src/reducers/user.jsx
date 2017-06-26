import {
    SET_USER_ACCOUNT
} from '../constants.jsx';

const initialState = {
    account: null,
    schedule: []
};

export default function user(state = initialState, action) {
    switch(action.type) {
        case SET_USER_ACCOUNT:
            return {...state,
                account: action.payload
            };
            break;
        default:
            return state;
            break;
    }
}