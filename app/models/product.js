'use strict';

const path = require('path');
const pool = require(global.__base + 'config/database/mysql');
const IMAGE_BASE_PATH = '/image/product/';
// const AVATAR = 'avatar.png';
const PAGE_LENGTH = 15;
const randToken = require('rand-token');
const moment = require('moment');
const saveBase64 = require(global.__base + 'utils/save-base64');
const imageConfig = require(global.__base + 'config/image');
const mkdirp = require('mkdirp');
const deleteFile = require(global.__base + 'utils/delete-file');
const deleteFolder = require(global.__base + 'utils/delete-folder');

class Product {

	constructor(props) {
		this._productId = props.productId;
		this._name = props.name;
		this._description = props.description || '';
		this._price = props.price || 0;
		this._date = moment(props.date).format('YYYY-MM-DD') || moment(Date.now()).format('YYYY-MM-DD');
		this._isSold = props.isSold || 0;
		this._isVerified = props.isVerified || 0;
		this._userId = props.userId;
		this._images = props.images || [];
		this._categories = props.categories || [];
		this._districtId = props.districtId; // Fuck
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
		this._images.forEach((imgName) => {
			result.push(path.join(IMAGE_BASE_PATH, imgName).replace(/\\/g, '/'));
		});
		return result;
	}
	get categories() { return this._categories; }
	get districtId() { return this._districtId; }

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
			userId: this._userId,
			districtId: this._districtId
		};
	}

	save(callback) {
		let query = 'INSERT INTO product SET ?';
		pool.query(query, [this.rawData()], (err, result) => {
			if (err) {
				return callback(err);
			}
			this._productId =  result.insertId;
			return callback(null);
		}); 
	}

	toJSON(callback) {
		const User = require(global.__base + 'models/user');
		const District = require(global.__base + 'models/district');

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
			// avatar: this.avatar
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
				District.findById(this._districtId, (err, district) => {
					if (err) {
						return callback(err);
					}
					if (!district) {
						return callback(null, data);
					}
					district.toJSON((err, districtJSON) => {
						if (err) {
							return callback(err);
						}
						data.district = districtJSON;
						return callback(null, data);
					});
				});
			});
		}); 
	}	

	addImage(imageData, callback) {
		const ProductImage = require(global.__base + 'models/product-image');

		let imgName = this._productId + '-' + Date.now() + '.png';
		let filePath = path.join(imageConfig.productImage, imgName);
		// Save image
		saveBase64(filePath, imageData, (err) => {
			if (err) {
				return callback(err);
			}
			this._images.push(imgName);
			// Save file name
			ProductImage.addImage(this._productId, imgName, callback);
		});
	}

	addImageName(imageData, imgName, callback) {
		const ProductImage = require(global.__base + 'models/product-image');

		let filePath = path.join(imageConfig.productImage, imgName);
		// Save image
		saveBase64(filePath, imageData, (err) => {
			if (err) {
				return callback(err);
			}
			this._images.push(imgName);
			// Save file name
			ProductImage.addImage(this._productId, imgName, callback);
		});
	}

	addImages(imageDataArr, callback) {
		let n = imageDataArr.length;
		if (n === 0) {
			return callback(null);
		}
		let count = 0;
		// let error = null;
		for (let i in imageDataArr) {
			let imgName = this._productId + '-' + Date.now() + '.png'; 
			this.addImageName(imageDataArr[i], imgName, (err) => {
				if (err) {
					// error = err;
					return callback(err);
				}
				count++;
				if (count === n) {
					return callback(null);
				}
			});
		}
	}

	deleteImage(imgName, callback) {
		const ProductImage = require(global.__base + 'models/product-image');

		let filePath = path.join(imageConfig.productImage, imgName);
		deleteFile(filePath, (err) => {
			if (err) {
				console.log(err);
			}
			this._images = this._images.filter((x) => {
				return x !== imgName;
			});
			ProductImage.deleteImage(this._productId, imgName, callback);
		});
	}

	deleteImages(imgNames, callback) {
		let n = imgNames.length;
		if (n === 0) {
			return callback(null);
		}
		let count = 0;
		// let error = null;
		for (let i in imgNames) {
			this.deleteImage(imgNames[i], (err) => {
				if (err) {
					return callback(err);
				}
				count++;
				if (count === n) {
					return callback(null);
				}
			});
		}
	}

	addCategory(category, callback) {
		const Category = require(global.__base + 'models/category');

		for (let i in this._categories) {
			if (this._categories[i].categoryId === category.categoryId) {
				return callback(null);
			}
		}
		this._categories.push(category);
		let info = {
			categoryId: category.categoryId,
			productId: this._productId
		};
		Category.add(info, callback);
	}

	addCategoryById(categoryId, callback) {
		const Category = require(global.__base + 'models/category');

		Category.findById(categoryId, (err, category) => {
			if (err) {
				return callback(err);
			}
			if (!category) {
				return callback(null);
			}
			this.addCategory(category, callback);
		});
	}

	setCategoriesById(categoryIdArr, callback) {
		this.deleteAllCategories((err) => {
			if (err) {
				return callback(err);
			}
			// console.log(categoryIdArr)
			let n = categoryIdArr.length;
			let count = 0;
			// let error = null;
			if (n === 0) {
				return callback(null);
			}
			for (let i = 0; i < n; i++) {
				this.addCategoryById(categoryIdArr[i], (err) => {
					if (err) {
						// error = err;
						return callback(err);
					}
					count++;
					if (count === n) {
						return callback(null);
					}
				});
			}
		});
	}

	deleteAllCategories(callback) {
		const Category = require(global.__base + 'models/category');
		Category.deleteByProductId(this._productId, (err) => {
			if (err) {
				return callback(err);
			}
			this._categories = [];
			return callback(null);
		});
	}

	remove(callback) {
		const ProductImage = require(global.__base + 'models/product-image');
		// Delete images
		ProductImage.deleteImages(this._productId, (err) => {
			if (err) {
				return callback(err);
			}
			// Delete product
			let query = 'DELETE FROM product WHERE productId = ?';
			pool.query(query, [this._productId], (err, result) => {
				if (err) {
					return callback(err);
				}
				// Delete image files
				let filePath;
				for (let i in this._images) {
					filePath = path.join(imageConfig.productImage, this._images[i]);
					deleteFile(filePath, (err) => {
						if (err) {
							console.error(err);
						}
					});
				}
				return callback(null);
			});	
		});
	}

	updateRawInfo(info, callback) {
		if (info === {}) {
			return callback(null);
		}
		console.log(info)
		let query = 'UPDATE product SET ? WHERE productId = ?';
		pool.query(query, [info, this._productId], (err, result) => {
			if (err) {
				return callback(err);
			}
			let keys = ['name', 'description', 'price', 'districtId'];
			for(let i in keys) {
				if (info[keys[i]]) {
					this['_' + keys[i]] = info[keys[i]];
				}
			}
			return callback(null);
		});
	}

	updateInfo(info, callback) {
		// ['name', 'description', 'price', 'categoryId', 'imagesAdded', 'imagesRemoved']
		if (info.imagesAdded) {
			this.addImages(info.imagesAdded, (err) => {
				if (err) {
					return callback(err);
				}
				delete info.imagesAdded;
				if (info.imagesRemoved) {
					this.deleteImages(info.imagesRemoved, (err) => {
						if (err) {
							return callback(err);
						}
						delete info.imagesRemoved;

						if (info.categoryIdArr) {
							this.setCategoriesById(info.categoryIdArr, (err) => {
								if (err) {
									return callback(err);
								}
								delete info.categoryIdArr;
								this.updateRawInfo(info, callback);
							});
						} else {
							this.updateRawInfo(info, callback);
						}
					});
				} else {
					if (info.categoryIdArr) {
						this.setCategoriesById(info.categoryIdArr, (err) => {
							if (err) {
								return callback(err);
							}
							delete info.categoryIdArr;
							this.updateRawInfo(info, callback);
						});
					} else {
						this.updateRawInfo(info, callback);
					}
				}
			});
		} else {
			if (info.imagesRemoved) {
				this.deleteImages(info.imagesRemoved, (err) => {
					if (err) {
						return callback(err);
					}
					delete info.imagesRemoved;
					if (info.categoryIdArr) {
						this.setCategoriesById(info.categoryIdArr, (err) => {
							if (err) {
								return callback(err);
							}
							delete info.categoryIdArr;
							this.updateRawInfo(info, callback);
						});
					} else {
						this.updateRawInfo(info, callback);
					}
				});
			} else {
				if (info.categoryIdArr) {
					this.setCategoriesById(info.categoryIdArr, (err) => {
						if (err) {
							return callback(err);
						}
						delete info.categoryIdArr;
						this.updateRawInfo(info, callback);
					});
				} else {
					this.updateRawInfo(info, callback);
				}
			}
		}
	}

	setKey(callback) {
		const ProductKey = require(global.__base + 'models/redis/product-key');
		
		let key = ProductKey.generateKey(this._productId);
		new ProductKey({
			productId: this._productId,
			key: key
		}).save((err) => {
			if (err) {
				return callback(err);
			}
			return callback(null, key);
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
			if (!rows[0]) {
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

	static findByUserId(userId, page, callback) {
		const ProductImage = require(global.__base + 'models/product-image');
		const Category = require(global.__base + 'models/category');

		let query = 'SELECT * FROM product WHERE userId = ? ORDER BY productId DESC LIMIT ? OFFSET ?';
		pool.query(query, [userId, PAGE_LENGTH, page * PAGE_LENGTH], (err, rows) => {
			if (err) {
				return callback(err);
			}
			if (!rows[0]) {
				return callback(null, []);
			}
			let result = [];
			let count = 0;
			let n = rows.length;
			rows.forEach((row, i) => {
				let product = new Product(row);
				// Categories
				Category.findByProductId(product.productId, (err, categories) => {
					if (err) {
						return callback(err);
					}
					product.categories = categories;
					// Images
					ProductImage.findByProductId(product.productId, (err, images) => {
						if (err) {
							return callback(err);
						}
						product.images = images;
						result[i] = product;
						count++;
						if (count === n) {
							return callback(null, result);
						}
					});
				});
			});
		});
	}

	static findByCategoryAndDistrict(categoryId, districtId, page, callback) {
		const ProductImage = require(global.__base + 'models/product-image');
		const Category = require(global.__base + 'models/category');

		let query = 'SELECT product.* FROM product, categorylink' +
				' WHERE categorylink.productId = product.productId' +
				' AND categorylink.categoryId = ?' +
				' AND districtId = ?' +
				' ORDER BY date DESC LIMIT ? OFFSET ?';
		pool.query(query, [categoryId, districtId, PAGE_LENGTH, page * PAGE_LENGTH], (err, rows) => {
			if (err) {
				return callback(err);
			}
			if (!rows[0]) {
				return callback(null, []);
			}
			let result = [];
			let count = 0;
			let n = rows.length;
			rows.forEach((row, i) => {
				let product = new Product(row);
				// Categories
				Category.findByProductId(product.productId, (err, categories) => {
					if (err) {
						return callback(err);
					}
					product.categories = categories;
					// Images
					ProductImage.findByProductId(product.productId, (err, images) => {
						if (err) {
							return callback(err);
						}
						product.images = images;
						result[i] = product;
						count++;
						if (count === n) {
							return callback(null, result);
						}
					});
				});
			});
		});
	}

	static find(queryObj, page, callback) {
		const ProductImage = require(global.__base + 'models/product-image');
		const Category = require(global.__base + 'models/category');

		let tableList = ['product', 'user'];
		let joinConditions = [' product.userId = user.userId '];
		let queryList = [];
		let valueList = [];
		if (queryObj.userId) {
			queryList.push(' user.userId = ? ');
			valueList.push(queryObj.userId);
		}
		if (queryObj.districtId) {
			queryList.push(' product.districtId = ? ');
			valueList.push(queryObj.districtId);
		}
		if (queryObj.categoryId) {
			tableList = ['product', 'user', 'categorylink'];
			joinConditions = [' product.userId = user.userId ', ' categorylink.productId = product.productId '];
			queryList.push(' categorylink.categoryId = ? ');
			valueList.push(queryObj.categoryId);
		}
		if (queryObj.name) {
			queryList.push(' product.name LIKE ? ');
			valueList.push('%' + queryObj.name + '%');
		}
		if (queryObj.maxPrice) {
			queryList.push(' product.price <= ? ');
			valueList.push(queryObj.maxPrice);
		}
		if (queryObj.minPrice) {
			queryList.push(' product.price >= ? ');
			valueList.push(queryObj.minPrice);
		}
		if (queryObj.date) {
			queryList.push(' product.date >= ? ');
			valueList.push(queryObj.date);
		}
		let orderBy = ' productId ';
		let sort = ' DESC ';
		switch (queryObj.orderBy) {
			case 'productId':
				orderBy = ' product.productId ';
				break;
			case 'price':
				orderBy = ' price ';
				break;
			case 'date':
				orderBy = ' product.roductId ';
				break;
			case 'categoryId':
				orderBy = ' categorylink.categoryId ';
				break;
			case 'name': 
				orderBy = ' product.name ';
				break; 
			default:
				orderBy = ' product.productId ';
		}
		if (queryObj.sort === 'ASC') {
			sort = ' ASC ';
		}

		let query = 'SELECT * FROM ' + tableList.join(', ') + 
				' WHERE ' + joinConditions.join(' AND' );
		if (queryList.length === 0) {
			query += ' ORDER BY ' + orderBy + sort + ' LIMIT ? OFFSET ?'; 
		} else {
			query += ' AND ' + queryList.join(' AND ') + 
					' ORDER BY ' + orderBy + sort + ' LIMIT ? OFFSET ?';
		}
		valueList.push(PAGE_LENGTH);
		valueList.push(page * PAGE_LENGTH);
		pool.query(query, valueList, (err, rows) => {
			if (err) {
				return callback(err);
			}
			if (!rows[0]) {
				return callback(null, []);
			}
			let result = [];
			let count = 0;
			let n = rows.length;
			rows.forEach((row, i) => {
				let product = new Product(row);
				// Categories
				Category.findByProductId(product.productId, (err, categories) => {
					if (err) {
						return callback(err);
					}
					product.categories = categories;
					// Images
					ProductImage.findByProductId(product.productId, (err, images) => {
						if (err) {
							return callback(err);
						}
						product.images = images;
						result[i] = product;
						count++;
						if (count === n) {
							return callback(null, result);
						}
					});
				});
			});
		});
	}
};

module.exports = Product;