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

module.exports = router;
