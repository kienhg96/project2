'use strict';

/*
	POST /api/user/login
	Body: {
		username: String,
		password: String
	}
	Response:
	Success: {
		error: OK, 
		message: String,
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
		MISSING_ARGUMENT
		INVALID_ARGUMENT_TYPE
		WRONG_PASSWORD
		USER_NOT_FOUND
*/

const User = require(global.__base + 'models/user');
const utils = require(global.__base + 'utils');
const errTypes = require(global.__base + 'config/error');

let login = (req, res) => {
	// Check key not exists
	let keys = ['username', 'password'];
    let notExists = utils.checkKeysNotExists(req.body, keys);
    if (notExists !== -1) {
        return res.result(400, errTypes.MISSING_ARGUMENT, 'Missing argument ' + keys[notExists]);
    }

    let username = req.body.username;
    let password = req.body.password;
    // Check user exists
    // By phone
    User.findByPhone(username, (err, user) => {
    	if (err) {
    		return res.error(err);
    	}
    	if (user) {
    		if (!user.comparePassword(password)) {
    			// Password mismatch
    			return res.result(401, errTypes.WRONG_PASSWORD, 'Wrong password');
    		} 

    		user.toJSON((err, userJSON) => {
    			if (err) {
		    		return res.error(err);
		    	}

		    	// Set session
		    	req.session.userId = userJSON.userId;
		    	// Response
		    	let resData = userJSON;		    	

		    	return res.result(200, errTypes.OK, 'OK', resData);
    		});
    	} else {
    		// By email
    		User.findByEmail(username, (err, user) => {
    			if (err) {
		    		return res.error(err);
		    	}
		    	if (!user) {
		    		return res.result(404, errTypes.USER_NOT_FOUND, 'User not found');
		    	}

		    	if (!user.comparePassword(password)) {
	    			// Password mismatch
	    			return res.result(401, errTypes.WRONG_PASSWORD, 'Wrong password');
	    		} 
	    		user.toJSON((err, userJSON) => {
	    			if (err) {
			    		return res.error(err);
			    	}
			    	// Set session
			    	req.session.userId = userJSON.userId;
			    	// Response
			    	let resData = userJSON;		    	

			    	return res.result(200, errTypes.OK, 'OK', resData);
	    		});
    		});	
    	}
    });
};

module.exports = login;