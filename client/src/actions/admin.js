import $ from 'jquery';
import { showSnackMessage } from './snack';
export const SET_ADMIN = 'SET_ADMIN';
export const SET_LOADING = 'SET_LOADING';

export const adminAutoLogin = callback => (dispatch, getState) => {
	$.ajax({
		url: '/api/admin/getInfo',
		type: 'GET',
		success: response => {
			if (response.error === "OK") {
				dispatch({
					type: SET_ADMIN,
					user: response.data
				});
			}
			callback && callback();
		},
		error: xhr => {
			console.log(xhr.responseText);
			callback && callback();
		}
	})
}

export const adminLogin = value => (dispatch, getState) => {
	$.ajax({
		url: '/api/admin/login',
		type: 'POST',
		data: value,
		success: response => {
			if (response.error === "OK") {
				dispatch({
					type: SET_ADMIN,
					user: response.data
				});
			} else {
				console.log(response);
				dispatch(showSnackMessage("Đã có lỗi xảy ra"));
			}
		},
		error: xhr => {
			console.log(xhr.responseText);
			dispatch(showSnackMessage("Đã có lỗi xảy ra"));
		}
	});
}
