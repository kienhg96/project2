'use strict';

const express = require('express');
const router = express.Router();

const city = require(global.__base + 'controllers/city');

router.route('/')
	.get(city.getCities);

module.exports = router;
