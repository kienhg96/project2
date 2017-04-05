import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import createLogger from 'redux-logger';
import combineReducer from '../reducers/index';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

const logger = createLogger();
const middlewareRouter = routerMiddleware(hashHistory)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducer, {}, composeEnhancers(
    applyMiddleware(thunk, logger, middlewareRouter)
));

export default store;