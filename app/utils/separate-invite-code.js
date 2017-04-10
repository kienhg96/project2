"use strict";
let seperateInviteCode = (code) => {
	const reg = /^[C,D]\d{6}$/;
	if (!reg.test(code)) {
		return null;
	};
	const id = parseInt(code.slice(1));
	if (code[0] === 'D') {
		return {
			driverId: id
		}
	} else {
		return {
			customerId: id
		}
	}
}

module.exports = seperateInviteCode;