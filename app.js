'use strict';

require('dotenv').load();
// Base path
global.__base = process.cwd() + '/';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const apiRouter = require(global.__base + 'app/routes/api/index');
const log = require(global.__base + 'app/controllers/middleware/index').log;
// Body parser
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(bodyParser.json({ limit: '100mb' }));

// Routes
app.use('/', log);
app.use('/api', apiRouter);

app.get('/', (req, res) => {
	res.send('OK');
});

const port = process.env.PORT || 8080;
app.listen(8080, () => {
	console.log('Server is listening on port', port);
});