'use strict';

const request = require('request');

const checkFBAccount = (fbAccessToken, callback) => {
	let url = 'https://graph.facebook.com/me?fields=email,id,first_name,last_name&access_token=' + fbAccessToken;
	request(url, (err, response, body) => {
		if (err) {
			return callback(err);
		}
		if (response.statusCode !== 200) {
			return callback(null, 'FAILED');
		}
		// Parse body
		try {
			body = JSON.parse(body);
		} catch (err) {
			return callback(err);
		}
		if (body.error) {
			return callback(null, 'FAILED');
		}

		return callback(null, 'OK', body);
	});		
};

module.exports = checkFBAccount;