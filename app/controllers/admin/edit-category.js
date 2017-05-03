const Category = require(global.__base + 'models/category');
const et = require(global.__base + 'config/error');

module.exports = (req, res) => {
	const { categoryId, name } = req.body;
	if (!categoryId) {
		return res.result(400, et.MISSING_ARGUMENT, "Missing categoryId");
	}
	if (!name) {
		return res.result(400, et.MISSING_ARGUMENT, "Missing name");
	}
	Category.update(categoryId, {name}, (err, result) => {
		if (err) {
			return res.error(err);
		}
		return res.result(200, et.OK, "OK", result);
	});
}
