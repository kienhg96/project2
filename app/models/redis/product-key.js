'use strict';
/*
	Object: {
		productId: Number,
		key: String
	}

	pj2:productkey:main:<productId> -> key
	
*/
const randToken = require('rand-token');
const client = require(global.__base + 'config/database/redis');

class ProductKey {
	constructor(props) {
		this._productId = props.productId;
		this._key = props.key;
	}

	get productId() { return this._productId; }
	get key() { return this._key; }

	set key(key) {
		if (key) {
			this._key = key;
		}
	}

	insert(callback) {
		client.set('pj2:productkey:main:' + this._productId, this._key, callback);
	}

	remove(callback) {
		client.del('pj2:productkey:main:' + this._productId, (err) => {
			if (err) {
				if (!callback) {
					return console.error(err);
				}
				return callback(err);
			}
			return callback(null);
		});
	}

	save(callback) {
		ProductKey.findByProductId(this._productId, (err, oldProductKey) => {
			if (err) {
				return callback(err);
			}
			if (!oldProductKey) {
				this.insert(callback);
			} else {
				oldProductKey.remove((err) => {
					if (err) {
						return callback(err);
					}
					this.insert(callback);
				});
			}
		});
	}

	static generateKey(productId) {
		let tokenStr = randToken.generate(32);
		tokenStr = 'P' + productId + '@' + tokenStr;
		return tokenStr;
	}

	static getProductIdFromKey(key) {
		let arr = key.split('@');
		let productId = parseInt(arr[0].slice(1), 10);
		return productId;
	}

	static findByProductId(productId, callback) {
		client.get('pj2:productkey:main:' + productId, (err, key) => {
			if (err) {
				return callback(err);
			}
			if (!key) {
				return callback(null, null);
			}
			let productKey = new ProductKey({
				productId: productId,
				key: key
			});
			return callback(null, productKey);
		});
	}
}

module.exports = ProductKey;