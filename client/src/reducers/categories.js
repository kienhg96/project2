import { SET_CATEGORIES } from '../actions/categories';

export default (state = [], action) => {
	switch (action.type) {
		case SET_CATEGORIES:
			return action.categories;
		default:
			return state;
	}
}
