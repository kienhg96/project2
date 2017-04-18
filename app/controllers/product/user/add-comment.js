/*
	POST /api/product/user/comment
	Request: 
		Body: {
			content: String,
			productId: Number
		}
	Response: 
		Success: {
			error: 'OK',
			message: String,
			data: {
				commentId: Number,
				productId: Number,
				content: String,
				dateTime: String, ('YYYY-MM-DD HH:mm:ss')
				user: {
					userId: Number,
					fullName: String,
					phone: String,
					email: String,
					avatar: String
				}
			}
		}
		Error:
			INTERNAL_ERROR
			IS_NOT_AUTHENTICATED
			PRODUCT_NOT_FOUND
			MISSING_ARGUMENT
			INVALID_ARGUMENT_TYPE
*/
'use strict';

const errTypes = require(global.__base + 'config/error');
const Product = require(global.__base + 'models/product');
const Comment = require(global.__base + 'models/comment');
const utils = require(global.__base + 'utils');

module.exports = (req, res) => {
	if (!req.body.productId) {
		return res.result(400, errTypes.MISSING_ARGUMENT, 'Missing argument productId');
	}
	if (!req.body.content) {
		return res.result(400, errTypes.MISSING_ARGUMENT, 'Missing argument content');
	}
	let productId = req.body.productId;
	let userId = req.user.userId;
	Product.findById(productId, (err, product) => {
		if (err) {
    		return res.error(err);
    	}
    	if (!product) {
    		return res.result(404, errTypes.PRODUCT_NOT_FOUND, 'Product not found');
    	}
    	let info = {
    		productId: productId,
    		userId: userId,
    		content: req.body.content
    	}
    	let comment = new Comment(info);
    	comment.save((err) => {
    		if (err) {
	    		return res.error(err);
	    	}
	    	comment.toJSON((err, commentJSON) => {
	    		if (err) {
		    		return res.error(err);
		    	}
		    	return res.result(200, errTypes.OK, 'OK', commentJSON);
	    	});
    	});
	});
};