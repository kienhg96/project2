import $ from 'jquery';

export const SET_CATEGORIES = 'SET_CATEGORIES';

export const getCategories = () => (dispatch, getState) => {
	$.get('/api/product/category', data => {
		dispatch({
			type: SET_CATEGORIES,
			categories: data.data
		});
	});
}
