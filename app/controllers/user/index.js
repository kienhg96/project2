'use strict';

const login = require('./login');
const logout = require('./logout');
const signup = require('./signup');
const getInfo = require('./get-info');
const updateInfo = require('./update-info');

let user = {
	login: login,
	logout: logout,
	signup: signup,
	getInfo: getInfo,
	updateInfo: updateInfo
};

module.exports = user;