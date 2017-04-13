'use strict';
const getProduct = require('./get-product');
const getProducts = require('./get-products');
const getCategories = require('./get-categories');
const getComments = require('./get-comments');
const user = require('./user');

module.exports = {
	getProduct: getProduct,
	getProducts: getProducts,
	getCategories: getCategories,
	getComments: getComments,
	user: user
};