'use strict';

const pool = require(global.__base + 'app/config/database/mysql/pool');

class City {

	constructor(props) {
		this._cityId = props.cityId;
		this._name = props.name;
	}

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

	static showAllList(callback){
		pool.getConnection(function(err, conn){
			if (err) return callback(null);

			let query = 'SELECT * FROM city';
			conn.query(query, function(err, rows){
				conn.release();
				if (err) return callback(err);

				let cities = [];
				for(let i = 0; i < rows.length; ++i){
					let props = Object.assign({}, rows[i]);
					let city = new City(props);
					cities.push(city);
				}
				return callback(null, cities);
			});
		});
	}
}

module.exports = City;