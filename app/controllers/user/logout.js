/*
	GET /api/user/logout
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

const errTypes = require(global.__base + 'config/error');

let logout = (req, res) => {
	req.session.destroy();
	return res.result(200, errTypes.OK, 'OK', {});
};

module.exports = logout;