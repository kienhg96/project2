'use strict';

const login = require('./login');
const logout = require('./logout');
const getUsers = require('./get-users');

module.exports = {
	login: login,
	logout: logout,
	getUsers: getUsers
};