'use strict';

const login = require('./login');
const logout = require('./logout');
const changePassword = require('./change-password');
const deleteUser = require('./delete-user');
const deleteProduct = require('./delete-product');
const searchUser = require('./search-user');
const searchProduct = require('./search-product');

module.exports = {
	login: login,
	logout: logout,
	changePassword: changePassword,
	deleteUser: deleteUser,
	deleteProduct: deleteProduct,
	searchProduct: searchProduct,
	searchUser: searchUser
};