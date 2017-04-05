'use strict';

const express = require('express');
const router = express.Router();

const cityController = require(global.__base + 'app/controllers/city/index');

router.get('/list', cityController.getList);

module.exports = router;
