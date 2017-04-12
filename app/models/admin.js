'use strict';

const pool = require(global.__base + 'config/database/mysql');
const bcrypt = require('bcrypt-nodejs');

class Admin {

	constructor(props) {
		this._username = props.username;
		if (props.encryptedPassword) {
			this._password = props.encryptedPassword;
		} else {
			this._password = bcrypt.hashSync(props.password || "");
		}
	}

	get username() { return this._username; }

	rawData() {
		return {
			username: this.username
		};
	}

	save(callback) {
		pool.getConnection((err, conn) => {
			if (err) { return callback(err); }

			let query = 'INSERT INTO admin SET ?';
			let info = Object.assign({}, this.rawData(), { password: this._password });
			conn.query(query, [info], (err, result) => {
				conn.release();
				if (err) { return callback(err); }

				return callback(null);
			});
		});
	}

	toJSON(callback) {
		return callback(null, {
			username: this.username
		});
	}

	static findByUsername(username, callback) {
		pool.getConnection((err, conn) => {
			if (err) return callback(null);

			let query = 'SELECT * FROM admin WHERE username = ?';
			conn.query(query, [username], (err, rows) => {
				conn.release();
				if (err) return callback(err);

				if (!rows[0]) {
					return callback(null, null);
				}

				let info = Object.assign({}, rows[0], { encryptedPassword: rows[0].password });
				let admin = new Admin(info);
				return callback(null, admin);
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

	updatePassword(newPassword, callback) {
		this._password = bcrypt.hashSync(newPassword);
		let query = 'UPDATE admin SET password = ? WHERE username = ?';
		pool.query(query, [this._password, this._username], (err, result) => {
			if (err) {
				return callback(err);
			}
			return callback(null);
		});
	}

	static deleteUser(userId, callback) {
		pool.getConnection(function(err, conn){
			if (err) return callback(err);
			let query = 'DELETE FROM user WHERE userId = ?';
			conn.query(query, [userId], function(err, result) {
				conn.release();
				if (err) {
					return callback(err);
				}
				return callback(null);
			});
		});
	}

	static deleteProduct(productId, callback) {
		pool.getConnection(function(err, conn) {
			if (err) {
				return callback(err);
			}

			let query = 'DELETE FROM product WHERE productId = ?';
			conn.query(query, [productId], function(err, result) {
				conn.release();
				if (err){
					return callback(err);
				}
				return callback(null);
			})
		});
	}
}

module.exports = Admin;
