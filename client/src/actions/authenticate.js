import { SET_USER } from '../constants/actionTypes';
import $ from 'jquery';
import { push } from 'react-router-redux';
import { showNotifycation } from './notifycation';

export const login = value => (dispatch, getState) => {
	const { username, password } = value;
	$.ajax({
		url: '/api/user/login',
		type: 'POST',
    	contentType: "application/json",
		data: JSON.stringify({
			username, password
		}),
		success: data => {
			console.log('Success with data', data);
		},
		error: xhr => {
			const data = JSON.parse(xhr.responseText);
			console.log('Error', data);
			dispatch(showNotifycation('Đã xảy ra lỗi'));
		} 
	})
}

export const signup = value => (dispatch, getState) => {
	console.log(value);
}

export const setUser = user => ({
	type: SET_USER,
	user
});