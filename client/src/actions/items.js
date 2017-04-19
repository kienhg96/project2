export const SET_ITEMS = 'SET_ITEMS';
import { showSnackMessage } from './snack';
import $ from 'jquery';

export const getItems = () => (dispatch, getState) => {
	$.ajax({
		url: '/api/product',
		type: 'GET',
		success: response => {
			if (response.error === "OK") {
				dispatch({
					type: SET_ITEMS,
					items: response.data
				});
			} else {
				console.log(response);
				dispatch(showSnackMessage("Đã có lỗi xảy ra"));
			}
		},
		error: xhr => {
			let response = null;
			try {
				response = JSON.parse(xhr.responseText);
			} catch (e) {
				console.log(xhr.responseText);
			}
			response && console.log(response);
			dispatch(showSnackMessage("Đã có lỗi xảy ra"));
		}
	});
}
