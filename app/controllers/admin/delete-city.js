/*
	POST api/admin/deleteCity
	request:
		Body: {
			cityId: int
		}
	response:

*/

const Admin = require(global.__base + 'models/admin');
const errTypes = require(global.__base + 'config/error');

const deleteCity = function(req, res){
	let cityId = req.body.cityId;

	Admin.deleteCity(cityId, function(err){
		if (err) {
			return res.error(err);
		}

		return res.result(200, errTypes.OK, 'OK');
	})
}

module.exports = deleteCity;