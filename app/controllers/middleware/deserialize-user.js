'use strict';

const errTypes = require(global.__base + 'config/error');
const User = require(global.__base + 'models/user');

let deserializeUser = (req, res, next) => {
	let userId = req.session.userId;
	if (userId === null || userId === undefined) {
		req.session.destroy();

		return res.result(400, errTypes.IS_NOT_AUTHENTICATED, 'User not logged in yet');
	}
	req.isAuthenticated = true;
	User.findById(userId, (err, user) => {
		if (err) {
			return res.error(err);
		}
		if (!user) {
			return res.error(new Error('User not found'));
		}
		req.user = user;
		next();
	});
};

module.exports = deserializeUser;