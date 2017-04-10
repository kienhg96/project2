"use strict";

// Base directory
global.__base = __dirname + '/app/'; 

require('dotenv').load();
const argv = require('optimist').argv;
const server = require(global.__base + 'config/server');
// require(global.__base + 'config/socket/io');

const port = argv.port || process.env.PORT || 8080;
const host = '0.0.0.0';
server.listen(port, host, () => {
	console.log('Server is listening on %s:%s', server.address().address, server.address().port);
});