// 'use strict';

// const SendGrid = require('sendgrid-nodejs').SendGrid;
// const sendgrid = new SendGrid(process.env.SENDGRID_USER, process.env.SENDGRID_PASS);

// const sendMail = (email, subject, content, callback) => {
// 	sendgrid.send({
// 		to: email,
// 		from: 'noreply@mego.anf.com',
// 		subject: subject,
// 		text: content
// 	}, (success) => {
// 		if (!success) {
// 			return callback(null, 'FAILED');
// 		}
// 		return callback(null, 'OK');
// 	});
// };

// module.exports = sendMail;