/*
	POST /api/product/report
	Body: {
		productId: Number,
		content: String
	}
	Response: 
		Success: {
			error: "OK",
			message: String,
			data: {
				reportId: Number,
				productId: Number,
				content: String,
				date: String
			}

		Error: 
			INTERNAL_ERROR
			MISSING_ARGUMENT
			PRODUCT_NOT_FOUND

*/

'use strict';

const errTypes = require(global.__base + 'config/error');
const Product = require(global.__base + 'models/product');
const Report = require(global.__base + 'models/report');

module.exports = function(req, res) {
	if (!req.body.productId) {
		return res.result(400, errTypes.MISSING_ARGUMENT, 'Missing argument productId');
	}
	if (!req.body.content) {
		return res.result(400, errTypes.MISSING_ARGUMENT, 'Missing argument content');
	}
	Product.findById(req.body.productId, (err, product) => {
		if (err) {
			return res.error(err);
		}
		if (!product) {
			return res.result(404, errTypes.PRODUCT_NOT_FOUND, 'Product not found');
		}
		let report = new Report({
			productId: product.productId,
			content: req.body.content
		});
		report.save((err) => {
			if (err) {
				return res.error(err);
			}
			report.toJSON((err, reportJSON) => {
				if (err) {
					return res.error(err);
				}
				return res.result(200, errTypes.OK, 'OK', reportJSON);
			});
		});
	});
};