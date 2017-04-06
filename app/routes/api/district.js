'use strict';

const express = require('express');
const router = express.Router();

const districtController = require(global.__base + '/app/controllers/district/index');

router.get('/list', districtController.getList);

module.exports = router;