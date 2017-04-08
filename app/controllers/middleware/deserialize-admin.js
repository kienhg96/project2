'use strict';

const errTypes = require(global.__base + 'config/error');
const Admin = require(global.__base + 'models/admin');

let deserializeAdmin = (req, res, next) => {
	let username = req.session.admin;
	if (username === null || username === undefined) {
		req.session.destroy();

		return res.result(400, errTypes.IS_NOT_AUTHENTICATED, 'Admin not logged in yet');
	}
	req.isAuthenticated = true;
	Admin.findByUsername(username, (err, admin) => {
		if (err) {
			return res.error(err);
		}
		if (!admin) {
			return res.error(new Error('Admin not found'));
		}
		req.admin = admin;
		next();
	});
};

module.exports = deserializeAdmin;