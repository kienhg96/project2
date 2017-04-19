'use strict';

const sendNotification = function(data) {
    let headers = {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "Basic ZWE4OTliZmEtMzgzMi00ODA5LTljMWUtMjMwOGU1OGFjZTU2"
    };
    
    let options = {
        host: "onesignal.com",
        port: 443,
        path: "/api/v1/notifications",
        method: "POST",
        headers: headers
    };
    
    let https = require('https');
    let req = https.request(options, function(res) {  
        res.on('data', function(data) {
          console.log("Response:");
          console.log(JSON.parse(data));
        });
    });
    
    req.on('error', function(e) {
        console.error("ERROR:");
        console.error(e);
    });
    
    req.write(JSON.stringify(data));
    req.end();
};

const sendOnesignalNoti = function(oneSignalId, event, data, alert) {
    let playerIds = [oneSignalId];
    let message = { 
        app_id: process.env.ONESIGNAL_APPID,
        contents: {
            "en": "ALERT",
            "vi": alert
        },
        data: {
            "event": event,
            "data": data
        },
        include_player_ids: playerIds
    };
    console.log(message);
    sendNotification(message);
};

module.exports = sendOnesignalNoti;