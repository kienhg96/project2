'use strict';

const express = require('express');
const router = express.Router();

const isAuthenticated = require(global.__base + 'controllers/middleware/is-authenticated');
const deserialize = require(global.__base + 'controllers/middleware/deserialize');
const user = require(global.__base + 'controllers/user');

// Authenticate
router.post('/signup', user.signup);
router.post('/login', user.login);
router.get('/logout', isAuthenticated, deserialize, user.logout);

module.exports = router;
