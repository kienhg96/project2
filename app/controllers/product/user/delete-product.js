/*
	DELETE /api/product/user/:productId
	Response: 
		Success: {
			error: 'OK',
			message: String,
			data: {}
		}
		Error: 
			INTERNAL_ERROR
			PRODUCT_NOT_FOUND
*/

'use strict';

const errTypes = require(global.__base + 'config/error');
const Product = require(global.__base + 'models/product');
const Category = require(global.__base + 'models/category');
const utils = require(global.__base + 'utils');

module.exports = (req, res) => {
	Product.findById(req.params.productId, (err, product) => {
		if (err) {
    		return res.error(err);
    	}
    	if (!product) {
    		return res.result(404, errTypes.PRODUCT_NOT_FOUND, 'Product not found');
    	}
    	product.remove((err) => {
    		if (err) {
	    		return res.error(err);
	    	}
	    	return res.result(200, errTypes.OK, 'OK', {});
    	});
	});
};