"use strict";

const express  = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const http = require('http');
const server = http.createServer(app);
const ServerResponse = http.ServerResponse;
const errTypes = require(global.__base + 'config/error');

// Configuring express app
app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(bodyParser.json({ limit: '100mb' }));

// Add `result` function for `res`
ServerResponse.prototype.result = function(status, error, message, data) {
	this.status(status).json({
		error: error,
		message: message,
		data: data
	});
}
// Handler error
ServerResponse.prototype.error = function(error) {
	console.error(error);
	this.status(500).json({
		error: errTypes.INTERNAL_ERROR
	});
}

// Configuring router
const log = require(global.__base + 'controllers/middleware/log');
app.use(log);
const apiRouter = require(global.__base + 'routes/api');
app.use('/api', apiRouter);
app.use('/image', express.static(path.join(global.__base, 'images/')));
app.get('/result', (req, res) => {
	res.result(200, errTypes.OK, "OK", {x: 1});
});	

app.get('/error', (req, res) => {
	res.error('Error');
});

module.exports = server;