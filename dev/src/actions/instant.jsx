import {
    SET_INSTANT_INIT
} from '../constants.jsx';

export function write(init) {
    return {
        type: SET_INSTANT_INIT,
        payload: init
    }
}