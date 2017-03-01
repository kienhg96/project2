'use strict';

let test = (req, res) => {
	let user = req.user;
	user.toJSON((err, userJSON) => {
		return res.json({ errCode: 0, msg: 'Success', data: { user: userJSON }});
	});	
	
};

module.exports = test;