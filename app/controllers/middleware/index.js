'use strict';

const deserialize = require('./deserialize');
const isAuthenticated = require('./is-authenticated');

const middleware = {
	deserialize: deserialize,
	isAuthenticated: isAuthenticated
};

module.exports = middleware;