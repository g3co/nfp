import {
    SET_FIGHTERS_NEARBY,
    SET_FIGHTERS_LIST
} from '../constants.jsx';

export function setFightersNearby(fighters) {

    return {
        type: SET_FIGHTERS_NEARBY,
        payload: fighters
    }
}

export function setFightersList(fighters) {

    return {
        type: SET_FIGHTERS_LIST,
        payload: fighters
    }
}