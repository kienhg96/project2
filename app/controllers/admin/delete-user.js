/*
	POST api/admin/deleteUser
	request:
		Body: {
			userId: int
		}
	response:

*/
'use strict'

const Admin = require(global.__base + 'models/admin');
const errTypes = require(global.__base + 'config/error');

const deleteUser = function(req, res){

	let userId = req.body.userId;
	Admin.deleteUser(userId, function(err){
		if (err) {
			return res.error(err);
		}
		return res.result(200, errTypes.OK, 'OK');
	});
}

module.exports = deleteUser;