'use strict';

const sendSMS = (data, callback) => {
    let headers = {
        "Content-Type": "application/json; charset=utf-8"
    };
      
    let options = {
        auth: process.env.SPEEDSMS_ACCESS_TOKEN + ':x',
        protocol: 'http:',
        host: "api.speedsms.vn",
        port: 80,
        path: "/index.php/sms/send",
        method: "POST",
        headers: headers
    };
      
    let http = require('http');
    let req = http.request(options, function(res) {  
        res.on('data', function(data) {
            callback(null, JSON.parse(data));
        });
    });
      
    req.on('error', function(e) {
        callback(e);
    });
      
    req.write(JSON.stringify(data));
    req.end();
};

module.exports = sendSMS;