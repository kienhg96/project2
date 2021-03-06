'use strict';

const express = require('express');
const router = express.Router();

const deserializeAdmin = require(global.__base + 'controllers/middleware/deserialize-admin');
const admin = require(global.__base + 'controllers/admin');
const user = require(global.__base + 'controllers/user');

// Authenticate
router.post('/login', admin.login);
router.post('/changePassword', admin.changePassword);
router.post('/deleteUser', admin.deleteUser);
router.post('/deleteProduct', admin.deleteProduct);
router.post('/deleteCity', admin.deleteCity);
router.post('/deleteDistrict', admin.deleteDistrict);
router.post('/deleteCategory', admin.deleteCategory);
router.post('/deleteComment', admin.deleteComment);
router.post('/addCity', admin.addCity);
router.post('/addCategory', admin.addCategory);
router.post('/addDistrict', admin.addDistrict);
router.get('/logout', deserializeAdmin, admin.logout);
router.get('/getReport', deserializeAdmin, admin.getReport);
router.get('/getInfo', deserializeAdmin, admin.getInfo);
router.post('/deleteReport', deserializeAdmin, admin.deleteReport);
router.get('/getUsers', deserializeAdmin, user.getUsers);
router.get('/getCategories', deserializeAdmin, admin.getCategories);
router.post('/editCategory', deserializeAdmin, admin.editCategory);

module.exports = router;
