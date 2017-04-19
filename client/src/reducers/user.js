import { SET_USER } from '../actions/authenticate';

export default (state = {}, action) => {
	switch (action.type) {
		case SET_USER:
			return action.user;
		default:
			return state;
	}
}