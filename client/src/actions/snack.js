export const SHOW_SNACK_MESSAGE = 'SHOW_SNACK_MESSAGE';
export const CLOSE_SNACK_MESSAGE = 'CLOSE_SNACK_MESSAGE';
export const SET_LOADING = 'SET_LOADING';

export const showSnackMessage = message => ({
	type: SHOW_SNACK_MESSAGE,
	message
});

export const closeSnackMessage = () => ({
	type: CLOSE_SNACK_MESSAGE
});

export const setLoading = loading => ({
	type: SET_LOADING,
	loading
});
