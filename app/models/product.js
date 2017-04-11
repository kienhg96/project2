'use strict';

const path = require('path');
const pool = require(global.__base + 'config/database/mysql');
const IMAGE_BASE_PATH = '/image/product/';
const moment = require('moment');
const saveBase64 = require(global.__base + 'utils/save-base64');
const imageConfig = require(global.__base + 'config/image');

class Product {

	constructor(props) {
		this._productId = props.productId;
		this._name = props.name;
		this._description = props.description || '';
		this._price = props.price || 0;
		this._date = moment(props.date).format('YYYY-MM-DD');
		this._isSold = props.isSold || 0;
		this._isVerified = props.isVerified || 0;
		this._userId = props.userId;
		this._images = props.images || [];
		this._categories = props.categories || [];
	}

	get productId() { return this._productId; }
	get name() { return this._name; }
	get description() { return this._description; }
	get date() { return this._date; }
	get price() { return this._price; }
	get isSold() { return this._isSold; }
	get isVerified() { return this._isVerified; }
	get userId() { return this._userId; }
	get images() { 
		let result = [];
		images.forEach((imgName) => {
			result.push(IMAGE_BASE_PATH + this._productId + '/' + imgName);
		});
		return result;
	}
	get categories() { return this._categories; }

	set images(images) {
		this._images = images;
	}
	set categories(categories) {
		this._categories = categories;
	}

	rawData() {
		return {
			productId: this._productId,
			name: this._name,
			description: this._description,
			price: this._price,
			date: this._date,
			isSold: this._isSold,
			isVerified: this._isVerified,
			userId: this._userId
		};
	}

	save(callback) {
		let query = 'INSERT INTO product SET ?';
		pool.query(query, [this.rawData()], (err, result) => {
			if (err) {
				return callback(err);
			}
			return callback(null);
		}); 
	}

	toJSON(callback) {
		const User = require(global.__base + 'models/user');

		let data = {
			productId: this.productId,
			name: this.name,
			description: this.description,
			price: this.price,
			date: this.date,
			isSold: this.isSold,
			isVerified: this.isVerified,
			images: this.images,
			categories: this.categories
		};
		User.findById(this._userId, (err, user) => {
			if (err) {
				return callback(err);
			}
			if (!user) {
				return callback(null, data);
			}
			user.toJSON((err, userJSON) => {
				if (err) {
					return callback(err);
				}
				data.user = userJSON;
				return callback(null, data);
			});
		}); 
	}	

	addImage(imageData, callback) {
		const ProductImage = require(global.__base + 'models/product-image');

		let imageName = (this._images.length + 1) + '.png';
		let filePath = path.join(imageConfig.productImage, this._productId, imageName);
		// Save image
		saveBase64(filePath, imageData, (err) => {
			if (err) {
				return callback(err);
			}
			this.images.push(imageName);
			// Save file name
			ProductImage.addImage(this._productId, imageName, (err) => {
				if (err) {
					return callback(err);
				}	
				return callback(null);
			});
		});
	}

	addCategory(category, callback) {
		if (this._categories.indexOf(category) > -1) {
			return callback(null);
		}
		this._categories.push(category);
		let info = {
			categoryId: category.categoryId,
			productId: this._productId
		};
		let query = 'INSERT INTO categorylink SET ?';
		pool.query(query, [info], (err, result) => {
			if (err) {
				return callback(err);
			}
			return callback(null);
		});	
	}

	static findById(productId, callback) {
		const ProductImage = require(global.__base + 'models/product-image');
		const Category = require(global.__base + 'models/category');
		
		let query = 'SELECT * FROM product WHERE productId = ?';
		pool.query(query, [productId], (err, rows) => {
			if (err) {
				return callback(err);
			}
			if (!product) {
				return callback(null, null);
			}
			let product = new Product(rows[0]);
			// Categories
			Category.findByProductId(productId, (err, categories) => {
				if (err) {
					return callback(err);
				}
				product.categories = categories;
				// Images
				ProductImage.findByProductId(productId, (err, images) => {
					if (err) {
						return callback(err);
					}
					product.images = images;
					return callback(null, product);
				});
			});
		});	
	}

};

module.exports = Product;