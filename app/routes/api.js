'use strict';

const express = require('express');
const router = express.Router();

const user = require(global.__base + 'app/controllers/user/index');
// User
router.post('/user/signup', user.signup);
router.post('/user/login', user.login);
router.get('/user/logout', user.logout);

module.exports = router;
