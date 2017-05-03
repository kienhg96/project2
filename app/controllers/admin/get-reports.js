/*
	GET /api/admin/getReport
	Response: 
		Success: {
			error: ..
			message: ..
			data: {
				reportId: int,
				productId: int,
				content: String,
				date: String, 'YYYY-MM-DD'
			}
			
		}
		Error: 
			INTERNAL_ERROR
*/

const Admin = require(global.__base + 'models/admin');
const errTypes = require(global.__base + 'config/error');

let getReport = function(req, res) {
	Admin.getReport(function(err, data) {
		if (err) {
			return res.error(err);
		}
		return res.result(200, errTypes.OK, 'OK', data);
	});
}

module.exports = getReport;