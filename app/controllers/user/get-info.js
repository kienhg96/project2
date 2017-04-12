/*
	GET /api/user/info
	Response: 
		Success: {
			error: ..
			message: ..
			data: {
				userId: Number,
				phone: String,
				email: String,
				fullName: String,
				district: {
					districtId: Number,
					name: String,
					city: {
						cityId: Number,
						name: String
					}
				},
				date: String, 'YYYY-MM-DD'
			}
			
		}
		Error: 
			INTERNAL_ERROR
			IS_NOT_AUTHENTICATED
*/

'use strict';

const User = require(global.__base + 'models/user');
const utils = require(global.__base + 'utils');
const errTypes = require(global.__base + 'config/error');

let getInfo = (req, res) => {
	req.user.toJSON((err, userJSON) => {
		if (err) {
			return res.error(err);
		}
		return res.result(200, errTypes.OK, 'OK', userJSON);
	});
};

module.exports = getInfo;