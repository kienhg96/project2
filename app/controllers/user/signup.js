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
		errCode: 0,
		msg: String, 
		data: {
			user: {
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
	}
	Failed: errCode:
		500: Internal error
		-1: Missing argument/ invalid argument type

*/

const User = require(global.__base + 'app/models/user');
const District = require(global.__base + 'app/models/district');
const utils = require(global.__base  + 'app/utils/index');

let signup = (req, res) => {
	// Check key not exists
	let keys = ['phone', 'email', 'password', 'districtId'];
    let notExists = utils.checkKeysNotExists(req.body, keys);
    if (notExists !== -1) {
        return res.status(400).json({
            errCode: -1, 
            msg: 'Missing argument ' + keys[notExists]
        });
    }
    // Check key NaN
    keys = ['districtId'];
    let keyNaN = utils.checkKeysNaN(req.body, 'districtId');
    if (keyNaN !== -1) {
    	return res.status(400).json({ errCode: -1, msg: 'Argument ' + key[keyNaN] + ' is not a number' });
    }
    // Check mail
    if (!utils.checkMail(req.body.email)) {
    	return res.status(400).json({ errCode: -1, msg: 'Invalid email format' });
    }
    // Check phone
    if (!utils.checkPhone(req.body.phone)) {
    	return res.status(400).json({ errCode: -1, msg: 'Invalid phone format' });
    }
    // Check district exist
    let info = {
    	fullName: req.body.fullName,
    	email: req.body.email,
    	phone: req.body.phone,
    	password: req.body.password,
    	districtId: parseInt(req.body.districtId, 10)
    };
    District.findById(info.districtId, (err, district) => {
    	if (err) {
    		console.error(err);
    		return res.status(500).json({ errCode: 500, msg: 'Internal error' });
    	}
    	if (!district) {
    		return res.status(404).json({ errCode: -2, msg: 'District not found' });
    	}

    	// Check user exist
	    User.findByPhone(info.phone, (err, user) => {
	    	if (err) {
	    		console.error(err);
	    		return res.status(500).json({ errCode: 500, msg: 'Internal error' });
	    	}
	    	if (user) {
	    		return res.status(400).json({ errCode: -2, msg: 'User exists' });
	    	}
	    	User.findByEmail(info.email, (err, user) => {
	    		if (err) {
		    		console.error(err);
		    		return res.status(500).json({ errCode: 500, msg: 'Internal error' });
		    	}
		    	if (user) {
		    		return res.status(400).json({ errCode: -2, msg: 'User exists' });
		    	}

		    	// Create new user
		    	let newUser = new User(info);
		    	// Save to database
		    	newUser.save((err) => {
		    		if (err) {
			    		console.error(err);
			    		return res.status(500).json({ errCode: 500, msg: 'Internal error' });
			    	}

			    	// Response
			    	newUser.toJSON((err, newUserJSON) => {
			    		let resData = { user: newUserJSON };

			    		// Set session
			    		req.session.userId = newUserJSON.userId;
			    		
			    		return res.json({ errCode: 0, msg: 'Success', data: resData })
			    	});
		    	});
	    	});
	    });
    });
};

module.exports = signup;