'use strict';

const deg2rad = (deg) => {
	return deg * (Math.PI / 180);	
};

const distance = (loc1, loc2) => {
	let R = 6371; // Radius of the earth in km
	let dLat = (loc2.lat - loc1.lat) * (Math.PI / 180); 
	let dLong = (loc2.long - loc1.long) * (Math.PI / 180); 
	let a = 
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(loc1.lat)) * Math.cos(deg2rad(loc2.lat)) * Math.sin(dLong / 2) * Math.sin(dLong / 2)
	; 
	let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
	
	return R * c; // Distance in km
};

module.exports = distance;