/*
	PUT /api/product/user/:productId
	Request: 
		Body: {
			name: String,
			description: String,
			price: Number,
			categoryIdArr: [Number],
			imagesAdded: [String(Base64)],
			imagesRemoved: [String] (image name)
		}
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
    	let info = {};
    	let keys = ['name', 'description', 'price'];
    	for (let i in keys) {
    		if (req.body[keys[i]]) {
	    		info[keys[i]] = req.body[keys[i]];
    		}
    	}
    	try {
    		if (req.body.categoryIdArr) {
    			info.categoryIdArr = JSON.parse(req.body.categoryIdArr);
    		}
    		if (req.body.imagesRemoved) {
    			info.imagesRemoved = JSON.parse(req.body.imagesRemoved);
    		}
    		if (req.body.imagesAdded) {
    			info.imagesAdded = JSON.parse(req.body.imagesAdded);
    		}
    	} catch (err) {
    		console.error(err);
    	}
    	product.updateInfo(info, (err) => {
    		if (err) {
    			return res.error(err);
    		}
    		product.toJSON((err, productJSON) => {
    			if (err) {
	    			return res.error(err);
	    		}
	    		res.result(200, errTypes.OK, 'OK', productJSON);
    		});
    	});
	});

};