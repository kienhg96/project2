'use strict';

const errTypes = require(global.__base + 'config/error');
const User = require(global.__base + 'models/user');

let isAuthenticated = (req, res, next) => {
	let userId = req.session.userId;
	if (userId === null || userId === undefined) {
		req.session.destroy();

		return res.result(400, errTypes.IS_NOT_AUTHENTICATED, 'User not logged in yet');
	}
	next();
};

module.exports = isAuthenticated;