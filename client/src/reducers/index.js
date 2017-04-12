import { routerReducer } from 'react-router-redux';

export default (state = {}, action) => {
	return {
		router: routerReducer(state.router, action)
	};
};