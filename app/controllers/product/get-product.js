/*
	GET /api/product/:productId
	Response: 
		Success: {
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
		}

		Error: 
			INTERNAL_ERROR
			INVALID_ARGUMENT_TYPE
			PRODUCT_NOT_FOUND

*/

'use strict';

const errTypes = require(global.__base + 'config/error');
const Product = require(global.__base + 'models/product');

module.exports = function(req, res) {
	let productId = parseInt(req.params.productId, 10);
	if (isNaN(productId)) {
		return res.result(400, errTypes.INVALID_ARGUMENT_TYPE, 'Invalid type of argument productId');
	}
	Product.findById(productId, (err, product) => {
		if (err) {
			return res.error(err);
		}
		if (!product) {
			return res.result(404, errTypes.PRODUCT_NOT_FOUND, 'Product not found');
		}
		product.toJSON((err, productJSON) => {
			if (err) {
				return res.error(err);
			}
			return res.result(200, errTypes.OK, 'OK', productJSON);
		});
	});
};