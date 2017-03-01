'use strict';

const pool = require(global.__base + 'app/config/database/mysql/pool');
const City = require('./city');

class District {

	constructor(props) {
		this._districtId = props.districtId;
		this._cityId = props.cityId;
		this._name = props.name;
	}

	get districtId() { return this._districtId; }

	get cityId() { return this._cityId; }

	get name() { return this._name; }

	rawData() {
		return {
			districtId: this.districtId,
			cityId: this.cityId,
			name: this.name
		};
	}

	save(callback) {
		pool.getConnection((err, conn) => {
			if (err) { return callback(err); }

			let query = 'INSERT INTO district SET ?';
			conn.query(query, [this.rawData()], (err, result) => {
				if (err) { return callback(err); }

				this._districtId = result.insertId;
				callback(null);
			});
		});
	} 

	toJSON(callback) {
		let data = {
			districtId: this.districtId,
			name: this.name
		};

		City.findById(this.cityId, (err, city) => {
			if (err) return callback(err);

			if (city) {
				city.toJSON((err, cityJSON) => {
					if (err) return callback(err);

					data.city = cityJSON;
					return callback(null, data);
				});
			} else {
				return callback(null, data);
			}
		});
	}

	static findById(id, callback) {
		pool.getConnection((err, conn) => {
			if (err) return callback(null);

			let query = 'SELECT * FROM district WHERE districtId = ?';
			conn.query(query, [id], (err, rows) => {
				conn.release();
				if (err) return callback(err);

				if (!rows[0]) {
					return callback(null, null);
				}

				let props = Object.assign({}, rows[0]);
				let district = new District(props);
				return callback(null, district);
			});
		});
	}
}

module.exports = City;