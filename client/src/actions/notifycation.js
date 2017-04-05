import { CLOSE_NOTIFYCATION, SHOW_NOTIFYCATION } from '../constants/actionTypes';

export const closeNotifycation = () => ({
	type: CLOSE_NOTIFYCATION
});

export const showNotifycation = content => ({
	type: SHOW_NOTIFYCATION,
	content
});