const jwt = require("jsonwebtoken");
const passcode = require("..");

function userMiddleware(req, res, next) {
	const token = req.headers.authorization;
	const words = token.split(" ");
	const jwtToken = words[1];
	const decodedvalue = jwt.verify(jwtToken, passcode);
	if (decodedvalue.username) {
		next();
	} else {
		return res.status(403).json({
			message: "You are not authenticated",
		});
	}
}

module.exports = userMiddleware;
