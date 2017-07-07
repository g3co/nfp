import { combineReducers } from 'redux';

import locale from './locale.jsx';
import user from './user.jsx';
import places from './places.jsx';
import fighters from './fighters.jsx';

export default combineReducers({
    locale,
    user,
    places,
    fighters
})