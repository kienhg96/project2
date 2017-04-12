const fs = require('fs');

module.exports = (filePath, callback) => {
	fs.unlink(filePath, (err) => {
		if (err) {
			return callback(err);
		}
		return callback(null);
	});
};