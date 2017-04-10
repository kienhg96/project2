"use strict";
let generateMyCode = (obj) => {
	let code;
	if (obj.customerId) {
		// Generate for customer
		code = 'C' + (new Array(6 - obj.customerId.toString().length + 1).join('0') + 
						obj.customerId);
	}
	else {
		// Generate for driver
		code = 'D' + (new Array(6 - obj.driverId.toString().length + 1).join('0') + 
						obj.driverId);
	}
	return code;
}

module.exports = generateMyCode;