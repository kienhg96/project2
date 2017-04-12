'use strict';

const express = require('express');
const router = express.Router();

const deserializeAdmin = require(global.__base + 'controllers/middleware/deserialize-admin');
const deserializeUser = require(global.__base + 'controllers/middleware/deserialize-user');
const isAuthenticated = require(global.__base + 'controllers/middleware/is-authenticated');
const product = require(global.__base + 'controllers/product');

router.route('/:productId')
	.get(product.getProduct);

module.exports = router;
