import { SET_PAGES } from '../actions/products';

const DEFAULT_STATE = {
	current: 0,
	total: 0
}

export default (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case SET_PAGES:
			return {
				...state,
				current: action.page
			}
		default:
			return state;
	}
}