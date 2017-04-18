/*
	POST api/admin/deleteComment
	request:
		Body: {
			commentId: int
		}
	response:

*/

const Admin = require(global.__base + 'models/admin');
const errTypes = require(global.__base + 'config/error');

const deleteComment = function(req, res){
	let commentId = req.body.commentId;

	Admin.deleteComment(commentId, function(err){
		if (err) {
			return res.error(err);
		}

		return res.result(200, errTypes.OK, 'OK');
	})
}

module.exports = deleteComment;