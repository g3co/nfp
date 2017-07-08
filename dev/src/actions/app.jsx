import {
    SET_APP_PROGRESS
} from '../constants.jsx';

export function setAppProgress(value) {

    return {
        type: SET_APP_PROGRESS,
        payload: value
    }
}