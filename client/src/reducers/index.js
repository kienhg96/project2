import { routerReducer } from 'react-router-redux';
import cities from './cities';
import snack from './snack';
import user from './user';

export default (state = {}, action) => {
	return {
		router: routerReducer(state.router, action),
		snack: snack(state.snack, action),
		cities: cities(state.cities, action),
		user: user(state.user, action),
	};
};
