const City = require('../../models/city');

module.exports = (req, res) => {
	const city = new City({name: 'Hanoi'});
	city.setName('asdf');
	
	City.findAll((err, cities) => {
		if (err) {
			return res.status(500).json({
				errCode: 500,
				msg: 'Internal error'
			});
		}
		return res.status(200).json({
			errCode: 0,
			data: cities
		});
	})
}