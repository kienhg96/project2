'use strict';

const checkMail = require('./check-mail');
const checkKeysNotExists = require('./check-keys-not-exists');
const checkFileExists = require('./check-file-exists');
const checkKeysNaN = require('./check-keys-NaN');
const checkPhone = require('./check-phone');
const sendSMS = require('./send-sms');
const generateMyCode = require('./generate-my-code');
const separateInviteCode = require('./separate-invite-code');
const checkFBAccount = require('./check-fb-account');
const saveBase64 = require('./save-base64');
const checkJSONLocation = require('./check-JSON-location');
const distance = require('./distance');
const sendMail = require('./send-mail');
const sendOnesignalNoti = require('./send-onesignal-noti');
const handleCity = require('./handle-city');

const utils = {
	checkMail: checkMail,
	checkFileExists: checkFileExists,
	checkKeysNotExists: checkKeysNotExists,
	checkKeysNaN: checkKeysNaN,
	checkPhone: checkPhone,
	sendSMS: sendSMS,
	generateMyCode: generateMyCode,
	separateInviteCode: separateInviteCode,
	checkFBAccount: checkFBAccount,
	saveBase64: saveBase64,
	checkJSONLocation: checkJSONLocation,
	distance: distance,
	sendMail: sendMail,
	sendOnesignalNoti: sendOnesignalNoti,
	handleCity: handleCity
};

module.exports = utils;
