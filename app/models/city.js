'use strict';

const pool = require(global.__base + 'config/database/mysql');

class City {

	constructor(props) {
		this._cityId = props.cityId;
		this._name = props.name;
	}

<<<<<<< HEAD
=======
	get cityId() { return this._cityId; }
	get name() { return this._name; }

>>>>>>> 37ee1a09d14b0e18c4ce291d6d254a1224365cbe
	rawData() {
		return {
			cityId: this._cityId,
			name: this._name
		};
	}

	save(callback) {
		pool.getConnection((err, conn) => {
			if (err) { return callback(err); }

			let query = 'INSERT INTO city SET ?';
			conn.query(query, [this.rawData()], (err, result) => {
				if (err) { return callback(err); }

				this._cityId = result.insertId;
				callback(null);
			});
		});
	} 

	toJSON(callback) {
		return callback(null, {
			cityId: this._cityId,
			name: this._name
		});
	}

	static findById(id, callback) {
		pool.getConnection((err, conn) => {
			if (err) return callback(null);

			let query = 'SELECT * FROM city WHERE cityId = ?';
			conn.query(query, [id], (err, rows) => {
				conn.release();
				if (err) return callback(err);

				if (!rows[0]) {
					return callback(null, null);
				}

				let props = Object.assign({}, rows[0]);
				let city = new City(props);
				
				return callback(null, city);
			});
		});
	}

	static findAll(callback) {
		pool.getConnection((err, conn) => {
			if (err) {
				return callback(err);
			}
			let query = 'SELECT * FROM city';
			pool.query(query, [], (err, rows) => {
				conn.release();
				if (err) {
					return callback(err);
				}
				let cities = [];
				rows.forEach((row, i) => {
					cities.push({
						cityId: row.cityId,
						name: row.name
					});
				});
				return callback(null, cities);
			});
		});
	}
}

module.exports = City;