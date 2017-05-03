import { SET_ADMIN, SET_LOADING } from '../actions/admin';

const user = (state = {}, action) => {
	switch (action.type) {
		case SET_ADMIN:
			return action.user;
		default:
			return state;
	}
}

export default (state = {}, action) => ({
	user: user(state.user, action),
});
