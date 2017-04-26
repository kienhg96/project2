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
	static deleteCity(cityId, callback) {
		pool.getConnection(function(err, conn){
			if (err) {
				return callback(err);
			}

			let query = 'DELETE FROM city WHERE cityId = ?';
			conn.query(query, [cityId], function(err, result) {
				conn.release();
				if (err) {
					return callback(err);
				}

				return callback(null);
			});
		});
	}

	static deleteDistrict(districtId, callback) {
		pool.getConnection(function(err, conn){
			if (err) {
				return callback(err);
			}

			let query = 'DELETE FROM district WHERE districtId = ?';
			conn.query(query, [districtId], function(err, result) {
				conn.release();
				if (err) {
					return callback(err);
				}

				return callback(null);
			});
		});
	}

	static deleteCategory(categoryId, callback) {
		pool.getConnection(function(err, conn) {
			if (err) {
				return callback(err);
			}

			let query = 'SELECT * FROM categorylink WHERE categoryId = ?';
			conn.query(query, [categoryId], function(err, rows) {
				if (err) {
					return callback(err);
				}
				if (rows[0]) {
					return callback('Exist');
				}

				query = 'DELETE FROM category WHERE categoryId = ?';
				conn.query(query, [categoryId], function(err, result) {
					conn.release();
					if (err) {
						return callback(err);
					}

					return callback(null);
				});
			});
		});
	}

	static deleteComment(commentId, callback) {
		pool.getConnection(function(err, conn){
			if (err) {
				return callback(err);
			}

			let query = 'DELETE FROM comment WHERE commentId = ?';
			conn.query(query, [commentId], function(err, result) {
				conn.release();
				if (err) {
					return callback(err);
				}

				return callback(null);
			});
		});
	}

	static addCategory(categoryName, callback) {
		pool.getConnection(function(err, conn) {
			if (err) {
				return callback(err);
			}

			let query = 'SELECT * FROM category WHERE name LIKE ?';
			conn.query(query, [categoryName], function(err, rows) {
				if (err) {
					return callback(err);
				}

				if (rows[0]) {
					return callback('Exist');
				}

				query = 'INSERT INTO category(name) VALUES(?)';
				conn.query(query, [categoryName], function(err, result) {
					conn.release();
					if (err) {
						return callback(err);
					}

					return callback(null);
				});
			});
		});
	}

	static addCity(cityName, callback) {
		pool.getConnection(function(err, conn) {
			if (err) {
				return callback(err);
			}

			let query = 'SELECT * FROM city WHERE name LIKE ?';
			conn.query(query, [cityName], function(err, rows) {
				if (err) {
					return callback(err);
				}

				if (rows[0]) {
					return callback('Exist');
				}

				query = 'INSERT INTO city(name) VALUES(?)';
				conn.query(query, [cityName], function(err, result) {
					conn.release();
					if (err) {
						return callback(err);
					}

					return callback(null);
				});
			});
		});
	}

	static addDistrict(districtName, cityId, callback) {
		pool.getConnection(function(err, conn) {
			if (err) {
				return callback(err);
			}

			let query = 'SELECT * FROM district WHERE name LIKE ? AND cityId = ?';
			conn.query(query, [districtName, cityId], function(err, rows) {
				if (err) {
					return callback(err);
				}

				if (rows[0]) {
					return callback('Exist');
				}

				query = 'SELECT * FROM city WHERE cityId = ?';
				conn.query(query, [cityId], function(err, rows) {
					if (err) {
						return callback(err);
					}
					if (!rows[0]) {
						return callback('not exist');
					}

					query = 'INSERT INTO district(name, cityId) VALUES(?, ?)';
					conn.query(query, [districtName, cityId], function(err, result) {
						conn.release();
						if (err) {
							return callback(err);
						}

						return callback(null);
					});
				});
			});
		});
	}

	static getReport(callback) {
		pool.getConnection(function(err, conn) {
			if (err) {
				return callback(err);
			}
			let query = "SELECT * FROM report";
			conn.query(query, [], function(err, rows) {
				conn.release();
				if (err) {
					return callback(err);
				}
				let results = [];
				rows.forEach(function(row) {
					results.push(Object.assign({}, row));
				});
				return callback(null, results);
			});
		});
	}
}

module.exports = Admin;
