/*
	DELETE /api/product/user/comment/:commentId
	Request: 
		Body: {
		}
	Response: 
		Success: {
			error: 'OK',
			message: String,
			data: {}
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
    	comment.remove((err) => {
    		if (err) {
	    		return res.error(err);
	    	}
	    	return res.result(200, errTypes.OK, 'OK', {});
    	});
	});
};