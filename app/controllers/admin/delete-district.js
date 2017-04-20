/*
	POST api/admin/deleteDistrict
	request:
		Body: {
			districtId: int
		}
	response:

*/

const Admin = require(global.__base + 'models/admin');
const errTypes = require(global.__base + 'config/error');

const deleteDistrict = function(req, res){
	let districtId = req.body.districtId;
	Admin.deleteDistrict(districtId, function(err){
		if (err) {
			return res.error(err);
		}

		return res.result(200, errTypes.OK, 'OK');
	})
}

module.exports = deleteDistrict;