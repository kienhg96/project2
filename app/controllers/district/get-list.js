'use strict';

const District = require(global.__base + '/app/models/district');

let getList = function(req, res){

	let list = [];

	District.showAllList(function(err, districts){
		if (err){
			return res.status(500).json({ errCode: 500, msg: 'Internal Error'});
		}

		if (districts.length == 0){
			return res.status(200).json({ errCode: 0, msg: 'Success', data: list});
		}

		for(let i = 0; i < districts.length; ++i){
			districts[i].toJSON(function(err, district){
				if (err){
					return res.status(500).json({ errCode: 500, msg: 'Internal Error'});
				}

				list.push(district);

				if (list.length == districts.length){
					return res.status(200).json({ errCode: 0, msg: 'Success', data: list});
				}
			});
		}
	});
};

module.exports = getList;