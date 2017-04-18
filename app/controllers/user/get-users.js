/*
	GET /api/admin/getUsers
	Request:
		Query: {
			page: Number, (0, 1, ...)
			userId: Number,
			phone: String,
			email: String,
			districtId: Number,
			cityId: Number,
			district: String,
			city: String,
			name: String,
			date: String 'YYYY-MM-DD'
		}
	Response: 
		Success: {...}
*/

'use strict';

const errTypes = require(global.__base + 'config/error');
const User = require(global.__base + 'models/user');

module.exports = function(req, res) {
	let page = parseInt(req.query.page, 10);
	if (page === null || page === undefined || isNaN(page)) {
		page = 0;
	}
	User.find(req.query, page, (err, users) => {
		if (err) {
			return res.error(err);
		}
		let result = [];
		let n = users.length;
		if (n === 0) {
			return res.result(200, errTypes.OK, 'OK', result);
		}
		let count = 0;
		users.forEach((user, i) => {
			user.toJSON((err, userJSON) => {
				if (err) {
					return res.error(err);
				}
				result[i] = userJSON;
				count++;
				if (count === n) {
					return res.result(200, errTypes.OK, 'OK', result);
				}
			});
		});
	});
};

