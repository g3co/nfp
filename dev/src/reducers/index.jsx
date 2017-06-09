import { combineReducers } from 'redux';
import user from './user.jsx';
import search from './search.jsx';

export default combineReducers({
    user,
    search
})