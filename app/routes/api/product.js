'use strict';

const express = require('express');
const router = express.Router();

const deserializeAdmin = require(global.__base + 'controllers/middleware/deserialize-admin');
const deserializeUser = require(global.__base + 'controllers/middleware/deserialize-user');
const product = require(global.__base + 'controllers/product');

// router.route('/admin/:productId')
// 	.get(product.getProduct)
// 	.post(product.addProduct)
// 	.put(product.updateProduct)
// 	.delete(product.deleteProduct);

module.exports = router;
