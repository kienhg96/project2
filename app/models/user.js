'use strict';

const path = require('path');
const pool = require(global.__base + 'config/database/mysql');
const moment = require('moment');
const bcrypt = require('bcrypt-nodejs');
const saveBase64 = require(global.__base + 'utils/save-base64');
const imageConfig = require(global.__base + 'config/image');
const randToken = require('rand-token');

const PAGE_LENGTH = 15;
const IMAGE_BASE_PATH = '/image/user/avatar/';
const DEFAULT_IMG = 'default.png';

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
		this._date = moment(props.date).format('YYYY-MM-DD');
		if (props.avatarData) {
			this._tmpAvatar = props.avatarData;
		} else {
			this._avatar = props.avatar;
		}
	}

	get userId() { return this._userId; }
	get phone() { return this._phone; }
	get email() { return this._email; }
	get fullName() { return this._fullName; }
	get districtId() { return this._districtId; }
	get date() { return this._date; }
	get rating() { return this._rating; }
	get avatar() { 
		if (this._avatar) {
			return path.join(IMAGE_BASE_PATH, this._avatar);
		} else {
			return path.join(IMAGE_BASE_PATH, DEFAULT_IMG);
		}
	}

	static get ANONYMOUS_USER() {
		return new User({
			userId: 1
		});
	}

	rawData() {
		return {
			userId: this._userId,
			phone: this._phone,
			email: this._email,
			fullName: this._fullName,
			districtId: this._districtId,
			date: this._date,
			avatar: this._avatar
		};
	}

	setAvatar(avatarData, callback) {
		let fileName = this._userId + '.png';
		let filePath = path.join(imageConfig.userAvatar, fileName);
		saveBase64(filePath, avatarData, (err) => {
			if (err) {
				return callback(err);
			}
			this._avatar = fileName;
			let query = 'UPDATE user SET avatar = ? WHERE userId = ?';
			pool.query(query, [this._avatar, this._userId], (err, result) => {
				if (err) {
					return callback(err);
				}
				return callback(null);
			});
		});
	}

	save(callback) {
		pool.getConnection((err, conn) => {
			if (err) { return callback(err); }

			let query = 'INSERT INTO user SET ?';
			let user = Object.assign({}, this.rawData(), { password: this._password });
			conn.query(query, [user], (err, result) => {
				conn.release();
				if (err) { return callback(err); }

				this._userId = result.insertId;
				if (this._tmpAvatar) {
					this.setAvatar(this._tmpAvatar, (err) => {
						if (err) {
							return callback(err);
						}
						return callback(null);
					});
				} else {
					return callback(null);
				}
			});
		});
	} 

	toJSON(callback) {
		const District = require('./district');

		let data = {
			userId: this.userId,
			phone: this.phone,
			email: this.email,
			fullName: this.fullName,
			date: this.date,
			avatar: this.avatar
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
		let query = 'UPDATE user SET password = ? WHERE userId = ?';
		pool.query(query, [this._password, this._userId], (err, result) => {
			if (err) {
				return callback(err);
			}
			return callback(null);
		});
	}

	updateInfo(info, callback) {
		const District = require('./district');

		if (info.districtId) {
			District.findById(info.districtId, (err, district) => {
				if (err) {
					return callback(err);
				}
				if (!district) {
					delete info.districtId;
				}
				let query = 'UPDATE user SET ? WHERE userId = ?';
				pool.query(query, [info, this._userId], (err, result) => {
					if (err) {
						return callback(err);
					}
					let keys = ['fullName', 'districtId'];
					keys.forEach((key) => {
						if (info[key]) {
							this['_' + key] = info[key];
						}
					});
					return callback(null);
				});
			});
		} else {
			let query = 'UPDATE user SET ? WHERE userId = ?';
			pool.query(query, [info, this._userId], (err, result) => {
				if (err) {
					return callback(err);
				}
				let keys = ['fullName'];
				keys.forEach((key) => {
					if (info[key]) {
						this['_' + key] = info[key];
					}
				});
				return callback(null);
			});
		}
	}

	static find(queryObj, page, callback) {
		let query = 'SELECT user.* FROM user, district, city WHERE district.districtId = user.districtId AND ' +
				' city.cityId = district.cityId AND ';
		let queryList = [];
		let valueList = [];
		if (queryObj.userId) {
			queryList.push(' userId = ? ');
			valueList.push(queryObj.userId);
		}
		if (queryObj.email) {
			queryList.push(' email LIKE ? ');
			valueList.push('%' + queryObj.email + '%');
		}
		if (queryObj.phone) {
			queryList.push(' phone = ? ');
			valueList.push(queryObj.phone);
		}
		if (queryObj.name) {
			queryList.push(' fullName LIKE ? ');
			valueList.push('%' + queryObj.name + '%');
		}
		if (queryObj.date) {
			queryList.push(' date > ? ');
			valueList.push(moment(queryObj.date).format('YYYY-MM-DD'));
		}
		if (queryObj.districtId) {
			queryList.push(' districtId = ? ');
			valueList.push(queryObj.districtId);
		}
		if (queryObj.cityId) {
			queryList.push(' district.cityId = ? ');
			valueList.push(queryObj.cityId);
		}
		if (queryObj.district) {
			queryList.push(' district.name LIKE ? ');
			valueList.push('%' + queryObj.district + '%');
		}
		if (queryObj.city) {
			queryList.push(' city.name LIKE ? ');
			valueList.push('%' + queryObj.city + '%');
		}
		query += queryList.join(' AND ');
		query += ' ORDER BY userId DESC LIMIT ? OFFSET ?';
		valueList.push(PAGE_LENGTH);
		valueList.push(page * PAGE_LENGTH);

		if (queryList.length === 0) {
			query = 'SELECT * FROM user ORDER BY userId DESC LIMIT ? OFFSET ?';
			valueList = [PAGE_LENGTH, page * PAGE_LENGTH];
		}

		pool.query(query, valueList, (err, rows) => {
			if (err) return callback(err);

			let result = [];
			rows.forEach((row) => {
				let info = Object.assign({}, row, { encryptedPassword: row.password });
				result.push(new User(info));
			});
			return callback(null, result);
		});
	}

	static findById(id, callback) {
		pool.getConnection((err, conn) => {
			if (err) return callback(err);

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
			if (err) return callback(err);

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
			if (err) return callback(err);

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

}

module.exports = User;
