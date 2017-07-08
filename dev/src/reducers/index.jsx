import { combineReducers } from 'redux';

import app from './app.jsx';
import locale from './locale.jsx';
import user from './user.jsx';
import places from './places.jsx';
import fighters from './fighters.jsx';

export default combineReducers({
    app,
    locale,
    user,
    places,
    fighters
})