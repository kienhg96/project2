'use strict';

const login = require('./login');
const logout = require('./logout');
const signup = require('./signup');
const getUser = require('./get-user');

let user = {
	login: login,
	logout: logout,
	signup: signup,
	getUser: getUser
};

module.exports = user;