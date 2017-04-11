'use strict';

const express = require('express');
const router = express.Router();

const district = require(global.__base + 'controllers/district');

router.route('/')
	.get(district.getDistricts);
	
module.exports = router;