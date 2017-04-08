'use strict';

const errTypes = require(global.__base + 'config/error');
const User = require(global.__base + 'models/user');

let deserialize = (req, res, next) => {
	let userId = req.session.userId;
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

module.exports = deserialize;