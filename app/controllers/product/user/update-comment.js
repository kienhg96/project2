/*
	PUT /api/product/user/comment/:commentId
	Request: 
		Body: {
			content: String
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
			COMMENT_NOT_FOUND
			MISSING_ARGUMENT
*/
'use strict';

const errTypes = require(global.__base + 'config/error');
const Product = require(global.__base + 'models/product');
const Comment = require(global.__base + 'models/comment');
const utils = require(global.__base + 'utils');

module.exports = (req, res) => {
	if (!req.body.content) {
		return res.result(400, errTypes.MISSING_ARGUMENT, 'Missing argument content');
	}
	let commentId = req.params.commentId;
	Comment.findById(commentId, (err, comment) => {
		if (err) {
    		return res.error(err);
    	}
    	if (!comment) {
    		return res.result(404, errTypes.COMMENT_NOT_FOUND, 'Comment not found');
    	}
    	comment.update(req.body.content, (err) => {
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