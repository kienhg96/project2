import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import user from './user';
import notifycation from './notifycation';

export default combineReducers({
    routing, user, notifycation
});