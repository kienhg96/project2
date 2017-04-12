'use strict';

const pool = require(global.__base + 'config/database/mysql');

class Category {

	static get OTHER() {
		return {
			categoryId: 1, 
			name: 'Khác'
		};
	}

	static findById(categoryId, callback) {
		let query = 'SELECT * FROM category WHERE categoryId = ?';
		pool.query(query, [categoryId], (err, rows) => {
			if (err) {
				return callback(err);
			}
			if (!rows[0]) {
				return callback(null, Category.OTHER);
			}
			return callback(null, Object.assign({}, rows[0]));
		});
	}

	static findByName(name, callback) {
		let query = 'SELECT * FROM category WHERE name LIKE ?';
		pool.query(query, ['%' + name + '%'], (err, rows) => {
			if (err) {
				return callback(err);
			}
			if (!rows[0]) {
				return callback(null, Category.OTHER);
			}
			return callback(null, Object.assign({}, rows[0]));
		});
	}

	static findAll(callback) {
		let query = 'SELECT * FROM category';
		pool.query(query, [], (err, rows) => {
			if (err) {
				return callback(err);
			}
			let result = [];
			rows.forEach((row) => {
				result.push(Object.assign({}, row));
			});
			return callback(null, result);
		});
	}

	static findByProductId(productId, callback) {
		let query = 'SELECT category.* FROM category, categorylink WHERE ' +
				' category.categoryId = categorylink.categoryId AND productId = ?';
		pool.query(query, [productId], (err, rows) => {
			if (err) {
				return callback(err);
			}
			let result = [];
			rows.forEach((row) => {
				result.push(Object.assign({}, row));
			});
			return callback(null, result);
		});
	}

	static deleteByProductId(productId, callback) {
		let query = 'DELETE FROM categorylink WHERE productId = ?';
		pool.query(query, [productId], callback);
	}
}

module.exports = Category;