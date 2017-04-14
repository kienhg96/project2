/*
	POST /api/product/user/add
	Request: 
		Body: {
			name: String,
			description: String,
			price: Number,
			categoryIdArr: [Number],
			images: [String(Base64)],
			districtId: Number
		}
	Response:
		Success: {
			error: 'OK',
			message: String,
			data: {
				productId: Number,
				name: String,
				description: String,
				price: Number,
				date: String,
				isSold: Number,
				isVerified: Number,
				images: [String],
				categories: {
					categoryId: Number,
					name: String
				},
				district: {
					districtId: Number,
					name: String,
					city: {
						cityId: Number,
						name: String
					}
				},
				user: {
					userId: Number,
					phone: String,
					email: String,
					fullName: String,
					district: {
						districtId: Number,
						name: String,
						city: {
							cityId: Number,
							name: String
						}
					},
					avatar: String,
					date: String, 'YYYY-MM-DD'
				}
			}
		}
		Error:
			INTERNAL_ERROR
			DISTRICT_NOT_FOUND

*/

'use strict';

const errTypes = require(global.__base + 'config/error');
const Product = require(global.__base + 'models/product');
const District = require(global.__base + 'models/district');
const Category = require(global.__base + 'models/category');
const utils = require(global.__base + 'utils');

module.exports = (req, res) => {
	// Check key not exists
	let keys = ['name', 'description', 'price', 'categoryIdArr', 'images', 'districtId'];
    let notExists = utils.checkKeysNotExists(req.body, keys);
    if (notExists !== -1) {
        return res.result(400, errTypes.MISSING_ARGUMENT, 'Missing argument ' + keys[notExists]);
    }
    // Check key NaN
    keys = ['price', 'districtId'];
    let keyNaN = utils.checkKeysNaN(req.body, keys);
    if (keyNaN !== -1) {
        return res.result(400, errTypes.INVALID_ARGUMENT_TYPE, 'Invalid type of argument ' + keys[keyNaN]);
    }
    let info = {
    	userId: req.user.userId,
    	name: req.body.name,
    	description: req.body.description,
    	price: parseInt(req.body.price, 10),
    	districtId: parseInt(req.body.districtId, 10)
    };
    // Check district
    District.findById(info.districtId, (err, district) => {
    	if (err) {
    		return res.error(err);
    	}
    	if (!district) {
    		return res.result(404, errTypes.DISTRICT_NOT_FOUND, 'District not found');
    	}
    	let product = new Product(info);
	    // Save
	    product.save((err) => {
	    	if (err) {
	    		return res.error(err);
	    	}
	    	// Set categories
	    	let categoryIdArr = [];
	    	try {
	    		categoryIdArr = JSON.parse(req.body.categoryIdArr);
	    	} catch(err) {
	    		console.error(err);
	    	}
	    	product.setCategoriesById(categoryIdArr, (err) => {
	    		if (err) {
		    		return res.error(err);
		    	}
		    	// Set images
		    	let images = [];
		    	try {
		    		images = JSON.parse(req.body.images);
		    	} catch (err) {
		    		console.error(err);
		    	}
		    	let n = images.length;
		    	if (n === 0) {
		    		product.toJSON((err, productJSON) => {
		    			if (err) {
		    				return res.error(err);
		    			}
		    			return res.result(200, errTypes.OK, 'OK', productJSON);
		    		});
		    	} else {
		    		let count = 0;
			    	for (let i = 0, n = images.length; i < n; i++) {
			    		product.addImage(images[i], (err) => {
			    			if (err) {
			    				return res.error(err);
			    			}
			    			count++;
			    			if (count == n) {
			    				product.toJSON((err, productJSON) => {
					    			if (err) {
					    				return res.error(err);
					    			}
					    			return res.result(200, errTypes.OK, 'OK', productJSON);
		    					});
			    			}
			    		});
			    	}
		    	}
	    	});
	    });
    });
};