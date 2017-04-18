/*
	POST api/admin/addCity
	request:
		Body: {
			cityName: string
		}
	response:
		CITY_EXIST
*/

const Admin = require(global.__base + 'models/admin');
const errTypes = require(global.__base + 'config/error');

const addCity = function(req, res) {
	let cityName = req.body.cityName;

	Admin.addCity(cityName, function(err) {
		if (err) {
			if (err == 'Exist') {
				return res.result(400, 'CITY_EXIST', 'city exists');
			}
			return res.error(err);
		}
		return res.result(200, errTypes.OK, 'OK');
	});
}

module.exports = addCity;
