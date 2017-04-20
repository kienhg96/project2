import { SET_DRAWER_STATUS } from '../actions/leftDrawer';

export default (state = { open: true }, action) => {
	switch (action.type) {
		case SET_DRAWER_STATUS:
			return {
				...state,
				open: action.open
			}
		default:
			return state;
	}
}