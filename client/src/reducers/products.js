import { SET_PRODUCTS } from '../actions/products';

export default (state = [], action) => {
	switch (action.type) {
		case SET_PRODUCTS:
			return action.products;
		default:
			return state;
	}
}
