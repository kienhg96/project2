'use strict';

const fs = require('fs');
const path = require('path');

let saveBase64 = (filePath, data, callback) => {
	decodeBase64Image(data, (err, base64) => {
		if (err) {
			return callback(err);
		}
		fs.writeFile(filePath, base64, 'base64', (err) => {
			if (err) {
				return callback(err);
			}
			return callback(null);
		});
	});
};

function decodeBase64Image(dataString, callback) {
	let matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
	let response = {};

	if (!matches) {
		return callback(null, dataString);
	}
	if (matches.length !== 3) {
		return callback(new Error('Invalid input string'));
	}

	response.type = matches[1];
	response.data = new Buffer(matches[2], 'base64');

	return callback(null, response.data);
}

module.exports = saveBase64;