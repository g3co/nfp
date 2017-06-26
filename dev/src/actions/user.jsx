import {
    SET_USER_ACCOUNT
} from '../constants.jsx';

export function setUserAccount(account) {

    return {
        type: SET_USER_ACCOUNT,
        payload: account
    }
}

//helpers
function getCookie(k) {
    let trim = new RegExp(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/, 'g'),
        cookie = {},
        _cookie = document.cookie,
        _kv = _cookie.split(';');

    for(var c in _kv) {
        let _kva = _kv[c].split('='),
            key = _kva[0],
            value = _kva[1];

        key = !!key ? key.replace(trim, '') : false;
        value = !!value ? value.replace(trim, '') : false;

        if(!key && !value) {
            break
        }

        if(k == key) {
            return value
        }

        cookie[key] = value;
    }

    return cookie
}