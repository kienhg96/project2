const Report = require(global.__base + 'models/report');
const errTypes = require(global.__base + 'config/error');

module.exports = (req, res) => {
	const reportId = req.body.reportId;
	if (isNaN(reportId)) {
		return res.result(400, errTypes.MISSING_ARGUMENT, 
				"Missing report ID");
	}
	Report.findById(reportId, (err, report) => {
		if (err) {
			return res.result(err);
		}
		if (!report) {
			return res.result(400, errTypes.REPORT_NOT_FOUND,
					"Report not found");
		}
		report.delete((err) => {
			if (err) {
				return res.result(err);
			}
			return res.result(200, errTypes.OK, "OK");
		});
	});
}
