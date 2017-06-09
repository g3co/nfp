import { combineReducers } from 'redux';

import locale from './locale.jsx';
import user from './user.jsx';
import search from './search.jsx';

export default combineReducers({
    locale,
    user,
    search
})