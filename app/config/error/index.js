'use strict';

let error = {
	500: { errCode: 500, msg: 'Internal error' },
	1: { errCode: -1, msg: 'Missing argument/ invalid argument type' },
	2: { errCode: -2, msg: 'District not found' },
	3: { errCode: -3, msg: 'User already exist' },
	4: { errCode: -4, msg: 'User not login yet'},
	5: { errCode: -5, msg: 'Password mismatch' },
	6: { errCode: -6, msg: 'User not found' }
};
	
module.exports = error;