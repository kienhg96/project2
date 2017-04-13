'use strict';

const pool = require(global.__base + 'config/database/mysql');
const moment = require('moment');
const PAGE_LENGTH = 20;

class Comment {
	constructor(props) {
		this._commentId = props.commentId;
		this._userId = props.userId;
		this._productId = props.productId;
		this._content = props.content;
		this._dateTime = moment(props.dateTime).format('YYYY-MM-DD HH:mm:ss') ||
				moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
	}	

	get commentId() { return this._commentId; }
	get userId() { return this._userId; }
	get productId() { return this._productId; }
	get content() { return this._content; }
	get dateTime() { return this._dateTime; }

	rawData() {
		return {
			commentId: this._commentId,
			userId: this._userId,
			productId: this._productId,
			content: this._content,
			dateTime: this._dateTime
		};
	}

	save(callback) {
		let query = 'INSERT INTO comment SET ?';
		pool.query(query, [this.rawData()], (err, result) => {
			if (err) {
				return callback(err);
			}
			this._commentId = result.insertId;
			return callback(null);
		});
	}

	toJSON(callback) {
		const User = require(global.__base + 'models/user');
		const Product = require(global.__base + 'models/product');

		let data = {
			commentId: this.commentId,
			productId: this.productId,
			content: this.content,
			dateTime: this.dateTime
		};
		User.findById(this.userId, (err, user) => {
			if (err) {
				return callback(err);
			}
			if (user) {
				data.user = {
					userId: user.userId,
					fullName: user.fullName,
					avatar: user.avatar,
					phone: user.phone,
					email: user.email
				};	
			}
			return callback(err, data);
		});
	}

	update(content, callback) {
		let query = 'UPDATE comment SET content = ? WHERE commentId = ?';
		pool.query(query, [content, this._commentId], (err, result) => {
			if (err) {
				return callback(err);
			}
			this._content = content;
			return callback(null);
		});
	}

	remove(callback) {
		let query = 'DELETE FROM comment WHERE commentId = ?';
		pool.query(query, [this._commentId], callback);
	}

	static findById(commentId, callback) {
		let query = 'SELECT * FROM comment WHERE commentId = ?';
		pool.query(query, [commentId], (err, rows) => {
			if (err) {
				return callback(err);
			}
			if (!rows[0]) {
				return callback(null);
			}
			let comment = new Comment(rows[0]);
			return callback(null, comment);
		});
	}

	static findByProductId(productId, page, callback) {
		let query = 'SELECT * FROM comment WHERE productId = ?' +
				' ORDER BY dateTime DESC LIMIT ? OFFSET ?';
		pool.query(query, [productId, PAGE_LENGTH, page * PAGE_LENGTH], (err, rows) => {
			if (err) {
				return callback(err);
			}
			let result = [];
			rows.forEach((row) => {
				result.push(new Comment(row));
			});

			return callback(null, result);
		});
	}

	static findByUserId(userId, page, callback) {
		let query = 'SELECT * FROM comment WHERE userId = ?' +
				' ORDER BY dateTime DESC LIMIT ? OFFSET ?';
		pool.query(query, [userId, PAGE_LENGTH, page * PAGE_LENGTH], (err, rows) => {
			if (err) {
				return callback(err);
			}
			let result = [];
			rows.forEach((row) => {
				result.push(new Comment(row));
			});

			return callback(null, result);
		});
	}

	static find(queryObj, page, callback) {

		let tableList = ['comment'];
		// let joinConditions = [' product.userId = user.userId '];
		let queryList = [];
		let valueList = [];
		if (queryObj.userId) {
			queryList.push(' userId = ? ');
			valueList.push(queryObj.userId);
		}
		if (queryObj.commentId) {
			queryList.push(' commentId = ? ');
			valueList.push(queryObj.commentId);
		}
		if (queryObj.productId) {
			queryList.push(' productId = ? ');
			valueList.push(queryObj.productId);
		}
		if (queryObj.content) {
			queryList.push(' content LIKE ? ');
			valueList.push('%' + queryObj.content + '%');
		}
		if (queryObj.dateTime) {
			queryList.push(' dateTime >= ? ');
			valueList.push(queryObj.dateTime);
		}
		let orderBy = ' commentId ';
		let sort = ' DESC ';
		switch (queryObj.orderBy) {
			case 'productId':
				orderBy = ' productId ';
				break;
			case 'dateTime':
				orderBy = ' dateTime ';
				break;
			case 'userId':
				orderBy = ' userId ';
				break;
			default:
				orderBy = ' commentId ';
		}
		if (queryObj.sort === 'ASC') {
			sort = ' ASC ';
		}

		let query = 'SELECT * FROM ' + 'comment';
		if (queryList.length === 0) {
			query += ' ORDER BY ' + orderBy + sort + ' LIMIT ? OFFSET ?';
		} else {
			query += ' WHERE ' + queryList.join(' AND ') + 
					' ORDER BY ' + orderBy + sort + ' LIMIT ? OFFSET ?';
		}
		valueList.push(PAGE_LENGTH);
		valueList.push(page * PAGE_LENGTH);
		pool.query(query, valueList, (err, rows) => {
			if (err) {
				return callback(err);
			}
			if (!rows[0]) {
				return callback(null, []);
			}
			let result = [];
			let count = 0;
			let n = rows.length;
			rows.forEach((row, i) => {
				let comment = new Comment(row);
				result[i] = comment;
				count++;
				if (count === n) {
					return callback(null, result);
				}
			});
		});
	}

	static removeById(commentId, callback) {
		let query = 'DELETE FROM comment WHERE commentId = ?';
		pool.query(query, [commentId], callback);
	}
}	

module.exports = Comment;