/*
	POST /api/admin/login
	Request: 
		Body: {
			username: String,
			password: String
		}
	Response: 
		Success: {
			error: 'OK',
			message: String,
			data: {
				username: String
			}
		}
		Error: 
			INTERNAL_ERROR
			MISSING_ARGUMENT
			ADMIN_NOT_FOUND
*/

'use strict';

const Admin = require(global.__base + 'models/admin');
const errTypes = require(global.__base + 'config/error');
const utils = require(global.__base + 'utils');

module.exports = function(req, res) {
	// Check key not exists
	let keys = ['username', 'password'];
    let notExists = utils.checkKeysNotExists(req.body, keys);
    if (notExists !== -1) {
        return res.result(400, errTypes.MISSING_ARGUMENT, 'Missing argument ' + keys[notExists]);
    }
    let username = req.body.username;
    let password = req.body.password;
    // Check admin 
    Admin.findByUsername(username, (err, admin) => {
    	if (err) {
    		return res.error(err);
    	}
    	if (!admin) {
    		return res.result(404, errTypes.ADMIN_NOT_FOUND, 'Admin not found');
    	}
    	admin.toJSON((err, adminJSON) => {
    		if (err) {
	    		return res.error(err);
	    	}
	    	req.session.admin = username;
	    	return res.result(200, errTypes.OK, 'OK', adminJSON);
    	});
    });
};