'use strict';

const express = require('express');
const router = express.Router();

const deserializeAdmin = require(global.__base + 'controllers/middleware/deserialize-admin');
const deserializeUser = require(global.__base + 'controllers/middleware/deserialize-user');
const isAuthenticated = require(global.__base + 'controllers/middleware/is-authenticated');
const product = require(global.__base + 'controllers/product');

router.get('/info/:productId', product.getProduct);
router.get('/category', product.getCategories);
router.get('/comment', product.getComments);
router.route('/user')
	.post(deserializeUser, product.user.addProduct)
	.put(deserializeUser, product.user.updateProduct)
	.delete(deserializeUser, product.user.deleteProduct);
router.route('/guestuser')
	.post(product.guestUser.addProduct)
	.put(product.guestUser.updateProduct)
	.delete(product.guestUser.deleteProduct);
router.post('/guestuser/comment/add', product.guestUser.addComment);

router.route('/user/comment')
	.post(deserializeUser, product.user.addComment)
	.put(deserializeUser, product.user.updateComment)
	.delete(deserializeUser, product.user.deleteComment);
router.post('/report', product.reportProduct);
router.route('/')
	.get(product.getProducts);
router.post('/user/comment/add', deserializeUser, product.user.addComment);

module.exports = router;
