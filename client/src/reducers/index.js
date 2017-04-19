import { routerReducer } from 'react-router-redux';
import cities from './cities';
import snack from './snack';
import user from './user';
import categories from './categories';
import items from './items';

export default (state = {}, action) => {
	return {
		router: routerReducer(state.router, action),
		snack: snack(state.snack, action),
		cities: cities(state.cities, action),
		user: user(state.user, action),
		categories: categories(state.categories, action),
		items: items(state.items, action)
	};
};
