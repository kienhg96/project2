'use strict';

const City = require(global.__base + '/app/models/city');

let getList = function(req, res){

		let list = [];

		City.showAllList(function(err, cities){
			if (err){
				return res.status(500).json({ errCode: 500, msg: 'Internal Error'});
			}

			if (cities.length == 0){
				return res.status(200).json({ errCode: 200, msg: 'Success', data: list});
			}

			for(let i = 0; i < cities.length; ++i){
				cities[i].toJSON(function(err, city){
					if (err){
						return res.status(500).json({ errCode: 500, msg: 'Internal Error'});
					}

					list.push(city);
					if (list.length == cities.length){
						return res.status(200).json({ errCode: 200, msg: 'Success', data: list});
					}
				});
			}
		});
	};

module.exports = getList;