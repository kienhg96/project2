import $ from 'jquery';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_PAGES = 'SET_PAGES';
import { showSnackMessage, setLoading } from './snack';
import { push } from 'react-router-redux';

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
			if (response.error === "OK") {
				dispatch(showSnackMessage("Đăng thành công"));
				if (response.data.productKey) {
					dispatch(push(`/productKey/${response.data.productKey}`));
				} else {
					dispatch(push('/'));
				}
			} else {
				console.log(response);
				dispatch(showSnackMessage("Đã có lỗi xảy ra"));
			}
		},
		error: xhr => {
			console.log(xhr.responseText);
			dispatch(showSnackMessage("Đã có lỗi xảy ra"));
		}
	})
}

export const getProducts = (page) => (dispatch, getState) => {
	const filter = getState().filter;
	page = page ? page : 0;
	dispatch({
		type: SET_PAGES,
		page: page
	});
	dispatch(setLoading(true));
	let filterStr = '';
	if (filter.districtId) {
		filterStr += `&districtId=${filter.districtId}`;
	} else if (filter.cityId) {
		filterStr += `&cityId=${filter.cityId}`;
	}
	if (filter.categoryId) {
		filterStr += `&categoryId=${filter.categoryId}`;
	}

	$.ajax({
		url: `/api/product?isSold=0&page=${page}${filterStr}`,
		type: 'GET',
		success: response => {
			if (response.error === "OK") {
				dispatch({
					type: SET_PRODUCTS,
					products: response.data
				});
			} else {
				console.log(response);
				dispatch(showSnackMessage("Đã có lỗi xảy ra"));
			}
			dispatch(setLoading(false));
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
			dispatch(setLoading(false));
		}
	});
}

export const report = value => (dispatch, getState) => {
	$.ajax({
		url: '/api/product/report',
		type: 'POST',
		data: {
			productId: value.productId,
			content: value.content
		},
		success: response => {
			if (response.error === "OK") {
				dispatch(showSnackMessage("Đã gửi báo cáo thành công"));
			} else {
				console.log(response);
				dispatch(showSnackMessage("Đã có lỗi xảy ra"));
			}
		},
		error: xhr => {
			dispatch(showSnackMessage("Đã có lỗi xảy ra"));
			console.log(xhr.responseText);
		}
	});
}
