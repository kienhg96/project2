'use strict';

const errTypes = require(global.__base + 'config/error');

let isAuthenticated = (req, res, next) => {
	let userId = req.session.userId;
	if (userId === null || userId === undefined) {
		let admin = req.session.admin;
		if (admin === null || userId === undefined) {
			req.session.destroy();
			return res.result(400, errTypes.IS_NOT_AUTHENTICATED, 'User not logged in yet');
		} 
		req.isAuthenticated = true;
		next();
	} else {
		req.isAuthenticated = true;
		next();
	}
};

module.exports = isAuthenticated;