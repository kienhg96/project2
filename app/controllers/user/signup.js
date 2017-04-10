'use strict';

/*
	POST: /api/user/signup
	Body: {
		phone: String,
		email: String,
		password: String,
		districtId: Number
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
			}
		}
	}
	Error: 
		INTERNAL_ERROR
		MISSING_ARGUMENT
		INVALID_ARGUMENT_TYPE
		USER_EXISTS
		DISTRICT_NOT_FOUND
*/

const User = require(global.__base + 'models/user');
const District = require(global.__base + 'models/district');
const utils = require(global.__base  + 'utils');
const errTypes = require(global.__base + 'config/error');

let signup = (req, res) => {
	// Check key not exists
	let keys = ['phone', 'email', 'password', 'districtId'];
    let notExists = utils.checkKeysNotExists(req.body, keys);
    if (notExists !== -1) {
        return res.result(400, errTypes.MISSING_ARGUMENT, 'Missing argument ' + keys[notExists]);
    }
    // Check key NaN
    keys = ['districtId'];
    let keyNaN = utils.checkKeysNaN(req.body, 'districtId');
    if (keyNaN !== -1) {
        return res.result(400, errTypes.INVALID_ARGUMENT_TYPE, 'Invalid type of argument ' + keys[keyNaN]);
    }
    // Check mail
    if (!utils.checkMail(req.body.email)) {
        return res.result(400, errTypes.INVALID_ARGUMENT_TYPE, 'Invalid type of argument email');
    }
    // Check phone
    if (!utils.checkPhone(req.body.phone)) {
        return res.result(400, errTypes.INVALID_ARGUMENT_TYPE, 'Invalid type of argument phone');
    }
    // Check district exist
    let info = {
    	fullName: req.body.fullName,
    	email: req.body.email,
    	phone: req.body.phone,
    	password: req.body.password,
    	districtId: parseInt(req.body.districtId, 10),
    	date: Date.now()
    };
    District.findById(info.districtId, (err, district) => {
    	if (err) {
    		return res.error(err);
    	}
    	if (!district) {
    		return res.result(404, errTypes.DISTRICT_NOT_FOUND, 'District not found');
    	}
    	// Check user exist
	    User.findByPhone(info.phone, (err, user) => {
	    	if (err) {
	    		return res.error(err);
	    	}
	    	if (user) {
    			return res.result(400, errTypes.USER_EXISTS, 'User already exists');
	    	}
	    	User.findByEmail(info.email, (err, user) => {
	    		if (err) {
	    			return res.error(err);
		    	}
		    	if (user) {
		    		return res.result(400, errTypes.USER_EXISTS, 'User already exists');
		    	}
		    	// Create new user
		    	let newUser = new User(info);
		    	// Save to database
		    	newUser.save((err) => {
		    		if (err) {
			    		return res.error(err);
			    	}
			    	// Response
			    	newUser.toJSON((err, newUserJSON) => {
			    		let resData = newUserJSON;
			    		// Set session
			    		req.session.userId = newUserJSON.userId;
			    		
			    		return res.result(200, errTypes.OK, 'OK', resData);
			    	});
		    	});
	    	});
	    });
    });
};

module.exports = signup;