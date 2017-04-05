'use strict';

const express = require('express');
const router = express.Router();

const userController = require(global.__base + 'app/controllers/user/index');

// Authenticate
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
// router.get('/test', userController.test);
// router.post('/test', userController.test2);
router.route('/test')
	.get(userController.test)
	.post(userController.test2);
// /api/user/test3/dkhsahd
router.post('/test3/:name', (req, res) => {
	const body = req.body;
	const query = req.query;
	const params = req.params;
	res.json({
		name1: body.name,
		name2: query.name,
		name3: params.name
	});
});
module.exports = router;
