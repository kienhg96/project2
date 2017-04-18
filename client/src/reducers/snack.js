import { SHOW_SNACK_MESSAGE, CLOSE_SNACK_MESSAGE } from '../actions/snack';

export default (state = {open: false, message: ''}, action) => {
	switch (action.type) {
		case SHOW_SNACK_MESSAGE:
			return {
				open: true,
				message: action.message
			}
		case CLOSE_SNACK_MESSAGE:
			return {
				...state,
				open: false
			}
		default: 
			return state;
	}
}
