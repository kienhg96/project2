/*
	GET /api/product
	Request:
		Query: {
			userId: Number,
			districtId: Number,
			categoryId: Number,
			name: String,
			date: String 'YYYY-MM-DD',
			minPrice: Number,
			maxPrice: Number,
			page: Number, (0, 1, ...)
			orderBy: String, ['userId', 'districtId', 'categoryId', 'name', 'date']
			sort: String, ['ASC', 'DESC']
		}
	Response: 
		Success: [{
			error: "OK",
			message: String,
			data: {
				productId: Number,
				name: String,
				description: String,
				price: Number,
				date: String,
				isSold: Number,
				isVerified: Number,
				images: [String],
				categories: [{
					categoryId: Number,
					name: String
				}],
				user: {
					userId: Number,
					phone: String,
					email: String,
					fullName: String,
					district: {
						districtId: Number,
						name: String,
						city: {
							cityId: Number,
							name: String
						}
					},
					date: String, 'YYYY-MM-DD'
				}
			}
		}]
*/

'use strict';

const errTypes = require(global.__base + 'config/error');
const Product = require(global.__base + 'models/product');

module.exports = function(req, res) {
	let page = parseInt(req.query.page, 10);
	if (page === null || page === undefined || isNaN(page)) {
		page = 0;
	}
	Product.find(req.query, page, (err, products) => {
		if (err) {
			return res.error(err);
		}
		let result = [];
		let n = products.length;
		if (n === 0) {
			return res.result(200, errTypes.OK, 'OK', []);
		}
		let count = 0;
		let error = null;
		for (let i = 0; i < n; i++) {
			products[i].toJSON((err, productJSON) => {
				if (err) {
					error = err;
				}
				result[i] = productJSON;
				count++;
				if (count === n) {
					if (error) {
						return res.error(error);
					}
					return res.result(200, errTypes.OK, 'OK', result);
				}
			});
		}

	});
};