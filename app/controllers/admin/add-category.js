/*
	POST api/admin/addCategory
	request:
		Body: {
			categoryName: string
		}
	response:
		CATEGORY_EXIST
*/

const Admin = require(global.__base + 'models/admin');
const errTypes = require(global.__base + 'config/error');

const addCategory = function(req, res) {
	let categoryName = req.body.categoryName;
	if (!categoryName) {
		return res.result(400, errTypes.MISSING_ARGUMENT, "Missing categoryName");
	}
	Admin.addCategory(categoryName, function(err, result) {
		if (err) {
			if (err == 'Exist') {
				return res.result(400, 'CATEGORY_EXIST', 'category exists');
			}
			return res.error(err);
		}
		return res.result(200, errTypes.OK, 'OK', result);
	});
}

module.exports = addCategory;
