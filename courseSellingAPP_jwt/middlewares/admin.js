const jwt = require("jsonwebtoken");
const passcode = require("../index");

function adminMiddleware(req, res, next) {
	const token = req.headers.authorization;
	const words = token.split(" ");
	const jwtToken = words[1];

	const decodedvalue = jwt.verify(jwtToken, passcode);
	if (decodedvalue.username) {
		next();
	} else {
		return res.json({
			message: "You are not authenticated",
		});
	}
}

module.exports = adminMiddleware;
