import {
    SET_APP_PROGRESS,
    SET_APP_NOTIFICATION
} from '../constants.jsx';

export function setAppProgress(value) {
    return {
        type: SET_APP_PROGRESS,
        payload: value
    }
}

export function setAppNotification(o) {
    return {
        type: SET_APP_NOTIFICATION,
        payload: o
    }
}