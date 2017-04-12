/*
	POST /api/user/info
	Request: 
		Body: {
			fullName: String,
			districtId: Int
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

*/

'use strict';

const User = require(global.__base + 'models/user');
const utils = require(global.__base + 'utils');
const errTypes = require(global.__base + 'config/error');

module.exports = function(req, res) {
	let keys = ['fullName', 'districtId'];
	let info = {};
	let count = 0;
	keys.forEach((key) => {
		if (req.body[key]) {
			info[key] = req.body[key];
			count++;
		}
	});
	if (count === 0) {
		return res.result(200, errTypes.OK, 'OK', {});
	}
	req.user.updateInfo(info, (err) => {
		if (err) {
			return res.error(err);
		}
		return res.result(200, errTypes.OK, 'OK', {});
	});
};
