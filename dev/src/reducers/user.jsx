import {
    SET_USER_ACCOUNT,
    SET_USER_POSITION,
    SET_USER_TRACKING
} from '../constants.jsx';

const initialState = {
    account: null,
    schedule: [],
    currentPosition: [0, 0],
    allowTracking: true
};

export default function user(state = initialState, action) {
    switch(action.type) {
        case SET_USER_ACCOUNT:
            return {...state,
                account: action.payload
            };
            break;
        case SET_USER_POSITION:
            return {...state,
                currentPosition: action.payload
            };
            break;
        case SET_USER_TRACKING:
            return {...state,
                allowTracking: action.payload
            };
            break;
        default:
            return state;
            break;
    }
}