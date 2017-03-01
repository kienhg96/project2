'use strict';

const login = require('./login');
const logout = require('./logout');
const signup = require('./signup');

let user = {
	login: login,
	logout: logout,
	signup: signup
};

module.exports = user;