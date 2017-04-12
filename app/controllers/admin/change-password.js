/*
	POST api/admin/changePassword
	request:
		Body: {
			username: String,
			oldPasswors: String,
			newPassword: String,
			authenicPassword: String
		}
	response:
		Success: {
			error: 'OK',
			msg: String
		}
		Error: 
			MISSING_ARGUMENT
			ADMIN_NOT_FOUND
			WRONG_PASSWORD
*/

'use strict';

const Admin = require(global.__base + 'models/admin');
const errTypes = require(global.__base + 'config/error');
const utils = require(global.__base + 'utils');

const changePassword = function(req, res){
	// check keys not exist
	let keys = ['username', 'oldPassword', 'newPassword', 'authenicPassword'];
    let notExists = utils.checkKeysNotExists(req.body, keys);
    if (notExists !== -1) {
        return res.result(400, errTypes.MISSING_ARGUMENT, 'Missing argument ' + keys[notExists]);
    }
    let username = req.body.username;
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
    let authenicPassword = req.body.authenicPassword;
    // check admin
    Admin.findByUserName(username, function(err, admin){
    	if (err) {
    		return res.error(err);
    	}
    	if (!admin) {
    		return res.result(404, errTypes.ADMIN_NOT_FOUND, 'Admin not found');
    	}
    	if (!admin.comparePassword(oldPassword)) {
    		return res.result(404, errTypes.WRONG_PASSWORD, 'Wrong password');
    	}
    	if (newPassword !== authenicPassword) {
    		return res.result(404, errTypes.WRONG_PASSWORD, 'New password fields are different');
    	}
    	admin.updataPassword(authenicPassword, function(err){
    		if (err) {
    			return res.error(err);
    		}
    		return res.result(200, errTypes.OK, 'OK');
    	});
    });
}

module.exports = changePassword;