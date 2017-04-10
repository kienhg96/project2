'use strict';

const log = require('./log');
const deserializeUser = require('./deserialize-user');
const deserializeAdmin = require('./deserialize-admin');

const middleware = {
	log: log,
	deserializeUser: deserializeUser,
	deserializeAdmin: deserializeAdmin
};

module.exports = middleware;