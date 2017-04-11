'use strict';

const District = require(global.__base + 'models/district');
const errTypes = require(global.__base + 'config/error');

const getDistricts = function(req, res){
	District.findAll(function(err, districts){
		if (err) return res.error(err);

		let resData = [];

		if (districts.length == 0) return res.result(200, errTypes.OK, 'OK', resData);

		for(let i = 0; i < districts.length; ++i){
			districts[i].toJSON(function(err, district){
				if (err) return res.error(err);

				resData.push(district);
				if (resData.length == districts.length) return res.result(200, errTypes.OK, 'OK', resData);
			});
		}
	});
}


module.exports = getDistricts;