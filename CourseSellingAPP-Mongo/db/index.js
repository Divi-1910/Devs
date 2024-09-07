const mongoose = require("mongoose");

mongoose.connect(
	"mongodb+srv://dvmuley10:%3CDvmuley%401910>@divi.rl190.mongodb.net/"
);

const AdminSchema = new mongoose.Schema({});

const UserSchema = new mongoose.Schema({});

const CourseSchema = new mongoose.Schema({});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
	Admin,
	User,
	Course,
};
