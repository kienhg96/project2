/*
	PUT /api/product/user
	Request: 
		Body: {
            productId: Number,
			name: String,
			description: String,
			price: Number,
			categoryIdArr: [Number],
			imagesAdded: [String(Base64)],
			imagesRemoved: [String] (image name),
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
			PRODUCT_NOT_FOUND
            DISTRICT_NOT_FOUND

*/

'use strict';

const errTypes = require(global.__base + 'config/error');
const District = require(global.__base + 'models/district');
const Product = require(global.__base + 'models/product');
const Category = require(global.__base + 'models/category');
const utils = require(global.__base + 'utils');

module.exports = (req, res) => {
    const user = req.user;
	Product.findById(req.body.productId, (err, product) => {
		if (err) {
    		return res.error(err);
    	}
    	if (!product) {
    		return res.result(404, errTypes.PRODUCT_NOT_FOUND, 'Product not found');
    	}
        if (product.userId !== user.userId) {
            return res.result(403, errTypes.IS_NOT_AUTHENTICATED, 
                    'This product is not belong to you');
        }
    	let info = {};
    	let keys = ['name', 'description', 'price', 'districtId', 'isSold'];
    	for (let i in keys) {
    		if (req.body[keys[i]]) {
	    		info[keys[i]] = req.body[keys[i]];
    		}
    	}
    	try {
    		if (req.body.categoryIdArr) {
    			info.categoryIdArr = JSON.parse(req.body.categoryIdArr);
    		}
    		if (req.body.imagesRemoved) {
    			info.imagesRemoved = JSON.parse(req.body.imagesRemoved);
    		}
    		if (req.body.imagesAdded) {
    			info.imagesAdded = JSON.parse(req.body.imagesAdded);
    		}
    	} catch (err) {
    		console.error(err);
    	}
        if (!info.districtId) {
            product.updateInfo(info, (err) => {
                if (err) {
                    return res.error(err);
                }
                product.toJSON((err, productJSON) => {
                    if (err) {
                        return res.error(err);
                    }
                    res.result(200, errTypes.OK, 'OK', productJSON);
                });
            });
        } else {
            District.findById(info.districtId, (err, district) => {
                if (err) {
                    return res.error(err);
                }
                if (!district) {
                    return res.result(404, errTypes.DISTRICT_NOT_FOUND, 'District not found');
                }
                product.updateInfo(info, (err) => {
                    if (err) {
                        return res.error(err);
                    }
                    product.toJSON((err, productJSON) => {
                        if (err) {
                            return res.error(err);
                        }
                        res.result(200, errTypes.OK, 'OK', productJSON);
                    });
                });
            });
        }
    	
	});

};