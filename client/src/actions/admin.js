import $ from 'jquery';

export const adminLogin = value => (dispatch, getState) => {
	$.ajax({
		url: '/api/admin/login',
		type: 'POST',
		data: value,
		success: response => {
			console.log(response);
		},
		error: xhr => {
			console.log(xhr.responseText);
		}
	});
}
