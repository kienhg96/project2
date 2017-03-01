'use strict';

const User = require(global.__base + 'app/models/user');

let logout = (req, res) => {
	req.session.destroy();
	return res.json({ errCode: 0, msg: 'Success', data: {}});
};

module.exports = logout;