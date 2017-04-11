'use strict';

const checkJSONLocation = (a) => {
	try {
		a = JSON.parse(a);
		if (a.lat === undefined) {
			return false;
		}
	} catch(err) {
		return false;
	}
	return true;
};

module.exports = checkJSONLocation;