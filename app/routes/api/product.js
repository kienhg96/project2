'use strict';

const express = require('express');
const router = express.Router();

const deserializeAdmin = require(global.__base + 'controllers/middleware/deserialize-admin');
const deserializeUser = require(global.__base + 'controllers/middleware/deserialize-user');
const isAuthenticated = require(global.__base + 'controllers/middleware/is-authenticated');
const product = require(global.__base + 'controllers/product');

router.route('/info/:productId')
	.get(product.getProduct);

router.route('/category')
	.get(product.getCategories);

router.route('/comment')
	.get(product.getComments);

router.route('/user/add')
	.post(deserializeUser, product.user.addProduct);

router.route('/user/:productId')
	.put(deserializeUser, product.user.updateProduct)
	.delete(deserializeUser, product.user.deleteProduct);

router.route('/')
	.get(product.getProducts);

router.post('/user/comment/add', deserializeUser, product.user.addComment);

router.route('/user/comment/:commentId')
	.put(deserializeUser, product.user.updateComment)
	.delete(deserializeUser, product.user.deleteComment);

	


module.exports = router;
