'use strict';

/*
	GET /api/city
	Response: 
	Success: {
		error: OK,
		message: String,
		data: [{ 
			cityId: Number,
			name: String
		}]
	}
	Error:
		INTERNAL_ERROR
		IS_NOT_AUTHENTICATED

*/

const City = require(global.__base + 'models/city');
const District = require(global.__base + 'models/district');
const errTypes = require(global.__base + 'config/error');

const getCities = (req, res) => {
	City.findAll((err, cities) => {
		if (err) {
			return res.error(err);
		}
		const resData = [];
		cities.forEach(city => {
			District.findAll({
				cityId: city.cityId
			}, (err, districts) => {
				if (err) {
					return res.error(err);
				}
				resData.push({
					cityId: city.cityId,
					name: city.name,
					districts
				});
				if (resData.length === cities.length) {
					return res.result(200, errTypes.OK, 'OK', resData);
				}
			});
		});
	});
};

module.exports = getCities;