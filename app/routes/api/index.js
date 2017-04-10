'use strict';

const express = require('express');
const router = express.Router();
const session = require(global.__base + 'config/session');

const userRouter = require('./user');
const cityRouter = require('./city');
const districtRouter = require('./district');
const adminRouter = require('./admin');

// Set session
router.use(session);

// API
router.use('/user', userRouter);
router.use('/city', cityRouter);
router.use('/district', districtRouter);
router.use('/admin', adminRouter);

module.exports = router;
