const {Router} = require("express");
const userRouter = Router();
const userMiddleware = require("../middleware/user");
const {User, Course} = require("../db");

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

userRouter.get("/courses", async (req, res) => {
	const AllCourses = await Course.find({});
	if (AllCourses) {
		return res.json({
			AllCourses,
		});
	} else {
		return res.json({
			message: "Could not fetch all the courses list from database",
		});
	}
});

userRouter.post("/course/:courseId", userMiddleware, async (req, res) => {
	const courseId = req.params.courseId;
	const username = req.headers.username;
	const result = await User.updateOne(
		{username: username},
		{$push: {purchasedCourses: courseId}}
	);

	if (result.modifiedCount == 1) {
		res.status(200).json({
			message: "Congrats , you have purchased this course, Happy Learning !!",
		});
	} else {
		res.status(400).json({
			message: "Failed to purchase the course",
		});
	}
});

userRouter.get("/purchasedCourses", userMiddleware, async (req, res) => {
	const user = await User.findOne({
		username: req.headers.username,
	});

	const courses = await Course.find({
		_id: {
			$in: user.purchasedCourses,
		},
	});

	res.json({
		courses: courses,
	});
});

module.exports = userRouter;
