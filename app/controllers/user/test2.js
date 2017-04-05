module.exports = (req, res) => {
	// POST
	const body = req.body;
	const name = body.name;
	res.send(name);
}