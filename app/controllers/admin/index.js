'use strict';

const login = require('./login');
const logout = require('./logout');
const changePassword = require('./change-password');

module.exports = {
	login: login,
	logout: logout,
	changePassword: changePassword
};