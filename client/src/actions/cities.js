import $ from 'jquery';

export const SET_CITIES = 'SET_CITIES';

export const getCities = () => (dispatch, getState) => {
	$.get('/api/city', data => {
		dispatch({
			type: SET_CITIES,
			cities: data.data
		});
	});
}
