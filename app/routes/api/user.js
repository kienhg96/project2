'use strict';

const express = require('express');
const router = express.Router();

const deserializeUser = require(global.__base + 'controllers/middleware/deserialize-user');
const user = require(global.__base + 'controllers/user');

// Authenticate
router.post('/signup', user.signup);
router.post('/login', user.login);
router.get('/logout', deserializeUser, user.logout);

module.exports = router;
