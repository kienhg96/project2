'use strict';

const express = require('express');
const router = express.Router();

const deserializeUser = require(global.__base + 'controllers/middleware/deserialize-user');
const deserializeAdmin = require(global.__base + 'controllers/middleware/deserialize-admin');
const user = require(global.__base + 'controllers/user');

// Authenticate
router.post('/signup', user.signup);
router.post('/login', user.login);
router.get('/logout', deserializeUser, user.logout);
router.route('/info')
	.get(deserializeUser, user.getInfo)
	.put(deserializeUser, user.updateInfo);
router.put('/password', deserializeUser, user.updatePassword);

router.route('/')
	.get(deserializeAdmin, user.getUsers);

module.exports = router;
