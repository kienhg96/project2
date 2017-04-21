import { SET_FILTER } from '../actions/filter';

export default (state = {cityId: 0, districtId: 0, categoryId: 0}, action) => {
	switch (action.type) {
		case SET_FILTER:
			return action.filter;
		default:
			return state;
	}
}
