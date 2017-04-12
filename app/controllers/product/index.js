'use strict';
const getProduct = require('./get-product');
const getProducts = require('./get-products');
const getCategories = require('./get-categories');
const user = require('./user');

module.exports = {
	getProduct: getProduct,
	getProducts: getProducts,
	getCategories: getCategories,
	user: user
};