const {User} = require("../db");

async function userMiddleware(req, res, next) {
	const username = req.headers.username;
	const password = req.headers.password;

	const isUser = await User.findOne({
		username: username,
		password: password,
	});

	if (isUser) {
		next();
	} else {
		res.status(403).json({
			message: "User does not exists",
		});
	}
}

module.exports = userMiddleware;
