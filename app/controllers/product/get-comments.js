/*
	GET /api/product/comment
	Request:
		Query: {
			userId: Number,
			productId: Number,
			commentId: Number,
			dateTime: String,
			content: String,
			orderBy: String, ['userId', 'productId', 'commentId', 'dateTime']
			sort: String ['ASC', 'DESC']
		}
	Response: 
		Success: {
			error: "OK",
			message: String,
			data: [{
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
			}]
		}
*/

'use strict';

const errTypes = require(global.__base + 'config/error');
const Comment = require(global.__base + 'models/comment');

module.exports = function(req, res) {
	let page = parseInt(req.query.page, 10);
	if (page === null || page === undefined || isNaN(page)) {
		page = 0;
	}
	Comment.find(req.query, page, (err, comments) => {
		if (err) {
			return res.error(err);
		}
		let result = [];
		let n = comments.length;
		if (n === 0) {
			return res.result(200, errTypes.OK, 'OK', []);
		}
		let count = 0;
		let error = null;
		for (let i = 0; i < n; i++) {
			comments[i].toJSON((err, commentJSON) => {
				if (err) {
					error = err;
				}
				result[i] = commentJSON;
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