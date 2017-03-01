'use strict';

const express = require('express');
const router = express.Router();
const session = require(global.__base + 'app/config/session/session');

const userRouter = require('./user');
const cityRouter = require('./city');


// Set session
router.use(session);

// API
router.use('/user', userRouter);
router.use('/city', cityRouter);
// Test
const middleware = require(global.__base + 'app/controllers/middleware/index');
const test = require(global.__base + 'app/controllers/test/test');
router.get('/test', middleware.isAuthenticated, middleware.deserialize, test);

module.exports = router;
