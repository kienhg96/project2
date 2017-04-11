/*
	POST /api/user/password
	Request: 
		Body: {
			password: String,
			newPassword: String
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
			WRONG_PASSWORD
			IS_NOT_AUTHENTICATED

*/

'use strict';

const User = require(global.__base + 'models/user');
const utils = require(global.__base + 'utils');
const errTypes = require(global.__base + 'config/error');

module.exports = function(req, res) {
	if (!req.body.password) {
		return res.result(404, errTypes.MISSING_ARGUMENT, 'Missing argument password');
	}
	if (!req.body.newPassword) {
		return res.result(404, errTypes.MISSING_ARGUMENT, 'Missing argument newPassword');
	}
	let user = req.user;
	if (!user.comparePassword(req.body.password)) {
		return res.result(401, errTypes.WRONG_PASSWORD, 'Wrong password');
	}
	user.updatePassword(req.body.newPassword, (err) => {
		if (err) {
			return res.error(err);
		}
		return res.result(200, errTypes.OK, 'OK', {});
	});
};
