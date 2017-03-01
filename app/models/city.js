'use strict';

const pool = require(global.__base + '..');

class City {

	constructor(props) {
		this._cityId = props.cityId;
		this._name = props.name;
	}

	get cityId() { return this._cityId; }

	get name() { return this._name; }

	rawData() {
		return {
			cityId: this.cityId,
			name: this.name
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
}

module.exports = City;