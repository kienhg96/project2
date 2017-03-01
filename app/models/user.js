'use strict';

const pool = require(global.__base + 'app/config/database/mysql/pool');
const bcrypt = require('bcrypt-nodejs');
const District = require('./district');

class User {

	constructor(props) {
		this._userId = props.userId;
		this._phone = props.phone;
		this._email = props.email;
		this._fullName = props.fullName;
		this._districtId = props.districtId;
		if (props.encryptedPassword) {
			this._password = props.encryptedPassword;
		} else {
			this._password = bcrypt.hashSync(props.password || "");
		}
	}

	get userId() { return this._userId; }

	get phone() { return this._phone; }

	get email() { return this._email; }

	get fullName() { return this._fullName; }

	get districtId() { return this._districtId; }

	rawData() {
		return {
			userId: this.userId,
			phone: this.phone,
			email: this.email,
			fullName: this.fullName,
			districtId: this.districtId
		};
	}

	save(callback) {
		pool.getConnection((err, conn) => {
			if (err) { return callback(err); }

			let query = 'INSERT INTO user SET ?';
			let user = Object.assign({}, this.rawData(), { password: this._password });
			conn.query(query, [user], (err, result) => {
				if (err) { return callback(err); }

				this._userId = result.insertId;
				callback(null);
			});
		});
	} 

	toJSON(callback) {
		let data = {
			userId: this.userId,
			phone: this.phone,
			email: this.email,
			fullName: this.fullName
		};

		District.findById(this.districtId, (err, district) => {
			if (err) return callback(err);

			if (!district) return callback(null, data);
			
			district.toJSON((err, districtJSON) => {
				data.district = districtJSON;
				return callback(null, data);
			});
		});
	}

	static findById(id, callback) {
		pool.getConnection((err, conn) => {
			if (err) return callback(null);

			let query = 'SELECT * FROM user WHERE userId = ?';
			conn.query(query, [id], (err, rows) => {
				conn.release();
				if (err) return callback(err);

				if (!rows[0]) {
					return callback(null, null);
				}

				let props = Object.assign({}, rows[0], { encryptedPassword: rows[0].password });
				let user = new User(props);
				return callback(null, user);
			});
		});
	}

	static findByPhone(phone, callback) {
		pool.getConnection((err, conn) => {
			if (err) return callback(null);

			let query = 'SELECT * FROM user WHERE phone = ?';
			conn.query(query, [phone], (err, rows) => {
				conn.release();
				if (err) return callback(err);

				if (!rows[0]) {
					return callback(null, null);
				}

				let props = Object.assign({}, rows[0], { encryptedPassword: rows[0].password });
				let user = new User(props);
				return callback(null, user);
			});
		});
	}

	static findByEmail(email, callback) {
		pool.getConnection((err, conn) => {
			if (err) return callback(null);

			let query = 'SELECT * FROM user WHERE email = ?';
			conn.query(query, [email], (err, rows) => {
				conn.release();
				if (err) return callback(err);

				if (!rows[0]) {
					return callback(null, null);
				}

				let props = Object.assign({}, rows[0], { encryptedPassword: rows[0].password });
				let user = new User(props);
				return callback(null, user);
			});
		});
	}

	comparePassword(password) {
		let result;
		try {
			result = bcrypt.compareSync(password, this._password);
		} catch(err) {
			console.error(err);
			return false;
		}
		return result;
	}
}

module.exports = User;
