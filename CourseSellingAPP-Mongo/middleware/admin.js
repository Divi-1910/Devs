const {Admin} = require("../db");

async function adminMiddleware(req, res, next) {
	// implement admin auth logic here
	const username = req.headers.username;
	const password = req.headers.password;

	const isAdmin = await Admin.findOne({
		username: username,
		password: password,
	});

	if (isAdmin) {
		next();
	} else {
		res.status(403).json({
			message: "Admin does not exists",
		});
	}
}

module.exports = adminMiddleware;
