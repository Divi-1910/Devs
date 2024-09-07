function adminMiddleware(req, res, next) {
	// implement admin auth logic here
	const username = req.headers.username;
	const password = req.headers.password;
}

module.exports = adminMiddleware;
