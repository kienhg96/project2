'use strict';

const express = require('express');
const router = express.Router();

const city = require(global.__base + 'controllers/city');
const isAuthenticated = require(global.__base + 'controllers/middleware/is-authenticated');

router.route('/')
	.get(isAuthenticated, city.getCities);

module.exports = router;
