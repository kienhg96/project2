/*
	POST api/admin/deleteProduct
	request:
		Body: {
			productId: int
		}
	response:

*/
'use strict'

const Admin = require(global.__base + 'models/admin');
const errTypes = require(global.__base + 'config/error');

const deleteProduct = function(req, res){

	let productId = req.body.productId;

	Admin.deleteProduct(productId, function(err){
		if (err){
			return res.error(err);
		}
		return res.result(200, errTypes.OK, 'OK');
	});

}

module.exports = deleteProduct;