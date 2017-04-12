/*
	GET /api/admin/logout
	Request:
	Reponse: 
		Error: 
			INTERNAL_ERROR
			IS_NOT_AUTHENTICATED
*/

'use strict';

const errTypes = require(global.__base + 'config/error');

module.exports = (req, res) => {
	req.session.destroy();
	return res.result(200, errTypes.OK, 'OK', {});
};