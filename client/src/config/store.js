import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import combineReducer from '../reducers';
import { routerMiddleware } from 'react-router-redux';
import history from './history';

const router = routerMiddleware(history);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducer, {}, composeEnhancers(
    applyMiddleware(thunk, router)
));

export default store;