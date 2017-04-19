import $ from 'jquery';

export const addProduct = product => (dispatch, getState) => {
	const user = getState().user;
	let url = '/api/product/guestuser';
	if (user.userId) {
		url = '/api/product/user';
	}
	console.log(product.price);
	console.log("price", parseInt(product.price, 10));
	$.ajax({
		url,
		type: 'POST',
		data: {
			name: product.name,
			description: product.description,
			price: parseInt(product.price, 10),
			districtId: parseInt(product.districtId, 10),
			categoryIdArr: JSON.stringify(product.categoryIdArr),
			images: JSON.stringify(product.images)
		},
		success: response => {
			console.log(response);
		},
		error: xhr => {
			const response = JSON.parse(xhr.responseText);
			console.log(response);
		}
	})
}