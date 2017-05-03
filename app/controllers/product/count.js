// Count number of product
const pool = require(global.__base + '/config/database/mysql');

module.exports = (req, res) => {
	pool.query('SELECT COUNT(productId) AS count FROM product', (err, rows) => {
		if (err) {
			res.error(err);
		}
		return res.result(200, "OK", "OK", {
			total: rows[0].count,
			pageLength: 15
		});
	});
}
