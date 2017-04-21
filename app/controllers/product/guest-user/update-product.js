/*
	PUT /api/product/guestUser
	Request: 
		Body: {
            productKey: String,
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
                    date: String, 'YYYY-MM-DD'
                },
                productKey: String
            }
		}
		Error:
			INTERNAL_ERROR
            MISSING_ARGUMENT
			PRODUCT_NOT_FOUND
            DISTRICT_NOT_FOUND
            WRONG_PRODUCT_KEY

*/

'use strict';

const errTypes = require(global.__base + 'config/error');
const Product = require(global.__base + 'models/product');
const District = require(global.__base + 'models/district');
const ProductKey = require(global.__base + 'models/redis/product-key');
const Category = require(global.__base + 'models/category');
const utils = require(global.__base + 'utils');

module.exports = (req, res) => {
    if (!req.body.productKey) {
        return res.result(400, errTypes.MISSING_ARGUMENT, 'Missing argument productKey');
    }
    let productId = ProductKey.getProductIdFromKey(req.body.productKey);
    // Check key
    ProductKey.findByProductId(productId, (err, productKey) => {
        if (err) {
            return res.error(err);
        }
        if (!productKey) {
            return res.result(404, errTypes.WRONG_PRODUCT_KEY, 'Wrong product key');
        }
        if (productKey.key !== req.body.productKey) {
            return res.result(404, errTypes.WRONG_PRODUCT_KEY, 'Wrong product key');
        }
        // Check product
        Product.findById(productId, (err, product) => {
            if (err) {
                return res.error(err);
            }
            if (!product) {
                return res.result(404, errTypes.PRODUCT_NOT_FOUND, 'Product not found');
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
                        productJSON.productKey = productKey.key;
                        return res.result(200, errTypes.OK, 'OK', productJSON);
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
                            productJSON.productKey = productKey.key;
                            return res.result(200, errTypes.OK, 'OK', productJSON);
                        });
                    });
                });
            }
        });
    });
};