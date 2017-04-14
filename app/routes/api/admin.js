'use strict';

const express = require('express');
const router = express.Router();

const deserializeAdmin = require(global.__base + 'controllers/middleware/deserialize-admin');
const admin = require(global.__base + 'controllers/admin');

// Authenticate
router.post('/login', admin.login);
router.post('/changePassword', admin.changePassword);
router.post('/deleteUser', admin.deleteUser);
router.post('/deleteProduct', admin.deleteProduct);
router.post('/deleteCity', admin.deleteCity);
router.post('/deleteDistrict', admin.deleteDistrict);
router.post('/deleteCategory', admin.deleteCategory);
router.get('/logout', deserializeAdmin, admin.logout);

module.exports = router;
