/*
	DELETE /api/product/guestUser
	Body: {
		productKey: String	
	}
	Response: 
		Success: {
			error: 'OK',
			message: String,
			data: {}
		}
		Error: 
			INTERNAL_ERROR
			MISSING_ARGUMENT
			PRODUCT_NOT_FOUND
            WRONG_PRODUCT_KEY
*/

'use strict';

const errTypes = require(global.__base + 'config/error');
const Product = require(global.__base + 'models/product');
const ProductKey = require(global.__base + 'models/redis/product-key');
const Category = require(global.__base + 'models/category');
const utils = require(global.__base + 'utils');

module.exports = (req, res) => {
	if (!req.body.productKey) {
        return res.result(400, errTypes.MISSING_ARGUMENT, 'Missing argument productKey');
    }
    let productId = ProductKey.getProductIdFromKey(req.body.productKey);
    // Check key
    ProductKey.findByProductId(productId, (err, productKey) => {
        if (err) {
            return res.error(err);
        }
        if (!productKey) {
            return res.result(404, errTypes.WRONG_PRODUCT_KEY, 'Wrong product key');
        }
        if (productKey.key !== req.body.productKey) {
        	return res.result(404, errTypes.WRONG_PRODUCT_KEY, 'Wrong product key');
        }
        // Check product
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
    });
};