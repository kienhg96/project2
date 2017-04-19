/*
	POST api/admin/addDistrict
	request:
		Body: {
			districtName: string,
			cityId: int
		}
	response:
		DISTRICT_EXIST
		CITY_NOT_EXIST
*/

const Admin = require(global.__base + 'models/admin');
const errTypes = require(global.__base + 'config/error');

const addDistrict = function(req, res) {
	let districtName = req.body.districtName;
	let cityId = req.body.cityId;

	Admin.addDistrict(districtName, cityId, function(err) {
		if (err) {
			if (err == 'Exist') {
				return res.result(400, 'DISTRICT_EXIST', 'category exists');
			}
			if (err == 'not exist') {
				return res.result(400, 'CITY_NOT_EXIST', 'city does not exist');
			}
			return res.error(err);
		}
		return res.result(200, errTypes.OK, 'OK');
	});
}

module.exports = addDistrict;