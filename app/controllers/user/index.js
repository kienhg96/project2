'use strict';

const login = require('./login');
const logout = require('./logout');
const signup = require('./signup');
const getUser = require('./get-user');
const getInfo = require('./get-info');
const updateInfo = require('./update-info');
const getUsers = require('./get-users');
const updatePassword = require('./update-password');

let user = {
	login: login,
	logout: logout,
	signup: signup,
	getUser: getUser,
	getInfo: getInfo,
	updateInfo: updateInfo,
	updatePassword: updatePassword,
	getUsers: getUsers
};

module.exports = user;