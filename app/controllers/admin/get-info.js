/*
	GET /api/admin/getInfoAdmin
	Response: 
		Success: {
			error: ..
			message: ..
			data: {
				userName: String
			}
			
		}
		Error: 
			INTERNAL_ERROR
*/

const Admin = require(global.__base + 'models/admin');
const errTypes = require(global.__base + 'config/error');

let getInfo = function(req, res) {
	req.admin.toJSON(function(err, data) {
		if (err) {
			res.error(err);
		}
		return res.result(200, errTypes.OK, 'OK', data);
	})
}

module.exports = getInfo;