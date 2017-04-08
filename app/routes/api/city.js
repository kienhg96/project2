'use strict';

const express = require('express');
const router = express.Router();

const isAuthenticated = require(global.__base + 'controllers/middleware/is-authenticated');
const deserialize = require(global.__base + 'controllers/middleware/deserialize');

const city = require(global.__base + 'controllers/city');

router.route('/')
	.get(isAuthenticated, deserialize, city.getCities);

module.exports = router;
