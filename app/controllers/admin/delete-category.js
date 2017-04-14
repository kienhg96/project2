/*
	POST api/admin/deleteCategory
	request:
		Body: {
			categoryId: int
		}
	response:
		CAN_NOT_DELETE_CATEGORY

*/

const Admin = require(global.__base + 'models/admin');
const errTypes = require(global.__base + 'config/error');

const deleteCategory = function(req, res) {
	let categoryId = req.body.categoryId;

	Admin.deleteCategory(categoryId, function(err) {
		if (err) {
			if (err == 'Exist'){
				return res.result(400, 'CAN_NOT_DELETE_CATEGORY', 'Exist some products that are in this category');
			}
			return res.error(err);
		}

		return res.result(200, errTypes.OK, 'OK');
	});
}

module.exports = deleteCategory;