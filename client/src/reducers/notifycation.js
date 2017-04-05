import { SHOW_NOTIFYCATION, CLOSE_NOTIFYCATION } from '../constants/actionTypes';

const DEFAULT_STATE = {
	show: false,
	content: ''
};

export default (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case SHOW_NOTIFYCATION:
			return {
				show: true,
				content: action.content
			}
		case CLOSE_NOTIFYCATION:
			return {
				show: false,
				content: ''
			}
		default: 
			return state;
	}
}