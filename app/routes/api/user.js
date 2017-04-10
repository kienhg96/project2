'use strict';

const express = require('express');
const router = express.Router();

const deserializeUser = require(global.__base + 'controllers/middleware/deserialize-user');
const user = require(global.__base + 'controllers/user');

// Authenticate
router.post('/signup', user.signup);
router.post('/login', user.login);
router.get('/logout', deserializeUser, user.logout);
router.route('/info')
	.get(deserializeUser, user.getInfo)
	.post(deserializeUser, user.updateInfo);

module.exports = router;
