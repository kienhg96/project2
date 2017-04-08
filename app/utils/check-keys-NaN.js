"use strict";

let CheckKeysNaN = (obj, keys) => {
	if (Array.isArray(keys)) {
		for (let i = 0; i < keys.length; i++) {
			if (isNaN(parseInt(obj[keys[i]], 10))) {
				return i;
			}
		}
	} else if (isNaN(parseInt(obj[keys]), 10)) {
		return 0;
	}
	return -1;
} 

module.exports = CheckKeysNaN;