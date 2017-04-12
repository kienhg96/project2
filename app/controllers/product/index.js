'use strict';
const getProduct = require('./get-product');
const getCategories = require('./get-categories');
const user = require('./user');

module.exports = {
	getProduct: getProduct,
	getCategories: getCategories,
	user: user
};