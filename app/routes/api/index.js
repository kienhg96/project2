'use strict';

const express = require('express');
const router = express.Router();

const userRouter = require('./user');
const cityRouter = require('./city');

router.use('/user', userRouter);
router.use('/city', cityRouter);

module.exports = router;
