import {
    SET_FIGHTERS_NEARBY,
    SET_FIGHTERS_LIST
} from '../constants.jsx';

const initialState = {
    nearby: [],
    list: []
};

export default function fighters(state = initialState, action) {
    switch(action.type) {
        case SET_FIGHTERS_NEARBY:
            return {...state,
                nearby: action.payload
            };
            break;
        case SET_FIGHTERS_LIST:
            return {...state,
                list: action.payload
            };
            break;
        default:
            return state;
            break;
    }
}