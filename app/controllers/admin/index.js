'use strict';

const login = require('./login');
const logout = require('./logout');
const changePassword = require('./change-password');
const deleteUser = require('./delete-user');
const deleteProduct = require('./delete-product');
const deleteCity = require('./delete-city');
const deleteDistrict = require('./delete-district');
const deleteCategory = require('./delete-category');
const deleteComment = require('./delete-comment');
const addCity = require('./add-city');
const addDistrict = require('./add-district');
const addCategory = require('./add-category');
const searchUser = require('./search-user');
const searchProduct = require('./search-product');
const getReport = require('./get-reports');
const getInfo = require('./get-info');

module.exports = {
	login: login,
	logout: logout,
	changePassword: changePassword,
	deleteUser: deleteUser,
	deleteProduct: deleteProduct,
	deleteCity: deleteCity,
	deleteDistrict: deleteDistrict,
	deleteCategory: deleteCategory,
	deleteComment: deleteComment,
	addCity: addCity,
	addDistrict: addDistrict,
	addCategory: addCategory,
	searchProduct: searchProduct,
	searchUser: searchUser,
	getReport: getReport,
	getInfo: getInfo,
	deleteReport: require('./delete-report'),
	getCategories: require('./get-categories'),
	editCategory: require('./edit-category')
};
