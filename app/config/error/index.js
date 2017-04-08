'use strict';

// let error = {
// 	500: { errCode: 500, msg: 'Internal error' },
// 	1: { errCode: -1, msg: 'Missing argument/ invalid argument type' },
// 	2: { errCode: -2, msg: 'District not found' },
// 	3: { errCode: -3, msg: 'User already exist' },
// 	4: { errCode: -4, msg: 'User not login yet'},
// 	5: { errCode: -5, msg: 'Password mismatch' },
// 	6: { errCode: -6, msg: 'User not found' }
// };
	
// module.exports = error;

exports.OK = 'OK';

exports.INTERNAL_ERROR = 'INTERNAL_ERROR';
exports.MISSING_ARGUMENT = 'MISSING_ARGUMENT';
exports.INVALID_ARGUMENT_TYPE = 'INVALID_ARGUMENT_TYPE';

exports.USER_NOT_FOUND = 'USER_NOT_FOUND';
exports.DISTRICT_NOT_FOUND = 'DISTRICT_NOT_FOUND';
exports.CITY_NOT_FOUND = 'CITY_NOT_FOUND';

exports.USER_EXISTS = 'USER_EXISTS';
exports.WRONG_PASSWORD = 'WRONG_PASSWORD';
exports.IS_NOT_AUTHENTICATED = 'IS_NOT_AUTHENTICATED';