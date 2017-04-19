import $ from 'jquery';
import { showSnackMessage } from './snack';
import { push } from 'react-router-redux';

export const SET_USER = 'SET_USER';

export const signup = info => (dispatch, getState) => {
	$.ajax({
		url: '/api/user/signup',
		type: 'POST',
		data: info,
		success: data => {
			dispatch(showSnackMessage('Đăng ký thành công'));
			dispatch(push('/login'));
		},
		error: xhr => {
			const response = JSON.parse(xhr.responseText);
			if (response.error === "USER_EXISTS") {
				dispatch(showSnackMessage('Email hoặc SĐT đã tồn tại'));
			} else {
				console.log(response);
				dispatch(showSnackMessage('Đã xảy ra lỗi, vui lòng thử lại sau'));
			}
		}
	})
}

export const login = info => (dispatch, getState) => {
	$.ajax({
		url: '/api/user/login',
		type: 'POST',
		data: {
			username: info.username,
			password: info.password
		},
		success: data => {
			if (data.error === "OK") {
				dispatch(showSnackMessage('Đăng nhập thành công'));
				dispatch({
					type: SET_USER,
					user: data.data
				});
				dispatch(push('/'));
			} else {
				console.log(data);
				dispatch(showSnackMessage('Đã xảy ra lỗi, vui lòng thử lại sau'));
			}
		},
		error: xhr => {
			const response = JSON.parse(xhr.responseText);
			console.log(response);
			if (response.error === "WRONG_PASSWORD") {
				dispatch(showSnackMessage('Mật khẩu không đúng'));
			} else if (response.error === "USER_NOT_FOUND") {
				dispatch(showSnackMessage('Tài khoản không tồn tại'));
			}  else {
				dispatch(showSnackMessage('Đã xảy ra lỗi, vui lòng thử lại sau'));
			}
		}
	});
}

export const loadUser = (callback) => (dispatch, getState) => {
	$.ajax({
		url: '/api/user/info',
		type: 'GET',
		success: data => {
			if (data.error === "OK") {
				dispatch({
					type: SET_USER,
					user: data.data
				});
				callback && callback();
			} else {
				callback && callback();
			}
		},
		error: xhr => {
			callback && callback();
		}
	})
}

export const logout = () => (dispatch, getState) => {
	$.ajax({
		url: '/api/user/logout',
		type: 'GET',
		success: data => {
			dispatch({
				type: SET_USER,
				user: {}
			});
			dispatch(showSnackMessage('Đã đăng xuất'));
		},
		error: xhr => {
			dispatch({
				type: SET_USER,
				user: {}
			});
			dispatch(showSnackMessage('Đã đăng xuất'));
		}
	});
}