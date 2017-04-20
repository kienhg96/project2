const errTypes = require(global.__base + 'config/error');
const Product = require(global.__base + 'models/product');
const Comment = require(global.__base + 'models/comment');
const utils = require(global.__base + 'utils');
const User = require(global.__base + 'models/user');

module.exports = (req, res) => {
	if (!req.body.productId) {
		return res.result(400, errTypes.MISSING_ARGUMENT, 'Missing argument productId');
	}
	if (!req.body.content) {
		return res.result(400, errTypes.MISSING_ARGUMENT, 'Missing argument content');
	}
	let productId = req.body.productId;
	let userId = User.ANONYMOUS_USER.userId;
	Product.findById(productId, (err, product) => {
		if (err) {
    		return res.error(err);
    	}
    	if (!product) {
    		return res.result(404, errTypes.PRODUCT_NOT_FOUND, 'Product not found');
    	}
    	let info = {
    		productId: productId,
    		userId: userId,
    		content: req.body.content
    	}
    	let comment = new Comment(info);
    	comment.save((err) => {
    		if (err) {
	    		return res.error(err);
	    	}
	    	comment.toJSON((err, commentJSON) => {
	    		if (err) {
		    		return res.error(err);
		    	}
		    	return res.result(200, errTypes.OK, 'OK', commentJSON);
	    	});
    	});
	});
}