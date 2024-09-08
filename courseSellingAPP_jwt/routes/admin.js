const {Router} = require("express");
const adminMiddleware = require("../middlewares/admin");
const adminRouter = Router();
const jwt = require("jsonwebtoken");
const passcode = require("..");
const {Admin} = require("../db");

adminRouter.post("/signup", async (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	const existingAdmin = await Admin.findOne({username});
	if (existingAdmin) {
		return res.status(400).json({
			message: "Admin with this username already exists",
		});
	}

	const newAdmin = await Admin.create({
		username: username,
		password: password,
	});

	if (newAdmin) {
		res.json({
			message: "Admin created Successfully",
		});
	}
});

adminRouter.post("/signin", async (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	const isValidAdmin = await Admin.find({
		username,
		password,
	});

	if (isValidAdmin) {
		const token = jwt.sign(
			{
				username,
			},
			passcode
		);

		res.json({
			token,
		});
	} else {
		res.status(411).json({
			message: "Incorrect Email or password",
		});
	}
});

adminRouter.post("/courses", adminMiddleware, (req, res) => {
	// Implement course creation logic
});

adminRouter.get("/courses", adminMiddleware, (req, res) => {
	// Implement fetching all courses logic
});

module.exports = adminRouter;
