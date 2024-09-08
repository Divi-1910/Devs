const {Router} = require("express");
const userRouter = Router();
const userMiddleware = require("../middlewares/user");

// User Routes
userRouter.post("/signup", async (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	const existingUser = await User.findOne({username});
	if (existingUser) {
		return res.status(400).json({
			message: "User with this username already exists",
		});
	}

	const newUser = await User.create({
		username: username,
		password: password,
	});

	if (newUser) {
		res.json({
			message: "User created Successfully",
		});
	} else {
		res.json({
			message: "User could not be created",
		});
	}
});

userRouter.post("/signin", (req, res) => {
	// Implement admin signup logic
});

userRouter.get("/courses", (req, res) => {
	// Implement listing all courses logic
});

userRouter.post("/courses/:courseId", userMiddleware, (req, res) => {
	// Implement course purchase logic
});

userRouter.get("/purchasedCourses", userMiddleware, (req, res) => {
	// Implement fetching purchased courses logic
});

module.exports = userRouter;
