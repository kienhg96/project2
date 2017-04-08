'use strict';

/*
	GET /api/city/cities
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
const errTypes = require(global.__base + 'config/error');

const getCities = (req, res) => {
	City.findAll((err, cities) => {
		if (err) {
			return res.error(err);
		}
		let resData = cities;
		return res.result(200, errTypes.OK, 'OK', resData);
	});
};

module.exports = getCities;