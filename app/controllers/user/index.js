'use strict';

const login = require('./login');
const logout = require('./logout');
const signup = require('./signup');
const getUser = require('./get-user');
const test = require('./test');
const test2 = require('./test2');

let user = {
	login: login,
	logout: logout,
	signup: signup,
	getUser: getUser,
	test: test,
	test2: test2
};

module.exports = user;