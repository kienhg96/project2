import { routerReducer } from 'react-router-redux';
import cities from './cities';
import snack from './snack';
import user from './user';
import categories from './categories';
import products from './products';
import page from './page';
import leftDrawer from './leftDrawer';
import filter from './filter';
import loading from './loading';

export default (state = {}, action) => {
	return {
		router: routerReducer(state.router, action),
		snack: snack(state.snack, action),
		cities: cities(state.cities, action),
		user: user(state.user, action),
		categories: categories(state.categories, action),
		products: products(state.products, action),
		page: page(state.page, action),
		leftDrawer: leftDrawer(state.leftDrawer, action),
		filter: filter(state.filter, action),
		loading: loading(state.loading, action)
	};
};
