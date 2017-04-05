module.exports = (req, res) => {
	// GET
	const query = req.query;
	res.send(query.lastname);
}