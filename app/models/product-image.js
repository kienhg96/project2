'use strict';

const pool = require(global.__base + 'config/database/mysql');

class ProductImage {

	static addImage(productId, name, callback) {
		let query = 'INSERT INTO productimage SET ?';
		let info = {
			productId: productId,
			name: name
		};
		pool.query(query, [info], (err, result) => {
			if (err) {
				return callback(err);
			}
			return callback(null);
		});
	}

	static findByProductId(productId, callback) {
		let query = 'SELECT name FROM productimage WHERE productId = ?';
		pool.query(query, [productId], (err, rows) => {
			if (err) {
				return callback(err);
			}
			let result = [];
			rows.forEach((row) => {
				result.push(row.name);
			});
			return callback(null, result);
		});
	}

	static deleteImage(productId, imgName, callback) {
		let query = 'DELETE FROM productimage WHERE productId = ? AND name = ?';
		pool.query(query, [productId, imgName], callback);
	}

	static deleteImages(productId, callback) {
		let query = 'DELETE FROM productimage WHERE productId = ?';
		pool.query(query, [productId], callback);
	}

};

module.exports = ProductImage;