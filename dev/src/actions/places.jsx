import {
    SET_PLACES_NEARBY,
    SET_PLACES_LIST
} from '../constants.jsx';

export function setPlacesNearby(places) {

    return {
        type: SET_PLACES_NEARBY,
        payload: places
    }
}

export function setPlacesList(places) {

    return {
        type: SET_PLACES_LIST,
        payload: places
    }
}