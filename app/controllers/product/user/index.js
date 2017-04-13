const addProduct = require('./add-product');
const deleteProduct = require('./delete-product');
const updateProduct = require('./update-product');
const addComment = require('./add-comment');
const updateComment = require('./update-comment');
const deleteComment = require('./delete-comment');

module.exports = {
	addProduct: addProduct,
	deleteProduct: deleteProduct,
	updateProduct: updateProduct,
	addComment: addComment,
	updateComment: updateComment,
	deleteComment: deleteComment
};