'use strict';

const path = require('path');
const pool = require(global.__base + 'config/database/mysql');
const moment = require('moment');
const PAGE_LENGTH = 10;

class Report {
	constructor(props) {
		this._productId = props.productId;
		this._reportId = props.reportId;
		this._content = props.content;
		this._date = moment(props.date).format('YYYY-MM-DD') || 
				moment(Date.now()).format('YYYY-MM-DD');

	}

	get reportId() { return this._reportId; }
	get productId() { return this._productId; }
	get content() { return this._content; }
	get date() { return this._date; }

	rawData() {
		return {
			reportId: this._reportId,
			productId: this._productId,
			content: this._content,
			date: this._date
		};
	}

	save(callback) {
		let query = 'INSERT INTO report SET ?';
		pool.query(query, [this.rawData()], (err, result) => {
			if (err) {
				return callback(err);
			}
			this._reportId = result.insertId;
			return callback(null);
		});
	}

	toJSON(callback) {
		return callback(null, this.rawData());
	}

	delete(callback) {
		const query = "DELETE FROM report WHERE reportId = ?";
		pool.query(query, [this._reportId], err => {
			return callback(err);
		});
	} 

	static findById(reportId, callback) {
		let query = 'SELECT * FROM report WHERE reportId = ?';
		pool.query(query, [reportId], (err, rows) => {
			if (err) {
				return callback(err);
			}
			if (!rows[0]) {
				return callback(null, null);
			}
			return callback(null, new Report(rows[0]));
		});
	}

	static findByProductId(productId, page, callback) {
		let query = 'SELECT * FROM report WHERE productId = ? ORDER BY date DESC' +
				' LIMIT ? OFFSET ?';
		pool.query(query, [productId, PAGE_LENGTH, page * PAGE_LENGTH], (err, rows) => {
			if (err) {
				return callback(err);
			}
			let result = [];
			rows.forEach((row) => {
				result.push(new Report(row));
			});
			return callback(null, result);
		});
	}
}

module.exports = Report;