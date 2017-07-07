import {
    SET_PLACES_NEARBY,
    SET_PLACES_LIST
} from '../constants.jsx';

const initialState = {
    nearby: [],
    list: []
};

export default function places(state = initialState, action) {
    switch(action.type) {
        case SET_PLACES_NEARBY:
            return {...state,
                nearby: action.payload
            };
            break;
        case SET_PLACES_LIST:
            return {...state,
                list: action.payload
            };
            break;
        default:
            return state;
            break;
    }
}