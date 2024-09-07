const {Router} = require("express");
const adminMiddleware = require("../middleware/admin");
const {Admin, Course} = require("../db");
const adminRouter = Router();

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

adminRouter.post("/courses", adminMiddleware, async (req, res) => {
	const title = req.body.title;
	const description = req.body.description;
	const imageLink = req.body.imageLink;
	const price = req.body.price;

	const existingCourse = await Course.findOne({title});
	if (existingCourse) {
		return res.status(400).json({
			message: "Course with this title already exists",
		});
	}

	const newCourse = await Course.create({
		title: title,
		description: description,
		imageLink: imageLink,
		price: price,
	});

	if (newCourse) {
		res.status(200).json({
			message: "Course Created Successfully !!",
			courseId: newCourse._id,
		});
	} else {
		res.status(403).json({
			message: "Course Could not be Created",
		});
	}
});

adminRouter.get("/courses", adminMiddleware, async (req, res) => {
	// implement fetching all courses logic
	const allCourses = await Course.find({});
	if (allCourses) {
		return res.status(200).json({
			allCourses,
		});
	}
});

module.exports = adminRouter;
