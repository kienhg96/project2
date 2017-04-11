'use strict';

const pool = require(global.__base + 'config/database/mysql');

class Category {
	constructor(props) {
		this._categoryId = props.categoryId;
		this._name = props.name;		
	}

	get categoryId() { return this._categoryId; }
	get name() { return this._name; }

	rawData() {
		return {
			categoryId: this._categoryId,
			name: this._name
		};
	}

	toJSON(callback) {
		return callback(null, this.rawData());
	}

	save(callback) {
		let query = 'INSERT INTO category SET ?';
		pool.query(query, [this.rawData()], (err, result) => {
			if (err) {
				return callback(err);
			}
			return callback(null);
		});
	}

	setName(name, callback) {
		let query = 'UPDATE category SET name = ?';
		pool.query(query, [name], (err, result) => {
			if (err) {
				return callback(err);
			}
			return callback(null);
		});
	}

	static findById(categoryId, callback) {
		let query = 'SELECT * FROM category WHERE categoryId = ?';
		pool.query(query, [categoryId], (err, rows) => {
			if (err) {
				return callback(err);
			}
			if (!rows[0]) {
				return callback(null, null);
			}
			return callback(null, new Category(rows[0]));
		});
	}

	static findByName(name, callback) {
		let query = 'SELECT * FROM category WHERE name LIKE ?';
		pool.query(query, ['%' + name + '%'], (err, rows) => {
			if (err) {
				return callback(err);
			}
			if (!rows[0]) {
				return callback(null, null);
			}
			return callback(null, new Category(rows[0]));
		});
	}

	static findAll(callback) {
		let query = 'SELECT * FROM category';
		pool.query(query, [name], (err, rows) => {
			if (err) {
				return callback(err);
			}
			let result = [];
			rows.forEach((row) => {
				result.push(new Category(row));
			});
			return callback(null, result);
		});
	}
}

module.exports = Category;