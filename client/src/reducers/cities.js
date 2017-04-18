import { SET_CITIES } from '../actions/cities';

export default (state = [], action) => {
	switch (action.type) {
		case SET_CITIES:
			return action.cities
		default:
			return state;
	}
}
