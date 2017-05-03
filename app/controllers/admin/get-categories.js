const Category = require(global.__base + 'models/Category');
const errTypes = require(global.__base + 'config/error');

module.exports = (req, res) => {
	Category.findAll((err, categories) => {
		if (err) {
			return res.error(err);
		}
		return res.result(200, errTypes.OK, "OK", categories);
	});
}
